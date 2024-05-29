// pages/api/get_cities_engnames.ts

export default async function handler(req, res) {
  const response = await fetch("https://on-wifi.ru/get_cities_engnames");
  const data = await response.json();
  res.json(data);
}
