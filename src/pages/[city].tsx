// pages/[city].js
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Header from "../components/Header/Header";
import Main from "../components/Main/Main";
import ProvidersInCity from "../components/ProvidersInCity/ProvidersInCity";
import AboutUs from "../components/AboutUs/AboutUs";
import SliderTariffsMain from "../components/SliderTariffsMain/SliderTariffsMain";
import ConnectionSteps from "../components/ConnectionSteps/ConnectionSteps";
import HelpForm from "../components/HelpForm/HelpForm";
import Questions from "../components/Questions/Questions";
import Cities from "../components/Cities/Cities";
import Newsletter from "../components/NewsLetter/NewsLetter";
import Footer from "../components/Footer/Footer";
import PopUpLead from "@/components/PopUpLead/PopUpLead";
import PopUpAgreement from "@/components/PopUpAgreement/PopUpAgreement";
import PopUpPolicy from "@/components/PopUpPolicy/PopUpPolicy";
import Head from "next/head";
import CookieAgreement from "@/components/CookieAgreement/CookieAgreement";
import PopUpComparison from "@/components/PopUpComparison/PopUpComparison";

const Advantages = dynamic(() => import("@/components/Advantages/Advantages"), {
  ssr: false, // Отключаем серверный рендеринг
});

const api = process.env.URL_SERVER;

const CityPage = ({
  districtInfoData,
  tariffsData,
  providersData,
}: {
  districtInfoData: any;
  tariffsData: any;
  providersData: any;
}): JSX.Element => {
  return (
    <>
      <Head>
        <title>
          Интернет в {districtInfoData.namewhere} 🌐 - Подключение без
          ограничений 🚀 | On-WiFi
        </title>
        <link rel="icon" href="imgs/favicon.ico"></link>
        <meta
          name="description"
          content={
            "Выберите лучший интернет для дома и бизнеса в " +
            districtInfoData.namewhere +
            " 🏙️! 🌟 Высокая скорость, выгодные тарифы и подключение без хлопот 📡. Сравнивайте провайдеров и находите идеальные условия для вашего подключения! 📞"
          }
        />
        <meta name="apple-mobile-web-app-title" content="On-wifi" />
      </Head>
      <Header></Header>
      <Main></Main>
      <ProvidersInCity
        providers={providersData.providers}
        nameLocationWhere={districtInfoData.namewhere}
      ></ProvidersInCity>
      <SliderTariffsMain
        nameCityWhere={districtInfoData.namewhere}
        tariffs={tariffsData.tariffs}
      ></SliderTariffsMain>
      <AboutUs></AboutUs>
      <Advantages></Advantages>
      <ConnectionSteps></ConnectionSteps>
      <HelpForm></HelpForm>
      <Questions></Questions>
      <Cities></Cities>
      <Newsletter></Newsletter>
      <Footer></Footer>
      <PopUpLead></PopUpLead>
      <PopUpAgreement></PopUpAgreement>
      <PopUpPolicy></PopUpPolicy>
      <PopUpComparison></PopUpComparison>
      <CookieAgreement></CookieAgreement>
    </>
  );
};

export async function getStaticPaths() {
  try {
    const response = await fetch(`${api}/aggregator/get/allDistricts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "g2H3Ym90U3nmhStLikyWOLM662xaiG6BK3l41pYq",
      },
    });
    const cities = await response.json();

    const paths = cities.map((city: any) => ({
      params: { city },
    }));

    return {
      paths,
      fallback: false,
    };
  } catch (error) {
    console.error("Ошибка при загрузке списка городов:", error);
    return {
      paths: [],
      fallback: false,
    };
  }
}

export async function getStaticProps({ params }: any) {
  try {
    const districtInfoData = await getInfoCity(params.city);
    const tariffsData = await getTariffs(params.city);
    const providersData = await getProviders(params.city);

    return {
      props: {
        districtInfoData,
        tariffsData,
        providersData,
      },
    };
  } catch (error) {
    console.error(
      `Ошибка при загрузке данных для города: ${params.city}`,
      error
    );

    // Можно возвращать пустые данные для страницы с fallback: true
    return {
      notFound: true,
    };
  }
}

async function getInfoCity(district: string) {
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

  return cityData;
}
async function getTariffs(district: string) {
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
async function getProviders(district: string) {
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

export default CityPage;
