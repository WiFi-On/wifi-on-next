import React, { useState } from "react";
import Checkbox from "./Checkbox/Checkbox";
import RangeSlider from "./RangeSlider/RangeSlider";
import styles from "./Filter.module.css";
import arrowIcon from "./imgs/iconArrow.png";
import { CSSTransition } from "react-transition-group";
import Image from "next/image";

const Filter = (infoFilter) => {
  const [isBotVisible, setIsBotVisible] = useState(false);

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
                  <RangeSlider name="Абонентская плата, ₽" />
                </div>
                <div className={styles.wrapperRangeSlider}>
                  <RangeSlider name="Скорость интернета, Мбит/с" />
                </div>
              </div>
              <div className={styles.extras}>
                <Checkbox label="Акции"></Checkbox>
                <Checkbox label="Бесплатное подключение"></Checkbox>
              </div>
            </div>
            <div className={styles.checkboxes}>
              <div className={styles.checkboxesContainer}>
                <div className={styles.nameCheckboxes}>
                  <span>Провайдер</span>
                  <p></p>
                </div>
                <Checkbox label="Дом.ру" />
                <Checkbox label="Ростелеком" />
                <Checkbox label="Билайн" />
                <Checkbox label="МТС" />
                <Checkbox label="ТТК" />
              </div>
              <div className={styles.checkboxesContainer}>
                <div className={styles.nameCheckboxes}>
                  <span>Тип тарифа</span>
                  <p></p>
                </div>
                <Checkbox label="Интернет" />
                <Checkbox label="ТВ" />
                <Checkbox label="Мобильный" />
                <Checkbox label="Онлайн-кинотеатры" />
              </div>
            </div>
          </div>
        </CSSTransition>
      </div>
    </div>
  );
};

export default Filter;
