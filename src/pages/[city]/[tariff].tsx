import Header from "../../components/Header/Header";
import Tariff from "../../components/Tariff/Tariff";
import Footer from "../../components/Footer/Footer";
import HelpForm from "../../components/HelpForm/HelpForm";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

function TariffPage() {
  const router = useRouter();
  const { city, tariff } = router.query;

  const [tariffData, setTariffData] = useState(null);

  useEffect(() => {
    if (!tariff) return; // Дождитесь, пока тариф не будет доступен

    fetch(`https://on-wifi.ru/get_tariff?id=${tariff}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Преобразование ответа в JSON
      })
      .then((data) => {
        setTariffData(data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, [tariff, city]); // Зависимость от тариф и город
  return (
    <>
      <Header />
      {tariffData ? <Tariff tariffInfo={tariffData} /> : <p>Loading...</p>}
      <HelpForm />
      <Footer />
    </>
  );
}

export default TariffPage;
