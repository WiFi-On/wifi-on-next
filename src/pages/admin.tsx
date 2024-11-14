// pages/admin.tsx
import { GetServerSideProps } from "next";
import { verify } from "jsonwebtoken";
import nookies from "nookies";

import ExcelTc from "@/components/UppendFile/UppendFile";
import Header from "@/components/Header/Header";
import PartnerReport from "@/components/PartnerReport/PartnerReport";

const Admin = () => {
  return (
    <>
      <Header />
      <ExcelTc />
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
