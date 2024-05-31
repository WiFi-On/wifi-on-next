import styles from "./Footer.module.css";
import { useState, useEffect } from "react";
import iconLogo from "./imgs/iconLogo.png";
import tgIcon from "./imgs/iconTG.png";
import waIcon from "./imgs/iconWA.png";
import Image from "next/image";

const Footer = () => {
  const [windowWidth, setWindowWidth] = useState(null);
  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    handleWindowResize();

    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });
  if (windowWidth >= 1024) {
    return (
      <div className={styles.main}>
        <div className={styles.policyAndAgreement}>
          <Image src={iconLogo} alt="" />
          <p>Политика конфиденциальности</p>
          <p>Пользовательское соглашение</p>
        </div>
        <div className={styles.nav}>
          <div className={styles.wrapperNav}>
            <p>О нас</p>
            <p>Провайдеры</p>
            <p>Тарифы</p>
          </div>
          <div className={styles.wrapperNav}>
            <p>Помощь</p>
            <p>Ответы на вопросы</p>
            <p>Контакты</p>
          </div>
        </div>
        <div className={styles.numberAndLinks}>
          <h5 className={styles.partner}>Я партнер</h5>
          <h5 className={styles.number}>+7 (800) 550–07–92</h5>
          <p>Бесплатная консультация Ежедневно с 9 до 22 часов</p>
          <div className={styles.links}>
            <a href="">
              <Image src={tgIcon} alt="" />
            </a>
            <a href="">
              <Image src={waIcon} alt="" />
            </a>
          </div>
        </div>
      </div>
    );
  } else if (windowWidth < 1024 && windowWidth >= 660) {
    return (
      <div className={styles.mainTablet}>
        <div className={styles.topTablet}>
          <Image src={iconLogo} alt="" />
          <div className={styles.navTablet}>
            <div className={styles.wrapperNavTablet}>
              <p>О нас</p>
              <p>Провайдеры</p>
              <p>Тарифы</p>
            </div>
            <div className={styles.wrapperNavTablet}>
              <p>Помощь</p>
              <p>Ответы на вопросы</p>
              <p>Контакты</p>
            </div>
          </div>
          <div className={styles.numberAndLinksTablet}>
            <h5 className={styles.partnerTablet}>Я партнер</h5>
            <h5 className={styles.numberTablet}>+7 (800) 550–07–92</h5>
            <p>Бесплатная консультация Ежедневно с 9 до 22 часов</p>
          </div>
        </div>
        <div className={styles.botTablet}>
          <div className={styles.policyAndAgreementTablet}>
            <p>Политика конфиденциальности</p>
            <p>Пользовательское соглашение</p>
          </div>
          <div className={styles.linksTablet}>
            <a href="">
              <Image src={tgIcon} alt="" />
            </a>
            <a href="">
              <Image src={waIcon} alt="" />
            </a>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.mainMobile}>
        <div className={styles.topOrLeft}>
          {" "}
          <Image src={iconLogo} alt="" />
          <div className={styles.navMobile}>
            <p>О нас</p>
            <p>Провайдеры</p>
            <p>Тарифы</p>
            <p>Помощь</p>
            <p>Ответы на вопросы</p>
            <p>Контакты</p>
          </div>
        </div>
        <div className={styles.botOrRight}>
          <h5 className={styles.partnerMobile}>Я партнер</h5>
          <div className={styles.numberAndLinksMobile}>
            <h5 className={styles.numberMobile}>+7 (800) 550–07–92</h5>
            <p>Бесплатная консультация Ежедневно с 9 до 22 часов</p>
          </div>
          <div className={styles.linksMobile}>
            <a href="">
              <Image src={tgIcon} alt="" />
            </a>
            <a href="">
              <Image src={waIcon} alt="" />
            </a>
          </div>
          <div className={styles.policyAndAgreementMobile}>
            <p>Политика конфиденциальности</p>
            <p>Пользовательское соглашение</p>
          </div>
        </div>
      </div>
    );
  }
};

export default Footer;
