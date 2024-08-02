import { useEffect, useState } from "react";
import styles from "./ProvidersInCity.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";

const ProvidersInCity = ({ providers, nameLocationWhere }) => {
  const [windowWidth, setWindowWidth] = useState(null);
  const router = useRouter();
  const { city } = router.query;
  const imgProviders = {
    1: "/imgs/providersWhite/ruscom.svg",
    2: "/imgs/providersWhite/mts.svg",
    3: "/imgs/providersWhite/megafon.svg",
    4: "/imgs/providersWhite/ttk.svg",
    5: "/imgs/providersWhite/almatel.svg",
    6: "/imgs/providersWhite/avatell.svg",
    7: "/imgs/providersWhite/beeline.svg",
    8: "/imgs/providersWhite/domru.svg",
  };

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
                src={imgProviders[provider.id]}
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
                src={imgProviders[provider.id]}
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
                src={imgProviders[provider.id]}
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
