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

const Tariffs = () => {
  const router = useRouter();
  const { address } = router.query;
  const { city } = router.query;
  const [tariffs, setTariffs] = useState([]);
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [minSpeed, setMinSpeed] = useState(0);
  const [maxSpeed, setMaxSpeed] = useState(5000);

  const fetchGetTariffsHouse = async (hashAddress) => {
    fetch(`${api}/tariffsAndProvidersOnAddressByHash/${hashAddress}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setTariffs(data.tariffs);
        setProviders(data.providers);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  };
  const fetchGetTariffsDistrict = async (engName) => {
    fetch(`${api}/fullInfoDistrictByEndName/${engName}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setTariffs(data.tariffs);
        setProviders(data.providers);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  };
  const minAndMaxPrice = (tariffs) => {
    console.log(tariffs);
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
    if (address) {
      setLoading(false);
      fetchGetTariffsHouse(address);
    } else if (city) {
      setLoading(true);
      fetchGetTariffsDistrict(city);
    }
  }, [address, city]);

  useEffect(() => {
    if (tariffs.length > 0) {
      minAndMaxPrice(tariffs);
      minAndMaxSpeed(tariffs);
    }
  }, [tariffs]);

  return (
    <>
      <Head>
        <title>Тарифы</title>

        <meta name="apple-mobile-web-app-title" content="On-wifi" />
      </Head>

      <Header />
      <SliderProviders providers={providers} />
      <Filter
        providersProp={providers}
        minPriceProp={minPrice}
        maxPriceProp={maxPrice}
        minSpeedProp={minSpeed}
        maxSpeedProp={maxSpeed}
      />
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

export default Tariffs;
