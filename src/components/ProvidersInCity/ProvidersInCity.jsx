import { useEffect, useState } from "react";
import styles from "./ProvidersInCity.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";

const ProvidersInCity = ({ providers, nameLocationWhere }) => {
  const [windowWidth, setWindowWidth] = useState(null);
  const router = useRouter();
  const { city } = router.query;
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
            <Link
              key={provider.id}
              href={`${city}/tariffs?providers=${provider.id}`}
            >
              <Image
                className={styles.providersImg}
                src={`/imgs/providersWhite/${provider.img}`}
                width={105}
                height={105}
                alt={provider.name}
              />
            </Link>
          ))}
        </div>
      </div>
    );
  } else if (windowWidth <= 1280 && windowWidth >= 440) {
    return (
      <div className={styles.tabletMain}>
        <h2>Провайдеры доступные в {nameLocationWhere}</h2>
        <div className={styles.providersTablet}>
          {providers.map((provider) => (
            <Link
              key={provider.id}
              href={`${city}/tariffs?providers=${provider.id}`}
            >
              <Image
                className={styles.providersImg}
                src={`/imgs/providersWhite/${provider.img}`}
                width={90}
                height={90}
                alt={provider.name}
              />
            </Link>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.mobileMain}>
        <h2>Провайдеры доступные в {nameLocationWhere}</h2>
        <div className={styles.providersMobile}>
          {providers.map((provider) => (
            <Link
              key={provider.id}
              href={`${city}/tariffs?providers=${provider.id}`}
            >
              <Image
                className={styles.providersImg}
                src={`/imgs/providersWhite/${provider.img}`}
                width={70}
                height={70}
                alt={provider.name}
              />
            </Link>
          ))}
        </div>
      </div>
    );
  }
};

export default ProvidersInCity;
