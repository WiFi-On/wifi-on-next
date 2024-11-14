import { useState } from "react";
import Cookies from "js-cookie";
import styles from "./PartnerReport.module.css";
import { PartnerReportRegI } from "./PartnerReport.interfaces";

const companies = [
  { id: 1, name: "gdelu.ru" },
  { id: 2, name: "ISP" },
];

const PartnerReport = () => {
  const [selectedCompanyId, setSelectedCompanyId] = useState<
    string | undefined
  >("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false); // Состояние загрузки

  const handleCompanyChange = (event: any) => {
    const selectedId = event.target.value;
    setSelectedCompanyId(selectedId);
    console.log("Selected company ID:", selectedId);
  };

  const handleDateChange = (event: any, setDate: any) => {
    setDate(event.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true); // Включаем загрузку
    try {
      const requestBody: PartnerReportRegI = {
        partnerId: Number(selectedCompanyId),
        startDate: startDate,
        endDate: endDate,
      };

      const response = await fetch(
        `https://on-wifi.ru/api/v1/excel/partnerLeads`,
        {
          method: "POST",
          body: JSON.stringify(requestBody),
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to download Excel file");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "partner_leads.xlsx";
      document.body.appendChild(a);
      a.click();
      a.remove();

      console.log("Excel file downloaded successfully");
    } catch (error) {
      console.error("Error downloading Excel file:", error);
    } finally {
      setLoading(false); // Выключаем загрузку
    }
  };

  return (
    <div className={styles.main}>
      <label htmlFor="dateStartInput">Дата начала</label>
      <input
        type="date"
        id="dateStartInput"
        className={styles.dateInput}
        value={startDate}
        onChange={(e) => handleDateChange(e, setStartDate)}
      />
      <label htmlFor="dateEndInput">Дата конца</label>
      <input
        type="date"
        id="dateEndInput"
        className={styles.dateInput}
        value={endDate}
        onChange={(e) => handleDateChange(e, setEndDate)}
      />
      <label htmlFor="companySelect">Компания</label>
      <select
        id="companySelect"
        value={selectedCompanyId}
        onChange={handleCompanyChange}
        className={styles.companySelect}
      >
        <option value="" disabled>
          Выберите компанию
        </option>
        {companies.map((company) => (
          <option key={company.id} value={company.id}>
            {company.name}
          </option>
        ))}
      </select>
      <button
        onClick={handleSubmit}
        className={styles.submitButton}
        disabled={loading} // Отключаем кнопку во время загрузки
      >
        {loading ? "Загружаем..." : "Скачать отчет"} {/* Меняем текст кнопки */}
      </button>
      {loading && <div className={styles.loader}>Загрузка...</div>}{" "}
      {/* Показываем индикатор загрузки */}
    </div>
  );
};

export default PartnerReport;
