import host from "../../../public/host/host.js";
export default async function handler(req, res) {
  const { districtFiasId } = req.body;

  const response = await fetch(
    `${host}/engNameDistrictByFiasId/${districtFiasId}`,
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
  console.log(data);
  res.status(200).json(data);
}
