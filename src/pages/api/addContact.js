export default async function handler(req, res) {
  const { clientName, clientPhone, address } = req.body;
  const urlBitrix = process.env.URL_BITRIX;

  const response = await fetch(`${urlBitrix}/crm.contact.add`, {
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
  });

  const data = await response.json();
  res.status(200).json(data);
}
