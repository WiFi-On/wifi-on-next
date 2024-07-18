import Header from "../../../components/Header/Header";
import Tariff from "../../../components/Tariff/Tariff";
import Footer from "../../../components/Footer/Footer";
import HelpForm from "../../../components/HelpForm/HelpForm";
import Questions from "../../../components/Questions/Questions";
import AboutUs from "../../../components/AboutUs/AboutUs";
import PopUpAgreement from "@/components/PopUpAgreement/PopUpAgreement";
import PopUpLead from "@/components/PopUpLead/PopUpLead";
import PopUpPolicy from "@/components/PopUpPolicy/PopUpPolicy";
import Head from "next/head";
import api from "../../../../public/host/host.js";

function TariffPage({ tariffData }) {
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

export async function getServerSideProps(context) {
  const { idTariff } = context.query;
  let tariffData = null;

  try {
    const response = await fetch(`${api}/tariff/${idTariff}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "g2H3Ym90U3nmhStLikyWOLM662xaiG6BK3l41pYq",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    tariffData = data.tariff;
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
