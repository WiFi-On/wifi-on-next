export default async function handler(req, res) {
  const { query, count } = req.body;
  const token = "bbbdb08051ba3df93014d80a721660db6c19f0db";

  const response = await fetch(
    "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ query: query, count: count }),
    }
  );

  const data = await response.json();
  res.status(200).json(data);
}
