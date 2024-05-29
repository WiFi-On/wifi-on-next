import React, { useState } from "react";
import styles from "./RangeSlider.module.css";

const RangeSlider = ({ name }) => {
  const [minPrice, setMinPrice] = useState(100);
  const [maxPrice, setMaxPrice] = useState(900);

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), maxPrice - 1);
    setMinPrice(value);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), minPrice + 1);
    setMaxPrice(value);
  };

  return (
    <div className={styles.rangeSliderContainer}>
      <div className={styles.nameSlider}>
        <span className={styles.name}>{name}</span>
        <span className={styles.dashName}></span>
      </div>
      <div className={styles.priceDisplay}>
        <span className={styles.priceMin}>от {minPrice}</span>
        <span className={styles.dash}></span>
        <span className={styles.priceMax}>до {maxPrice}</span>
      </div>
      <div className={styles.rangeSlider}>
        <input
          type="range"
          min="0"
          max="1000"
          value={minPrice}
          onChange={handleMinChange}
          className={styles.rangeInput}
        />
        <input
          type="range"
          min="0"
          max="1000"
          value={maxPrice}
          onChange={handleMaxChange}
          className={styles.rangeInput}
        />
        <div className={styles.sliderTrack}></div>
      </div>
    </div>
  );
};

export default RangeSlider;
