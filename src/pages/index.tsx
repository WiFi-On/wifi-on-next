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
        <title>
          Интернет в Москве 🌐 - Подключение без ограничений 🚀 | On-WiFi
        </title>
        <meta
          name="description"
          content="SEO сайта On-wifi.ru - 11.2024 Выберите лучший интернет для дома и
          бизнеса в Москве 🏙️! 🌟 Высокая скорость, выгодные тарифы и
          подключение без хлопот 📡. Сравнивайте провайдеров и находите
          идеальные условия для вашего подключения! 📞 Выберите лучший интернет
          для дома и бизнеса в Москве 🏙️! 🌟 Высокая скорость, выгодные тарифы и
          подключение без хлопот 📡. Сравнивайте провайдеров и находите
          идеальные условия для вашего подключения! 📞 Включить программу чтения
          с экрана Чтобы включить программу чтения с экрана, нажмите Ctrl+Alt+Z.
          Для просмотра списка быстрых клавиш нажмите Ctrl+косая черта."
        />
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
