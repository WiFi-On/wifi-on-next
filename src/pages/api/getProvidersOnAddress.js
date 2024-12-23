const api = process.env.URL_SERVER;
export default async function handler(req, res) {
  // Получаем IP-адрес клиента
  const clientIp =
    req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  const response = await fetch(
    `${api}/aggregator/get/providers/onAddress?address=${req.body.address}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-client-ip": clientIp,
      },
    }
  );

  const data = await response.json();

  res.status(200).json(data);
}
