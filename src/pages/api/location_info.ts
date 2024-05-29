// pages/api/location_info.ts

export default async function handler(req, res) {
  const { city } = req.query;
  const response = await fetch(
    `https://on-wifi.ru/district_info?districtengname=${city}`
  );
  const data = await response.json();
  res.json(data);
}
