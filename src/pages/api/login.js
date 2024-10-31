import { api } from "../../../public/host/host.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Метод не поддерживается" });
  }

  const clientIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  try {
    const response = await fetch(`${api}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-client-ip": clientIp,
      },
      body: JSON.stringify(req.body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return res
        .status(response.status)
        .json({ message: errorData.message || "Ошибка авторизации" });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Ошибка при запросе к серверу:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
}
