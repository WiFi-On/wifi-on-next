import Header from "../components/Header/Header";
import SliderProviders from "../components/SliderProviders/SliderProviders";
import Filter from "../components/Filter/Filter";
import SliderTariffsFilter from "../components/SliderTariffsFilter/SliderTariffsFilter";
import HelpForm from "../components/HelpForm/HelpForm";
import Footer from "../components/Footer/Footer";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Questions from "@/components/Questions/Questions";
import { Element } from "react-scroll";
import AboutUs from "@/components/AboutUs/AboutUs";
import PopUpLead from "@/components/PopUpLead/PopUpLead";
import PopUpAgreement from "@/components/PopUpAgreement/PopUpAgreement";
import PopUpPolicy from "@/components/PopUpPolicy/PopUpPolicy";

const Tariffs = () => {
  const router = useRouter();
  const { address } = router.query;
  const [tariffs, setTariffs] = useState([]);
  const [providers, setProviders] = useState([]);
  const [filterProviders, setFilterProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (address) {
      setLoading(true);
      fetch(`https://on-wifi.ru/get_tariffs?address=${address}`)
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
    }
  }, [address]);

  return (
    <>
      <Header />
      <SliderProviders providers={providers} />
      <Filter />
      <SliderTariffsFilter allTariffs={tariffs} />
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
