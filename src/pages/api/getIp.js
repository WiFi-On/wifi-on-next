export default async function handler(req, res) {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  const apiKey = "bbbdb08051ba3df93014d80a721660db6c19f0db"; // Замените на ваш API-ключ

  try {
    // Запрос к DaData для получения информации о местоположении по IP
    const dadataResponse = await fetch(
      "http://suggestions.dadata.ru/suggestions/api/4_1/rs/iplocate/address",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Token ${apiKey}`,
        },
        body: JSON.stringify({ ip: ip }),
      }
    );

    if (!dadataResponse.ok) {
      throw new Error(`DaData API error: ${dadataResponse.statusText}`);
    }

    const dadataData = await dadataResponse.json();

    // Проверяем, получили ли мы корректные данные
    if (!dadataData || !dadataData.location || !dadataData.location.data) {
      throw new Error("Invalid data received from DaData");
    }

    const cityKladrId = dadataData.location.data.city_kladr_id;

    // Запрос к локальному API для получения имени города
    const cityResponse = await fetch(
      `http://92.63.178.153/5030/api/getCityName/${cityKladrId}`
    );

    if (!cityResponse.ok) {
      throw new Error(`Local API error: ${cityResponse.statusText}`);
    }

    const cityData = await cityResponse.json();

    // Проверяем, получили ли мы корректные данные
    if (!cityData || !cityData.cityName) {
      throw new Error("Invalid data received from local API");
    }

    // Отправляем имя города в ответ
    res.status(200).json({ city: cityData.cityName });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({
      error: "Failed to fetch data",
      details: error.message,
    });
  }
}
