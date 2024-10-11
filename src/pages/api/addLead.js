import { api } from "../../../public/host/host.js";
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
  const response = await fetch(
    "https://on-wifi.bitrix24.ru/rest/11940/5ii72jw03e78jrz7/crm.deal.add",
    {
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
    }
  );

  const data = await response.json();
  res.status(200).json(data);
}
