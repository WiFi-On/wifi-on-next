import { GetStaticPaths, GetStaticProps } from "next";
import fetch from "node-fetch";

export default function CityPage({ data }) {
  return (
    <div>
      <h1>Информация о городе</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
-
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { city } = params;
  // Получаем информацию о городе
  const res = await fetch(
    `https://on-wifi.ru/district_info?districtengname=${city}`
  );
  const data = await res.json();

  return {
    props: { data },
  };
};
