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
import CookieAgreement from "@/components/CookieAgreement/CookieAgreement";
import Head from "next/head";
import api from "../../../public/host/host.js";
import PopUpComparison from "@/components/PopUpComparison/PopUpComparison";

const Tariffs = ({ tariffs, providers, loading, cityApi }) => {
  const router = useRouter();

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [minSpeed, setMinSpeed] = useState(0);
  const [maxSpeed, setMaxSpeed] = useState(5000);

  const [tariffsFilter, setTariffsFilter] = useState(tariffs);

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
    if (tariffsFilter.length > 0) {
      minAndMaxPrice(tariffsFilter);
      minAndMaxSpeed(tariffsFilter);
    }
  }, [tariffsFilter]);

  return (
    <>
      <Head>
        <title>
          Доступные провайдеры по городу {cityApi.name} 🙋‍♂️ Подключение домашнего
          интернета по выгодным условиям | Все тарифы на интернет, тв и
          мобильную связь
        </title>
        <meta
          name="description"
          content="Оставь заявку чтобы подключить интернет от крупных провайдеров 🌐 Наш сервис помогает провести интернет от Ростелекома, мтс, мегафон и более 20 провайдеров по вашему городу ➡ У нас все тарифы и актуальные акции на интернет.
"
        ></meta>
        <meta name="apple-mobile-web-app-title" content="On-wifi" />
      </Head>
      <Header />

      {providers.length > 0 ? <SliderProviders providers={providers} /> : null}
      {providers.length === 0 ? (
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

      <SliderTariffsFilter loading={loading} allTariffs={tariffsFilter} />
      <AboutUs />
      <HelpForm />
      <Questions />
      <Footer />
      <PopUpLead></PopUpLead>
      <PopUpAgreement></PopUpAgreement>
      <PopUpPolicy></PopUpPolicy>
      <CookieAgreement></CookieAgreement>
      <PopUpComparison></PopUpComparison>
    </>
  );
};

export async function getServerSideProps(context) {
  const { address } = context.query;
  const { city } = context.query;
  let tariffs = [];
  let providers = [];
  let loading = true;
  let cityApi = [];
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
      cityApi = data.infoDistrict;
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
      cityApi,
    },
  };
}

export default Tariffs;
