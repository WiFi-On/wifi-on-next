import React, { useState, useRef } from "react";
import styles from "./UppendFile.module.css";
import Cookies from "js-cookie";
import isTokenValid from "../../auth/is-token-valid.js";
import { useRouter } from "next/router";

const ExcelTc = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const dropRef = useRef(null);
  const fileInputRef = useRef(null);

  const router = useRouter();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setMessage(`Выбранный файл: ${selectedFile.name}`);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    dropRef.current.classList.add(styles.dragging);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    dropRef.current.classList.remove(styles.dragging);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    dropRef.current.classList.remove(styles.dragging);
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      setMessage(`Выбранный файл: ${droppedFile.name}`);
    }
  };

  const handleDropZoneClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      setMessage("Пожалуйста, выберите файл.");
      return;
    }

    if (!isTokenValid()) {
      setMessage("Срок действия токена истек. Пожалуйста, войдите снова.");
      router.push("/auth"); // Перенаправление на страницу авторизации
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`https://on-wifi.ru/api/v1/excel/upload`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "archive.zip";
        document.body.appendChild(a);
        a.click();
        a.remove();
        setMessage("Файл успешно загружен и обработан.");
      } else {
        const result = await response.json();
        setMessage(`Ошибка: ${result.message}`);
      }
    } catch (error) {
      setMessage("Ошибка загрузки файла.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Выберите Excel файл</h1>
      <div
        ref={dropRef}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleDropZoneClick}
        className={styles.dropZone}
      >
        <p>Перетащите файл сюда или нажмите для выбора</p>
        <input
          type="file"
          name="excelFile"
          accept=".xls,.xlsx"
          onChange={handleFileChange}
          ref={fileInputRef}
          style={{ display: "none" }}
        />
      </div>
      <form id="uploadForm" onSubmit={handleSubmit}>
        <button type="submit" disabled={loading}>
          {loading ? "Загрузка..." : "Загрузить"}
        </button>
      </form>
      {loading && <div className={styles.spinner}>Загрузка...</div>}
      {message && <p>{message}</p>}
    </div>
  );
};

export default ExcelTc;
