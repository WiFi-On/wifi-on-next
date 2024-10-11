import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { api } from "../../public/host/host.js";
import Head from "next/head";

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
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
        console.log(data.engName);
        if (data.engName) {
          localStorage.setItem("city", data.engName);
          router.push(`/${data.engName}`);
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
