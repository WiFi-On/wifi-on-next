export default async function handler(req, res) {
  const { clientName, clientPhone, address } = req.body;

  const response = await fetch(
    "https://on-wifi.bitrix24.ru/rest/11940/5ii72jw03e78jrz7/crm.contact.add",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields: {
          NAME: clientName,
          SECOND_NAME: clientName,
          LAST_NAME: clientName,
          PHONE: [{ VALUE: clientPhone, VALUE_TYPE: "WORK" }],
          ADDRESS: address,
        },
      }),
    }
  );

  const data = await response.json();
  res.status(200).json(data);
}
