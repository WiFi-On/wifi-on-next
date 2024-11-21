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
        },
      }
    );

    // Проверяем статус ответа
    if (!response.ok) {
      return res.status(500).json([]);
    }

    const data = await response.json();

    // Проверка наличия данных
    if (!data || data.length === 0) {
      return res.status(200).json([]);
    }

    // Возвращаем данные в ответе
    return res.status(200).json(data);
  } catch (error) {
    // Возвращаем сообщение об ошибке
    return res.status(500).json([]);
  }
}
