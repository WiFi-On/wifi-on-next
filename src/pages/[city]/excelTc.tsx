import React, { useState } from "react";
import api from "../../../public/host/host.js";

const ExcelTc = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      setMessage("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("excelFile", file);

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
        setMessage("File uploaded and processed successfully.");
      } else {
        const result = await response.json();
        setMessage(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setMessage("Error uploading file.");
    }
  };

  return (
    <div>
      <h1>Выберите excel файл</h1>
      <form id="uploadForm" onSubmit={handleSubmit}>
        <input
          type="file"
          name="excelFile"
          accept=".xls,.xlsx"
          onChange={handleFileChange}
          required
        />
        <button type="submit">Upload</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ExcelTc;
