import React, { useState, useRef } from "react";
import api from "../../../public/host/host.js";
import styles from "./UppendFile.module.css";

const ExcelTc = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const dropRef = useRef(null);
  const fileInputRef = useRef(null);

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

    const formData = new FormData();
    formData.append("excelFile", file);
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${api}/excelTc`, {
        method: "POST",
        headers: {
          "x-api-key": "g2H3Ym90U3nmhStLikyWOLM662xaiG6BK3l41pYq",
        },
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "archive.zip"; // Укажите имя файла
        document.body.appendChild(a);
        a.click();
        a.remove();
        setMessage("Файл успешно загружен и обработан.");
      } else {
        const result = await response.json();
        setMessage(`Ошибка: ${result.message}`);
      }
    } catch (error) {
      console.error("Ошибка загрузки файла:", error);
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
