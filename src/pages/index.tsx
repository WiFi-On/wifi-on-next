import { useEffect } from "react";
import { useRouter } from "next/router";
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
  }, [router]);

  return (
    <>
      <Head>
        <title>On-wifi</title>
        <meta
          name="google-site-verification"
          content="jHJirAJdbatlAU98ZA3iyQByH09vndy8VePzSk9PMjA"
        />
        <meta name="yandex-verification" content="afd8dc656fe38ac2" />
      </Head>
    </>
  );
};

export default HomePage;
