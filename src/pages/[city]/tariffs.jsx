import Header from "@/components/Header/Header";
import SliderProviders from "@/components/SliderProviders/SliderProviders";
import Filter from "@/components/Filter/Filter";
import SliderTariffsFilter from "@/components/SliderTariffsFilter/SliderTariffsFilter";
import HelpForm from "@/components/HelpForm/HelpForm";
import Footer from "@/components/Footer/Footer";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Questions from "@/components/Questions/Questions";
import AboutUs from "@/components/AboutUs/AboutUs";
import PopUpLead from "@/components/PopUpLead/PopUpLead";
import PopUpAgreement from "@/components/PopUpAgreement/PopUpAgreement";
import PopUpPolicy from "@/components/PopUpPolicy/PopUpPolicy";
import NotTariffs from "@/components/NotTariffs/NotTariffs";
import CookieAgreement from "@/components/CookieAgreement/CookieAgreement";
import Head from "next/head";
import PopUpComparison from "@/components/PopUpComparison/PopUpComparison";

const api = process.env.URL_SERVER;

const Tariffs = ({ tariffs, providers, loading, cityApi }) => {
  const router = useRouter();

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [minSpeed, setMinSpeed] = useState(0);
  const [maxSpeed, setMaxSpeed] = useState(5000);

  const [tariffsFilter, setTariffsFilter] = useState(tariffs.tariffs);
  const [providersFilter, setProvidersFilter] = useState(providers.providers);

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
    const fetchTariffsRTK = async (address) => {
      // Добавляем временный объект "ЗагрузкаРТК"
      setProvidersFilter((prevProviders) => [
        { id: 0, name: "ЗагрузкаРТК" },
        ...prevProviders,
      ]);

      try {
        const res = await fetch("/api/checkTHV", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ address: address }),
        });

        const tariffsRTK = await res.json();

        if (tariffsRTK.length > 0) {
          // Обновляем состояние после получения данных
          setTariffsFilter((prevTariffs) => [...tariffsRTK, ...prevTariffs]);

          setProvidersFilter((prevProviders) => [
            { id: 10, name: "Ростелеком" },
            ...prevProviders.filter((provider) => provider.id !== 0), // Удаляем временный объект
          ]);
        } else {
          setProvidersFilter((prevProviders) =>
            prevProviders.filter((provider) => provider.id !== 0)
          );
        }
      } catch (error) {
        console.error("Ошибка при получении тарифов:", error); // Логирование ошибок
      } finally {
        // В блоке finally также можно убедиться, что временный объект удален
        setProvidersFilter((prevProviders) =>
          prevProviders.filter((provider) => provider.id !== 0)
        );
      }
    };

    const { address } = router.query;
    address && fetchTariffsRTK(address);
  }, []);

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
          Тарифы интернета от On-wifi в {cityApi.namewhere} 📶 | Выгодные цены и
          условия
        </title>
        <link rel="icon" href="imgs/favicon.ico"></link>
        <meta
          name="description"
          content={`Узнайте актуальные тарифы и цены на интернет от On-wifi в ${cityApi.namewhere}. 🌐 Подберите лучший тариф для себя с удобными условиями подключения и отличной скоростью!`}
        ></meta>
        <meta name="apple-mobile-web-app-title" content="On-wifi" />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      {providers.providers.length > 0 ? (
        <SliderProviders providers={providersFilter} />
      ) : null}
      {providers.length === 0 ? (
        <NotTariffs status={1} />
      ) : (
        <Filter
          providersProp={providersFilter}
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

async function getInfoCity(district) {
  const res = await fetch(
    `${api}/aggregator/get/districtInfo?district=${district}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "g2H3Ym90U3nmhStLikyWOLM662xaiG6BK3l41pYq",
      },
    }
  );

  const cityData = await res.json();

  return {
    cityData,
  };
}
async function getTariffsOnAddress(address) {
  const res = await fetch(
    `${api}/aggregator/get/tariffs/onAddress?address=${address}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "g2H3Ym90U3nmhStLikyWOLM662xaiG6BK3l41pYq",
      },
    }
  );

  const tariffs = await res.json();

  return {
    tariffs,
  };
}
async function getProvidersOnAddress(address) {
  const res = await fetch(
    `${api}/aggregator/get/providers/onAddress?address=${address}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "g2H3Ym90U3nmhStLikyWOLM662xaiG6BK3l41pYq",
      },
    }
  );

  const providers = await res.json();

  return {
    providers,
  };
}
async function getTariffsOnDistrict(district) {
  const res = await fetch(
    `${api}/aggregator/get/tariffs/onDistrict?district=${district}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "g2H3Ym90U3nmhStLikyWOLM662xaiG6BK3l41pYq",
      },
    }
  );

  const tariffs = await res.json();

  return {
    tariffs,
  };
}
async function getProvidersOnDistrict(district) {
  const res = await fetch(
    `${api}/aggregator/get/providers/onDistrict?district=${district}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "g2H3Ym90U3nmhStLikyWOLM662xaiG6BK3l41pYq",
      },
    }
  );

  const providers = await res.json();

  return {
    providers,
  };
}
export async function getServerSideProps(context) {
  const { address } = context.query;
  const { city } = context.query;

  let loading = true;

  try {
    if (!address) {
      var tariffs = await getTariffsOnDistrict(city);
      var providers = await getProvidersOnDistrict(city);
      var cityApi = await getInfoCity(city);
      loading = false;
    } else {
      var tariffs = await getTariffsOnAddress(address);
      var providers = await getProvidersOnAddress(address);
      var cityApi = await getInfoCity(city);
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
