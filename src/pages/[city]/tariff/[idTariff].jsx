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
import CookieAgreement from "@/components/CookieAgreement/CookieAgreement";
import PopUpComparison from "@/components/PopUpComparison/PopUpComparison";
import { useRouter } from "next/router";

const api = process.env.URL_SERVER;

function TariffPage({ tariffData }) {
  const router = useRouter();
  const { query } = router;

  return (
    <>
      <Head>
        <title>
          Подключить домашний интернет от {tariffData.provider.name}{" "}
          {tariffData.name} по выгодной цене в {query.city}
        </title>
        <link rel="icon" href="imgs/favicon.ico"></link>
        <meta name="apple-mobile-web-app-title" content="On-wifi" />
        <meta
          name="description"
          content={`Недорогой интернет от ${tariffData.provider.name} по самой низкой цене, ${tariffData.name} 🌟 Провести интернет в частный дом выгодно 📡`}
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
