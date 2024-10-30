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
import { api } from "../../public/host/host.js";
import CookieAgreement from "@/components/CookieAgreement/CookieAgreement";
import PopUpComparison from "@/components/PopUpComparison/PopUpComparison";

const Advantages = dynamic(() => import("@/components/Advantages/Advantages"), {
  ssr: false, // Отключаем серверный рендеринг
});

const CityPage = ({
  districtInfoData,
  tariffsData,
  providersData,
}: {
  districtInfoData: any;
  tariffsData: any;
  providersData: any;
}): JSX.Element => {
  console.log(districtInfoData);
  return (
    <>
      <Head>
        <title>
          Тарифы на интернет в {districtInfoData.namewhere} 🙋‍♂️ Домашний интернет
          в квартиру | Тарифы и акции на интернет - On-wifi
        </title>
        <link rel="icon" href="imgs/favicon.ico"></link>
        <meta
          name="description"
          content={
            "Какой интернет подключить " +
            districtInfoData.name +
            "➡️ Выбрать интернет на квартиру в " +
            districtInfoData.namewhere +
            " 🌐 Выбрать лучший тариф на домашний интернет"
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
  const response = await fetch(`${api}/aggregator/get/allDistricts`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "g2H3Ym90U3nmhStLikyWOLM662xaiG6BK3l41pYq",
    },
  });
  const cities = await response.json();

  const paths = cities.map((city: string) => ({
    params: { city },
  }));

  return {
    paths,
    fallback: false,
  };
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

export async function getStaticProps({ params }: any) {
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
}

export default CityPage;
