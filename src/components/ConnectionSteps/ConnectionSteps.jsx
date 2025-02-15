import { useState, useEffect } from "react";
import styles from "./ConnectionSteps.module.css";
import lineDesktop from "./imgs/lineDesktop.svg";
import diod from "./imgs/diod.svg";
import Image from "next/image";

const ConnectionSteps = () => {
  const [windowWidth, setWindowWidth] = useState(null);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  if (windowWidth > 800) {
    return (
      <div className={styles.main}>
        <h2>Этапы подключения</h2>
        <div className={styles.containerConnectionSteps}>
          <div className={styles.steps}>
            <div className={styles.step1}>
              <div className={styles.text}>
                <p className={styles.title}>Оставьте заявку</p>
                <p className={styles.desc}>
                  Сделайте это прямо на сайте или позвоните нам
                </p>
              </div>
              <Image src={diod} alt="Диод" />
              <span>1</span>
            </div>
            <div className={styles.step2}>
              <span>2</span>
              <Image src={diod} alt="Диод" />
              <div className={styles.text}>
                <p className={styles.title}>Звонок менеджера</p>
                <p className={styles.desc}>
                  Наш оператор ответит на все интересующие вас вопросы и оформит
                  заявку на подключение
                </p>
              </div>
            </div>
            <div className={styles.step3}>
              <div className={styles.text}>
                <p className={styles.title}>Подключение</p>
                <p className={styles.desc}>
                  В удобное для вас время техник приедет на ваш адрес
                  и подключит выбранные услуги
                </p>
              </div>
              <Image src={diod} alt="Диод" />
              <span>3</span>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.mainMobile}>
        <h2>Этапы подключения</h2>

        <div className={styles.stepsMobile}>
          <div className={styles.stepMobile}>
            <Image src={diod} alt="Диод" />
            <span>1</span>
            <div className={styles.textMobile}>
              <p className={styles.title}>Оставьте заявку</p>
              <p className={styles.desc}>
                Сделайте это прямо на сайте или позвоните нам
              </p>
            </div>
          </div>
          <div className={styles.stepsMobile}>
            <div className={styles.stepMobile}>
              <Image src={diod} alt="Диод" />
              <span>2</span>
              <div className={styles.textMobile}>
                <p className={styles.title}>Звонок менеджера</p>
                <p className={styles.desc}>
                  Наш оператор ответит на все интересующие вас вопросы и оформит
                  заявку на подключение
                </p>
              </div>
            </div>
          </div>
          <div className={styles.stepsMobile}>
            <div className={styles.stepMobile}>
              <Image src={diod} alt="Диод" />
              <span>3</span>
              <div className={styles.textMobile}>
                <p className={styles.title}>Подключение</p>
                <p className={styles.desc}>
                  В удобное для вас время техник приедет на ваш адрес
                  и подключит выбранные услуги
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ConnectionSteps;
