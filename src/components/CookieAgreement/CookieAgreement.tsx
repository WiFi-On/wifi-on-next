import { useState, useEffect } from "react";
import styles from "./CookieAgreement.module.css";
import { CSSTransition } from "react-transition-group";

const CookieAgreement = () => {
  const [isAccepted, setIsAccepted] = useState(false);
  const [isVisible, setIsVisible] = useState(false); // Новое состояние для управления видимостью
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const cookieConsent = localStorage.getItem("cookie-consent");
    if (cookieConsent === "true") {
      setIsAccepted(true);
    } else {
      setIsVisible(true); // Показываем компонент только если согласие не получено
    }

    const timer = setTimeout(() => setIsLoading(false), 100);

    return () => clearTimeout(timer);
  }, []);

  const handleAccept = () => {
    setIsAccepted(true);
    setIsVisible(false); // Начинаем анимацию скрытия
    localStorage.setItem("cookie-consent", "true");
  };

  if (isLoading) return null;

  return (
    <CSSTransition
      in={isVisible && !isAccepted} // Управляем видимостью через isVisible
      timeout={300}
      classNames={{
        enter: styles.enter,
        enterActive: styles.enterActive,
        exit: styles.exit,
        exitActive: styles.exitActive,
      }}
      unmountOnExit
    >
      <div className={styles.main}>
        <p>
          Посещая сайт, вы даёте согласие на обработку файлов Cookie
          в соответствии с Политикой обработки персональных данных
        </p>
        <button className={styles.button} onClick={handleAccept}>
          Согласен
        </button>
      </div>
    </CSSTransition>
  );
};

export default CookieAgreement;
