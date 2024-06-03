import { useEffect, useState } from "react";
import styles from "./ProvidersInCity.module.css";
import Image from "next/image";

const ProvidersInCity = ({ providers, nameLocationWhere }) => {
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
        <h2>Провайдеры доступные в {nameLocationWhere}</h2>
        <div className={styles.providers}>
          {providers.map((provider) => (
            <Image
              className={styles.providersImg}
              key={provider.id}
              src={`/imgs/providersWhite/${provider.img}`}
              width={180}
              height={180}
              alt={provider.name}
            />
          ))}
        </div>
      </div>
    );
  } else if (windowWidth <= 1280 && windowWidth >= 440) {
    return (
      <div className={styles.tabletMain}>
        <h2>Провайдеры доступные в Тюмени</h2>
        <div className={styles.providersTablet}></div>
      </div>
    );
  } else {
    return (
      <div className={styles.mobileMain}>
        <h2>Провайдеры доступные в Тюмени</h2>
        <div className={styles.providersMobile}></div>
      </div>
    );
  }
};

export default ProvidersInCity;
