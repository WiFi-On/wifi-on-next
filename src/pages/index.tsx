import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    const city = localStorage.getItem("city");
    const address = localStorage.getItem("address");
    const fetchData = async () => {
      try {
        const response = await axios.get("https://on-wifi.ru/get_my_city");
        localStorage.setItem("city", response.data.engname);
        localStorage.setItem("address", response.data.name);
        router.push(`/${response.data.engname}`);
      } catch (error) {
        console.error(error);
      }
    };
    if (city) {
      router.push(`/${city}`);
    } else {
      fetchData();
    }
  }, []);

  return <></>;
};

export default HomePage;
