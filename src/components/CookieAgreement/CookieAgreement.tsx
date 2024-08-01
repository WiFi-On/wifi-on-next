import { useState, useEffect } from "react";
import styles from "./CookieAgreement.module.css";

const CookieAgreement = () => {
  const [isAccepted, setIsAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Состояние для управления задержкой рендеринга

  useEffect(() => {
    // Проверяем, есть ли запись о согласии в localStorage
    const cookieConsent = localStorage.getItem("cookie-consent");
    if (cookieConsent === "true") {
      setIsAccepted(true);
    }
    // Задержка, чтобы избежать резкого появления и исчезновения
    const timer = setTimeout(() => setIsLoading(false), 100); // Можно настроить время задержки

    return () => clearTimeout(timer);
  }, []);

  const handleAccept = () => {
    // Устанавливаем состояние и сохраняем в localStorage
    setIsAccepted(true);
    localStorage.setItem("cookie-consent", "true");
  };

  if (isLoading) return null; // Пока состояние загружается, ничего не отображаем
  if (isAccepted) return null; // Если согласие уже получено, ничего не отображаем

  return (
    <div className={styles.main}>
      <p>
        Посещая сайт, вы даёте согласие на обработку файлов Cookie
        в соответствии с Политикой обработки персональных данных
      </p>
      <button className={styles.button} onClick={handleAccept}>
        Согласен
      </button>
    </div>
  );
};

export default CookieAgreement;
