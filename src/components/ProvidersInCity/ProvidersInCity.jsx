import { useEffect, useState } from "react";
import styles from "./ProvidersInCity.module.css";
import akaImg from "./img/iconLogoAka.svg";
import almImg from "./img/iconLogoAlm.svg";
import bilImg from "./img/iconLogoBil.svg";
import domImg from "./img/iconLogoDom.svg";
import megImg from "./img/iconLogoMeg.svg";
import mtsImg from "./img/iconLogoMts.svg";
import qweImg from "./img/iconLogoQwe.svg";
import rosImg from "./img/iconLogoRos.svg";
import rusImg from "./img/iconLogoRus.svg";
import skyImg from "./img/iconLogoSky.svg";
import ttkImg from "./img/iconLogoTtk.svg";

const ProvidersInCity = (props) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (windowWidth > 1280) {
    return (
      <div className={styles.main}>
        <h2>Провайдеры доступные в Тюмени</h2>
        <div className={styles.providers}>
          <img src={akaImg} alt="" />
          <img src={almImg} alt="" />
          <img src={bilImg} alt="" />
          <img src={domImg} alt="" />
          <img src={megImg} alt="" />
          <img src={mtsImg} alt="" />
          <img src={qweImg} alt="" />
          <img src={rosImg} alt="" />
          <img src={rusImg} alt="" />
          <img src={skyImg} alt="" />
          <img src={ttkImg} alt="" />
        </div>
      </div>
    );
  } else if (windowWidth <= 1280 && windowWidth >= 440) {
    return (
      <div className={styles.tabletMain}>
        <h2>Провайдеры доступные в Тюмени</h2>
        <div className={styles.providersTablet}>
          <img className={styles.tabletImg} src={akaImg} alt="" />
          <img className={styles.tabletImg} src={almImg} alt="" />
          <img className={styles.tabletImg} src={bilImg} alt="" />
          <img className={styles.tabletImg} src={domImg} alt="" />
          <img className={styles.tabletImg} src={megImg} alt="" />
          <img className={styles.tabletImg} src={mtsImg} alt="" />
          <img className={styles.tabletImg} src={qweImg} alt="" />
          <img className={styles.tabletImg} src={rosImg} alt="" />
          <img className={styles.tabletImg} src={rusImg} alt="" />
          <img className={styles.tabletImg} src={skyImg} alt="" />
          <img className={styles.tabletImg} src={ttkImg} alt="" />
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.mobileMain}>
        <h2>Провайдеры доступные в Тюмени</h2>
        <div className={styles.providersMobile}>
          <img className={styles.mobileImg} src={akaImg} alt="" />
          <img className={styles.mobileImg} src={almImg} alt="" />
          <img className={styles.mobileImg} src={bilImg} alt="" />
          <img className={styles.mobileImg} src={domImg} alt="" />
          <img className={styles.mobileImg} src={megImg} alt="" />
          <img className={styles.mobileImg} src={mtsImg} alt="" />
          <img className={styles.mobileImg} src={qweImg} alt="" />
          <img className={styles.mobileImg} src={rosImg} alt="" />
          <img className={styles.mobileImg} src={rusImg} alt="" />
          <img className={styles.mobileImg} src={skyImg} alt="" />
          <img className={styles.mobileImg} src={ttkImg} alt="" />
        </div>
      </div>
    );
  }
};

export default ProvidersInCity;
