const api = process.env.URL_SERVER;

export default async function handler(req, res) {
  const clientIp =
    req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  const response = await fetch(`${api}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "x-client-ip": clientIp,
    },
    body: JSON.stringify(req.body),
  });

  const data = await response.json();
  const cookies = response.headers.get("set-cookie");
  if (cookies) {
    res.setHeader("Set-Cookie", cookies);
  }

  res.status(response.status).json(data);
}
