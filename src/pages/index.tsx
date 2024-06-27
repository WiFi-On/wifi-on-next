import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    const city = localStorage.getItem("city");
    const fetchIp = async () => {
      try {
        const response = await fetch("/api/getIp");
        const data = await response.json();
        localStorage.setItem("city", data.city);
        console.log(data);
        router.push(`/${data.city}`);
      } catch (error) {
        console.error(error);
        localStorage.setItem("city", "Moskva");
        router.push(`/Moskva`);
      }
    };
    if (city) {
      fetchIp();
    }
  }, []);

  return <></>;
};

export default HomePage;
