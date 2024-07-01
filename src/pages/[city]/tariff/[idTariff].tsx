import Header from "../../../components/Header/Header";
import Tariff from "../../../components/Tariff/Tariff";
import Footer from "../../../components/Footer/Footer";
import HelpForm from "../../../components/HelpForm/HelpForm";
import PopUpAgreement from "@/components/PopUpAgreement/PopUpAgreement";
import PopUpLead from "@/components/PopUpLead/PopUpLead";
import PopUpPolicy from "@/components/PopUpPolicy/PopUpPolicy";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

function TariffPage() {
  const router = useRouter();
  const { city, idTariff } = router.query;

  const [tariffData, setTariffData] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:5005/api/getTariff/${idTariff}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Преобразование ответа в JSON
      })
      .then((data) => {
        setTariffData(data.tariff);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, [idTariff, city]); // Зависимость от тариф и город

  console.log(tariffData);
  return (
    <>
      <Header />
      {tariffData ? <Tariff tariffInfo={tariffData} /> : <p>Loading...</p>}
      <HelpForm />
      <Footer />
      <PopUpAgreement />
      <PopUpLead />
      <PopUpPolicy />
    </>
  );
}

export default TariffPage;
