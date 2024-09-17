import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardProvider from "./CardProvider/CardProvider";
import styles from "./SliderProviders.module.css";

const SliderProviders = ({ providers = [] }) => {
  const imgProviders = {
    1: "/imgs/providersColor/ruscom.svg",
    2: "/imgs/providersColor/mts.svg",
    3: "/imgs/providersColor/megafon.svg",
    4: "/imgs/providersColor/ttk.svg",
    5: "/imgs/providersColor/almatel.svg",
    6: "/imgs/providersColor/avatell.svg",
    7: "/imgs/providersColor/beeline.svg",
    8: "/imgs/providersColor/domru.svg",
    9: "/imgs/providersColor/sibseti.svg",
  };

  if (providers.length < 1)
    return (
      <div className={styles.main}>
        <h2>Доступные провайдеры</h2>
        <div className={styles.wrapperCards}>
          <div className={styles.loadingBlock}></div>
          <div className={styles.loadingBlock}></div>
          <div className={styles.loadingBlock}></div>
          <div className={styles.loadingBlock}></div>
        </div>
      </div>
    );
  return (
    <div className={styles.main}>
      <h2>Доступные провайдеры</h2>
      <div className={styles.wrapperCards}>
        {providers.map((provider) => (
          <CardProvider
            key={provider.id}
            id={provider.id}
            img={imgProviders[provider.id]}
          />
        ))}
      </div>
    </div>
  );
};

export default SliderProviders;
