// pages/admin.tsx
import { GetServerSideProps } from "next";
import { verify } from "jsonwebtoken";
import nookies from "nookies";

import Header from "@/components/Header/Header";
import PartnerReport from "@/components/PartnerReport/PartnerReport";
import SendExcel from "@/components/UppendFile/UppendFile";

const Admin = () => {
  return (
    <>
      <Header />
      <SendExcel
        urlApi="https://on-wifi.ru/api/v1/excel/upload"
        title="Получение тхв по адресам"
        filename="excels.zip"
      />
      <SendExcel
        urlApi="https://on-wifi.ru/api/v1/excel/leadsEissd"
        title="Заведение заявок в eissd"
        filename="leads.xlsx"
      />
      <PartnerReport />
    </>
  );
};

export default Admin;

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Получаем cookies с помощью nookies
  const cookies = nookies.get(context);
  const token = cookies.token; // Получаем токен из cookie

  if (!token) {
    return {
      redirect: {
        destination: "/auth", // Перенаправляем на страницу логина
        permanent: false,
      },
    };
  }

  try {
    // Проверяем токен (SECRET замените на ваш секретный ключ)
    verify(token, process.env.JWT_SECRET_KEY!);
    return { props: {} }; // Возвращаем props, если токен валиден
  } catch (error) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }
};
