import { useState } from "react";
import styles from "./AuthForm.module.css";
import { useRouter } from "next/router";

function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  async function loginUser(email, password) {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Ошибка входа");
    }
    return data;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await loginUser(email, password);
      router.push("/admin");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className={styles.main}>
      <h1>Авторизация</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <p>Логин</p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <p>Пароль</p>
        <input
          type="password"
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
