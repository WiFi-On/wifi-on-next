import React, { useState } from "react";
import styles from "./RangeSlider.module.css";

const RangeSlider = ({ name, min, max, onChange }) => {
  const [minValue, setMinValue] = useState(min);
  const [maxValue, setMaxValue] = useState(max);

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), maxValue - 1);
    setMinValue(value);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), minValue + 1);
    setMaxValue(value);
  };

  const handleMouseUp = () => {
    onChange(minValue, maxValue);
  };

  return (
    <div className={styles.rangeSliderContainer}>
      <div className={styles.nameSlider}>
        <span className={styles.name}>{name}</span>
        <span className={styles.dashName}></span>
      </div>
      <div className={styles.priceDisplay}>
        <span className={styles.priceMin}>от {minValue}</span>
        <span className={styles.dash}></span>
        <span className={styles.priceMax}>до {maxValue}</span>
      </div>
      <div className={styles.rangeSlider}>
        <input
          type="range"
          min={min}
          max={max}
          value={minValue}
          onChange={handleMinChange}
          onMouseUp={handleMouseUp}
          className={styles.rangeInput}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={maxValue}
          onChange={handleMaxChange}
          onMouseUp={handleMouseUp}
          className={styles.rangeInput}
        />
        <div className={styles.sliderTrack}></div>
      </div>
    </div>
  );
};

export default RangeSlider;
