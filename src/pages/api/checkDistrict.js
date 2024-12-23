const api = process.env.URL_SERVER;
export default async function handler(req, res) {
  const { districtFiasId } = req.body;

  const response = await fetch(
    `${api}/aggregator/get/districtEngName/onFiasID?fiasID=${districtFiasId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-api-key": "g2H3Ym90U3nmhStLikyWOLM662xaiG6BK3l41pYq",
      },
    }
  );

  const data = await response.json();
  res.status(200).json(data);
}
