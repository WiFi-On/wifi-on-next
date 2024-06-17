import styles from "./Main.module.css";
import CardTypeConnect from "./CardTypeConnect/CardTypeConnect";
import connectionsImg from "./connection.svg";
import Search from "./Search/Search";
import { useState, useEffect } from "react";
import Image from "next/image";

const Main = () => {
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
  }, []);

  if (windowWidth > 1280) {
    return (
      <div className={styles.main}>
        <div className={styles.top}>
          <div className={styles.textAndSearch}>
            <div className={styles.text}>
              <h1>Найди своего идеального провайдера здесь</h1>
              <h3>Подключи интернет / телевидение / связь</h3>
            </div>
            <Search></Search>
          </div>
          <Image
            className={styles.connectionsImg}
            src={connectionsImg}
            alt=""
          />
        </div>
        <div className={styles.bot}>
          <CardTypeConnect type="Internet+TV"></CardTypeConnect>
          <CardTypeConnect type="Internet"></CardTypeConnect>
          <CardTypeConnect type="TV"></CardTypeConnect>
          <CardTypeConnect type="Internet+Connection+TV"></CardTypeConnect>
        </div>
      </div>
    );
  } else if (windowWidth <= 1280 && windowWidth >= 440) {
    return (
      <div className={styles.mainTablet}>
        <div className={styles.topTablet}>
          <div className={styles.textAndSearchTablet}>
            <div className={styles.textTablet}>
              <h1>Найди своего идеального провайдера здесь</h1>
              <h3>Подключи интернет / телевидение / связь</h3>
            </div>
            <Search device="tablet"></Search>
          </div>
          <Image
            className={styles.connectionsImgTablet}
            src={connectionsImg}
            alt=""
          />
        </div>
        <div className={styles.botTablet}>
          <CardTypeConnect device="tablet" type="Internet+TV"></CardTypeConnect>
          <CardTypeConnect device="tablet" type="Internet"></CardTypeConnect>
          <CardTypeConnect device="tablet" type="TV"></CardTypeConnect>
          <CardTypeConnect
            device="tablet"
            type="Internet+Connection+TV"
          ></CardTypeConnect>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.mainMobile}>
        <div className={styles.topMobile}>
          <div className={styles.textAndSearchMobile}>
            <div className={styles.textMobile}>
              <h1>Найди своего идеального провайдера здесь</h1>
              <h3>Подключи интернет / телевидение / связь</h3>
            </div>
            <Search device="mobile"></Search>
          </div>
          <Image
            className={styles.connectionsImgMobile}
            src={connectionsImg}
            alt=""
          />
        </div>
        <div className={styles.botMobile}>
          <CardTypeConnect device="mobile" type="Internet+TV"></CardTypeConnect>
          <CardTypeConnect device="mobile" type="Internet"></CardTypeConnect>
          <CardTypeConnect device="mobile" type="TV"></CardTypeConnect>
          <CardTypeConnect
            device="mobile"
            type="Internet+Connection+TV"
          ></CardTypeConnect>
        </div>
      </div>
    );
  }
};

export default Main;
