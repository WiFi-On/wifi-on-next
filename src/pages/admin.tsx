// pages/admin.tsx
import { useEffect } from "react";
import { useRouter } from "next/router";
import { jwtDecode } from "jwt-decode"; // Установите через npm install jwt-decode
import Header from "../components/Header/Header";
import PartnerReport from "@/components/PartnerReport/PartnerReport";
import SendExcel from "@/components/UppendFile/UppendFile";

const Admin = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      // Перенаправляем на страницу авторизации, если токен отсутствует
      router.push("/auth");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const now = Math.floor(Date.now() / 1000);

      if (!decoded.exp || decoded.exp < now) {
        router.push("/auth");
      }
    } catch (error) {
      console.error("Ошибка при проверке токена", error);
      router.push("/auth"); // Перенаправляем при ошибке
    }
  }, [router]);

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
