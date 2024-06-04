import { useEffect } from "react";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
  const { req, res, query } = context;
  const city = query.city || ""; // Получение города из query параметра, если он есть

  if (!city) {
    // Если город не указан, перенаправляем на страницу Москвы
    return {
      redirect: {
        destination: "/Москва",
        permanent: false,
      },
    };
  }

  const DADATA_API_URL =
    "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
  const DADATA_API_KEY = "ваш_API_ключ";

  try {
    const response = await fetch(DADATA_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${DADATA_API_KEY}`,
      },
      body: JSON.stringify({ query: city, count: 1 }),
    });

    const data = await response.json();
    const suggestions = data.suggestions;

    if (suggestions.length > 0) {
      const foundCity = suggestions[0].data.city;
      return {
        redirect: {
          destination: `/${foundCity}`,
          permanent: false,
        },
      };
    } else {
      return {
        redirect: {
          destination: "/Москва",
          permanent: false,
        },
      };
    }
  } catch (error) {
    console.error(error);
    return {
      redirect: {
        destination: "/Москва",
        permanent: false,
      },
    };
  }
}

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Перенаправляем на страницу Москвы, если city не указан
    router.push("/Москва");
  }, []);

  return null; // Компонент ничего не рендерит, так как идет перенаправление
}
