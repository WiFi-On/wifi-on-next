import React, { useState } from "react";
import Checkbox from "./Checkbox/Checkbox";
import RangeSlider from "./RangeSlider/RangeSlider";
import styles from "./Filter.module.css";
import arrowIcon from "./imgs/iconArrow.png";
import { CSSTransition } from "react-transition-group";
import Image from "next/image";
import { useRouter } from "next/router";

const Filter = ({
  providersProp,
  minPriceProp,
  maxPriceProp,
  minSpeedProp,
  maxSpeedProp,
}) => {
  const [isBotVisible, setIsBotVisible] = useState(false);
  const router = useRouter();
  const {
    providers,
    connectType,
    discount,
    freeConnection,
    priceRange,
    speedRange,
  } = router.query;

  console.log(providersProp);

  const onChangeConnectType = (idConnectType) => {
    const currentQuery = { ...router.query };
    let newConnectType;

    if (connectType?.includes(String(idConnectType))) {
      newConnectType = currentQuery.connectType
        ? currentQuery.connectType
            .split(",")
            .filter((cid) => cid !== String(idConnectType))
        : [];
    } else {
      newConnectType = currentQuery.connectType
        ? [...currentQuery.connectType.split(","), String(idConnectType)]
        : [String(idConnectType)];
    }

    if (newConnectType.length > 0) {
      currentQuery.connectType = newConnectType.join(",");
    } else {
      delete currentQuery.connectType;
    }

    router.push({
      pathname: router.pathname,
      query: currentQuery,
    });
  };

  const onChangeProviders = (idProvider) => {
    const currentQuery = { ...router.query };
    let newProviders;

    if (currentQuery.providers?.includes(String(idProvider))) {
      newProviders = currentQuery.providers
        ? currentQuery.providers
            .split(",")
            .filter((pid) => pid !== String(idProvider))
        : [];
    } else {
      newProviders = currentQuery.providers
        ? [...currentQuery.providers.split(","), String(idProvider)]
        : [String(idProvider)];
    }

    if (newProviders.length > 0) {
      currentQuery.providers = newProviders.join(",");
    } else {
      delete currentQuery.providers;
    }

    router.push({
      pathname: router.pathname,
      query: currentQuery,
    });
  };

  const onChangeDiscount = () => {
    const currentQuery = { ...router.query };

    if (discount) {
      delete currentQuery.discount;
    } else {
      currentQuery.discount = "1";
    }

    router.push({
      pathname: router.pathname,
      query: currentQuery,
    });
  };

  const onChangeFreeConnection = () => {
    const currentQuery = { ...router.query };

    if (freeConnection) {
      delete currentQuery.freeConnection;
    } else {
      currentQuery.freeConnection = "1";
    }

    router.push({
      pathname: router.pathname,
      query: currentQuery,
    });
  };

  const handlePriceChange = (min, max) => {
    const currentQuery = { ...router.query };
    currentQuery.priceRange = `${min}-${max}`;

    router.push({
      pathname: router.pathname,
      query: currentQuery,
    });
  };

  const handleSpeedChange = (min, max) => {
    const currentQuery = { ...router.query };
    currentQuery.speedRange = `${min}-${max}`;

    router.push({
      pathname: router.pathname,
      query: currentQuery,
    });
  };

  const toggleBotVisibility = () => {
    setIsBotVisible(!isBotVisible);
  };

  return (
    <div className={styles.mainContainer}>
      <h2>Тарифы</h2>
      <div className={styles.main}>
        <div
          className={styles.top}
          onClick={toggleBotVisibility}
          style={{ cursor: "pointer" }}
        >
          <h4>Фильтр</h4>
          <Image
            src={arrowIcon}
            alt=""
            className={isBotVisible ? styles.arrowDown : styles.arrowUp}
          />
        </div>
        <CSSTransition
          in={isBotVisible}
          timeout={300}
          classNames={{
            enter: styles["bot-enter"],
            enterActive: styles["bot-enter-active"],
            exit: styles["bot-exit"],
            exitActive: styles["bot-exit-active"],
          }}
          unmountOnExit
        >
          <div className={styles.bot}>
            <div className={styles.rangeSliders}>
              <div className={styles.wrapperRangeSliderContainer}>
                <div className={styles.wrapperRangeSlider}>
                  <RangeSlider
                    min={minPriceProp}
                    max={maxPriceProp}
                    name="Абонентская плата, ₽"
                    onChange={handlePriceChange}
                  />
                </div>
                <div className={styles.wrapperRangeSlider}>
                  <RangeSlider
                    min={minSpeedProp}
                    max={maxSpeedProp}
                    name="Скорость интернета, Мбит/с"
                    onChange={handleSpeedChange}
                  />
                </div>
              </div>
              <div className={styles.extras}>
                <Checkbox
                  label="Акции"
                  checked={!!discount}
                  onChange={onChangeDiscount}
                />
                <Checkbox
                  checked={!!freeConnection}
                  onChange={onChangeFreeConnection}
                  label="Бесплатное подключение"
                ></Checkbox>
              </div>
            </div>
            <div className={styles.checkboxes}>
              <div className={styles.checkboxesContainer}>
                <div className={styles.nameCheckboxes}>
                  <span>Провайдер</span>
                </div>
                {providersProp.map((provider) => (
                  <Checkbox
                    checked={providers?.includes(provider.id)}
                    key={provider.id}
                    label={provider.name}
                    onChange={() => onChangeProviders(provider.id)}
                  ></Checkbox>
                ))}
              </div>
              <div className={styles.checkboxesContainer}>
                <div className={styles.nameCheckboxes}>
                  <span>Тип тарифа</span>
                </div>
                <Checkbox
                  checked={connectType?.includes("1") || false}
                  onChange={() => onChangeConnectType(1)}
                  label="Домашний интернет"
                />
                <Checkbox
                  checked={connectType?.includes("2") || false}
                  onChange={() => onChangeConnectType(2)}
                  label="Телевидение"
                />
                <Checkbox
                  checked={connectType?.includes("3") || false}
                  onChange={() => onChangeConnectType(3)}
                  label="Мобильная связь"
                />
              </div>
            </div>
          </div>
        </CSSTransition>
      </div>
    </div>
  );
};

export default Filter;
