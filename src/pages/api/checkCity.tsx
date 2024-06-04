import axios from "axios";

export default async function handler(req: any, res: any) {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ error: "City is required" });
  }

  const DADATA_API_URL =
    "https://suggestions.dadata.ru/suggestions/api/4_1/rs/iplocate/address";
  const DADATA_API_KEY = "bbbdb08051ba3df93014d80a721660db6c19f0db";

  try {
    const response = await axios.post(
      DADATA_API_URL,
      {
        ip: city,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${DADATA_API_KEY}`,
        },
      }
    );

    const suggestions = response.data.suggestions;

    if (suggestions.length > 0) {
      res.status(200).json({ city: suggestions[0].data.city });
    } else {
      res.status(200).json({ city: "Moskva" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
