import { useState } from "react";
import styles from "./AuthForm.module.css";
import Cookies from "js-cookie";

function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function loginUser(email, password) {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok || !data.token) {
      throw new Error(data.message || "Ошибка входа");
    }
    return data;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const userData = await loginUser(email, password);
      Cookies.set("token", userData.token, { expires: 7 });
      console.log("Токен сохранен в куки:", userData.token);
    } catch (error) {
      setError(error.message);
      console.error("Ошибка:", error);
    }
  };

  return (
    <div className={styles.main}>
      <h1>Авторизация</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Почта"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Войти</button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}

export default AuthForm;
