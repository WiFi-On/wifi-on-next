import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { api } from "../../public/host/host.js";
import Head from "next/head";

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    const fetchIp = async () => {
      try {
        const response = await fetch(`/api/getDistrict`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const engname = await response.json();

        if (engname) {
          localStorage.setItem("city", engname);
          router.push(`/${engname}`);
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
