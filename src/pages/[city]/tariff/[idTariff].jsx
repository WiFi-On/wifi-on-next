import Header from "../../../components/Header/Header.tsx";
import Tariff from "../../../components/Tariff/Tariff.jsx";
import Footer from "../../../components/Footer/Footer.jsx";
import HelpForm from "../../../components/HelpForm/HelpForm.jsx";
import Questions from "../../../components/Questions/Questions.jsx";
import AboutUs from "../../../components/AboutUs/AboutUs.jsx";
import PopUpAgreement from "@/components/PopUpAgreement/PopUpAgreement";
import PopUpLead from "@/components/PopUpLead/PopUpLead";
import PopUpPolicy from "@/components/PopUpPolicy/PopUpPolicy";
import Head from "next/head";
import { api } from "../../../../public/host/host.js";
import CookieAgreement from "@/components/CookieAgreement/CookieAgreement";
import PopUpComparison from "@/components/PopUpComparison/PopUpComparison";

function TariffPage({ tariffData }) {
  return (
    <>
      <Head>
        <title>
          Домашний интернет от провайдера {tariffData.provider.name} | Тариф
          {tariffData.name} - Оставить заявку на подключение проводного
          интернета
        </title>
        <link rel="icon" href="imgs/favicon.ico"></link>
        <meta name="apple-mobile-web-app-title" content="On-wifi" />
        <meta
          name="description"
          content="Оставь заявку чтобы подключить интернет от {tariffData.provider} 🌐 Наш сервис помогает провести интернет от Ростелекома, мтс, мегафон и более 20 провайдеров по вашему городу ➡ У нас все тарифы и актуальные акции на интернет.
"
        />
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
      <CookieAgreement></CookieAgreement>
      <PopUpComparison></PopUpComparison>
    </>
  );
}

export async function getServerSideProps(context) {
  const { idTariff } = context.query;
  try {
    const response = await fetch(
      `${api}/aggregator/get/tariff?id=${idTariff}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "g2H3Ym90U3nmhStLikyWOLM662xaiG6BK3l41pYq",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    var tariffData = await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
  }

  return {
    props: {
      tariffData,
    },
  };
}

export default TariffPage;
