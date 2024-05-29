import Checkbox from "./Checkbox/Checkbox";
import RangeSlider from "./RangeSlider/RangeSlider";
import styles from "./Filter.module.css";
import arrowIcon from "./imgs/iconArrow.png";
import { useState } from "react";

const Filter = (infoFilter) => {
  return (
    <div className={styles.mainContainer}>
      <h2>Тарифы</h2>
      <div className={styles.main}>
        <div className={styles.top}>
          <h4>Фильтр</h4>
          <img src={arrowIcon} alt="" />
        </div>
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
      </div>
    </div>
  );
};

export default Filter;
