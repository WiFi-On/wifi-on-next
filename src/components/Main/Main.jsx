import styles from "./Main.module.css";
import CardTypeConnect from "./CardTypeConnect/CardTypeConnect";
import connectionsImg from "./connection.svg";
import Search from "./Search/Search";
import { useState, useEffect } from "react";
import Image from "next/image";

const Main = () => {
  const [htmlWidth, setHtmlWidth] = useState(null);

  useEffect(() => {
    const handleResize = (entries) => {
      for (let entry of entries) {
        setHtmlWidth(entry.contentRect.width);
      }
    };

    const observer = new ResizeObserver(handleResize);
    observer.observe(document.documentElement); // Наблюдение за элементом <html>

    return () => {
      observer.disconnect();
    };
  }, []);

  if (htmlWidth > 1280) {
    return (
      <div className={styles.main}>
        <div className={styles.top}>
          <div className={styles.textAndSearch}>
            <div className={styles.text}>
              <h1>Найди своего идеального провайдера здесь</h1>
              <p>Подключи интернет / телевидение / связь</p>
            </div>
            <Search></Search>
          </div>
          <Image
            className={styles.connectionsImg}
            src={connectionsImg}
            alt="Подключи интернет / телевидение / связь"
            fetchPriority="high"
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
  } else if (htmlWidth <= 1280 && htmlWidth >= 440) {
    return (
      <div className={styles.mainTablet}>
        <div className={styles.topTablet}>
          <div className={styles.textAndSearchTablet}>
            <div className={styles.textTablet}>
              <h1>Найди своего идеального провайдера здесь</h1>
              <p>Подключи интернет / телевидение / связь</p>
            </div>
            <Search device="tablet"></Search>
          </div>
          <Image
            className={styles.connectionsImgTablet}
            src={connectionsImg}
            alt="Подключи интернет / телевидение / связь"
            fetchPriority="high"
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
              <p>Подключи интернет / телевидение / связь</p>
            </div>
            <Search device="mobile"></Search>
          </div>
          <Image
            className={styles.connectionsImgMobile}
            src={connectionsImg}
            alt="Подключи интернет / телевидение / связь"
            fetchPriority="high"
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
