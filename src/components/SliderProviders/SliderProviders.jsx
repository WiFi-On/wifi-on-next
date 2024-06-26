import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardProvider from "./CardProvider/CardProvider";
import styles from "./SliderProviders.module.css";

const SliderProviders = ({ providers = [] }) => {
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
            img={`/imgs/providersColor/${provider.img}`}
          />
        ))}
      </div>
    </div>
  );
};

export default SliderProviders;
