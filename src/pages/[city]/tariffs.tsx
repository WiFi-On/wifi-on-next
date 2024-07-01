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

  const fetchGetTariffsHouse = async (id) => {
    fetch(`http://localhost:5005/api/fullInfoByHouse/${id}`)
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
    fetch(`http://localhost:5005/api/fullInfoDistrictByEndName/${engName}`)
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
    let min = 30000;
    let max = 0;
    tariffs.forEach((tariff) => {
      const maxTariffCost = parseFloat(tariff.max_tariff_cost);
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
      setLoading(true);
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
