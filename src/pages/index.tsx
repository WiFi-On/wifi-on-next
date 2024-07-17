import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import api from "../../public/host/host.js";

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    const city = localStorage.getItem("city");
    const fetchIp = async () => {
      try {
        const response = await fetch(`${api}/getIpAndCity`);
        const data = await response.json();
        if (data.city) {
          localStorage.setItem("city", data.city);
          router.push(`/${data.city}`);
        } else {
          localStorage.setItem("city", "Moskva");
          router.push(`/Moskva`);
        }
      } catch (error) {
        console.error(error);
        localStorage.setItem("city", "Moskva");
        router.push(`/Moskva`);
      }
    };
    fetchIp();
  }, []);

  return <></>;
};

export default HomePage;
