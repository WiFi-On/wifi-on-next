import { api } from "../../../public/host/host.js";
export default async function handler(req, res) {
  // Получаем IP-адрес клиента
  const clientIp =
    req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  console.log(clientIp);
  const response = await fetch(`${api}/aggregator/get/district`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "x-client-ip": clientIp,
    },
  });

  const data = await response.json();

  res.status(200).json(data[0]);
}
