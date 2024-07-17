import Header from "../../../components/Header/Header";
import Tariff from "../../../components/Tariff/Tariff";
import Footer from "../../../components/Footer/Footer";
import HelpForm from "../../../components/HelpForm/HelpForm";
import Questions from "../../../components/Questions/Questions";
import AboutUs from "../../../components/AboutUs/AboutUs";
import PopUpAgreement from "@/components/PopUpAgreement/PopUpAgreement";
import PopUpLead from "@/components/PopUpLead/PopUpLead";
import PopUpPolicy from "@/components/PopUpPolicy/PopUpPolicy";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import api from "../../../../public/host/host.js";

function TariffPage() {
  const router = useRouter();
  const { city, idTariff } = router.query;

  const [tariffData, setTariffData] = useState(null);

  useEffect(() => {
    fetch(`${api}/tariff/${idTariff}`)
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
      <Head>
        <title>Тариф {tariffData?.name}</title>

        <meta name="apple-mobile-web-app-title" content="On-wifi" />
      </Head>
      <Header />
      {tariffData ? <Tariff tariffInfo={tariffData} /> : <p>Loading...</p>}
      <AboutUs />
      <HelpForm />
      <Questions />
      <Footer />
      <PopUpAgreement />
      <PopUpLead />
      <PopUpPolicy />
    </>
  );
}

export default TariffPage;
