export default async function handler(req, res) {
  const { contactId, nameProvider, nameTariff, priceTariff, address } =
    req.body;
  const idProvidersBitrix = {
    МТС: 54,
    Ростелеком: 52,
    Билайн: 56,
    Мегафон: 57,
    "Дом.ру": 60,
  };

  const urlBitrix = process.env.URL_BITRIX;

  const response = await fetch(`${urlBitrix}/crm.deal.add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fields: {
        TITLE: "Заявка с сайта on-wifi.ru",
        CONTACT_ID: contactId,
        UF_CRM_1697294773665: idProvidersBitrix[nameProvider],
        UF_CRM_1697294796468: nameTariff,
        OPPORTUNITY: priceTariff,
        UF_CRM_1697646751446: address,
      },
    }),
  });

  const data = await response.json();
  res.status(200).json(data);
}
