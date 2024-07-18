import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import api from "../../public/host/host.js";

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    const city = localStorage.getItem("city");
    const fetchIp = async () => {
      try {
        const response = await fetch(`${api}/ipAndCity`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "g2H3Ym90U3nmhStLikyWOLM662xaiG6BK3l41pYq",
          },
        });
        const data = await response.json();
        if (data.city) {
          localStorage.setItem("city", data.city);
          router.push(`/${data.city}`);
        } else {
          localStorage.setItem("city", "Moscow");
          router.push(`/Moscow`);
        }
      } catch (error) {
        console.error(error);
        localStorage.setItem("city", "Moscow");
        router.push(`/Moscow`);
      }
    };
    fetchIp();
  }, []);

  return <></>;
};

export default HomePage;
