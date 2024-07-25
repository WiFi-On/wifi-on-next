import Header from "@/components/Header/Header";
import SliderProviders from "@/components/SliderProviders/SliderProviders";
import Filter from "@/components/Filter/Filter";
import SliderTariffsFilter from "@/components/SliderTariffsFilter/SliderTariffsFilter";
import HelpForm from "@/components/HelpForm/HelpForm";
import Footer from "@/components/Footer/Footer";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Questions from "@/components/Questions/Questions";
import { Element } from "react-scroll";
import AboutUs from "@/components/AboutUs/AboutUs";
import PopUpLead from "@/components/PopUpLead/PopUpLead";
import PopUpAgreement from "@/components/PopUpAgreement/PopUpAgreement";
import PopUpPolicy from "@/components/PopUpPolicy/PopUpPolicy";
import NotTariffs from "@/components/NotTariffs/NotTariffs";
import Head from "next/head";
import api from "../../../public/host/host.js";

const Tariffs = ({ tariffs, providers, loading }) => {
  const router = useRouter();

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [minSpeed, setMinSpeed] = useState(0);
  const [maxSpeed, setMaxSpeed] = useState(5000);

  const minAndMaxPrice = (tariffs) => {
    let min = 30000;
    let max = 0;
    tariffs.forEach((tariff) => {
      const maxTariffCost = parseFloat(tariff.cost);
      if (maxTariffCost < min) {
        min = maxTariffCost;
      }
      if (maxTariffCost > max) {
        max = maxTariffCost;
      }
    });
    setMinPrice(min);
    setMaxPrice(max);
  };

  const minAndMaxSpeed = (tariffs) => {
    let min = Infinity;
    let max = -Infinity;
    tariffs.forEach((tariff) => {
      const internetSpeed = parseFloat(tariff.internet_speed);
      if (internetSpeed < min) {
        min = internetSpeed;
      }
      if (internetSpeed > max) {
        max = internetSpeed;
      }
    });
    setMinSpeed(min);
    setMaxSpeed(max);
  };

  useEffect(() => {
    if (tariffs.length > 0) {
      minAndMaxPrice(tariffs);
      minAndMaxSpeed(tariffs);
    }
  }, [tariffs]);

  console.log(tariffs, providers, loading);
  return (
    <>
      <Head>
        <title>Тарифы</title>
        <meta name="apple-mobile-web-app-title" content="On-wifi" />
      </Head>
      <Header />

      {providers.length === 0 ? null : (
        <SliderProviders providers={providers} />
      )}
      {tariffs.length === 0 ? (
        <NotTariffs status={1} />
      ) : (
        <Filter
          providersProp={providers}
          minPriceProp={minPrice}
          maxPriceProp={maxPrice}
          minSpeedProp={minSpeed}
          maxSpeedProp={maxSpeed}
        />
      )}

      <SliderTariffsFilter loading={loading} allTariffs={tariffs} />
      <AboutUs />
      <HelpForm />
      <Questions />
      <Footer />
      <PopUpLead></PopUpLead>
      <PopUpAgreement></PopUpAgreement>
      <PopUpPolicy></PopUpPolicy>
    </>
  );
};

export async function getServerSideProps(context) {
  const { address } = context.query;
  const { city } = context.query;
  let tariffs = [];
  let providers = [];
  let loading = true;

  try {
    if (address) {
      const response = await fetch(
        `${api}/tariffsAndProvidersOnAddressByHash/${address}`,
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

      const data = await response.json();
      tariffs = data.tariffs;
      providers = data.providers;
      loading = false;
    } else if (city) {
      const response = await fetch(`${api}/fullInfoDistrictByEndName/${city}`, {
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
      tariffs = data.tariffs;
      providers = data.providers;
      loading = false;
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }

  return {
    props: {
      tariffs,
      providers,
      loading,
    },
  };
}

export default Tariffs;
