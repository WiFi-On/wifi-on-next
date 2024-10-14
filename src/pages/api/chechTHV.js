import { api } from "../../../public/host/host.js";
export default async function handler(req, res) {
  const { address } = req.body;

  if (!address) {
    return res.status(400).json({ error: "Address is required." });
  }

  try {
    const response = await fetch(
      `${api}/aggregator/get/tarrifsRTK/onAddress?address=${address}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "x-api-key": "g2H3Ym90U3nmhStLikyWOLM662xaiG6BK3l41pYq",
        },
      }
    );

    // Проверяем статус ответа
    if (!response.ok) {
      return res.status(response.status).json({
        error: `Failed to fetch tariffs. Status code: ${response.status}`,
      });
    }

    const data = await response.json();

    // Проверка наличия данных
    if (!data || data.length === 0) {
      return res.status(200).json({ tariffs: [] });
    }

    // Возвращаем данные в ответе
    return res.status(200).json(data);
  } catch (error) {
    // Обработка ошибок
    console.error("Error fetching tariffs:", error.message);

    // Возвращаем сообщение об ошибке
    return res.status(500).json({
      error:
        "An error occurred while fetching tariffs. Please try again later.",
    });
  }
}
