import React, { useState } from "react";
import styles from "./RangeSlider.module.css";

const RangeSlider = ({ name, min, max, onChange }) => {
  const [minValue, setMinValue] = useState(min);
  const [maxValue, setMaxValue] = useState(max);

  const handleMinChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value) && value <= maxValue - 1) {
      setMinValue(Number(value));
      onChange(Number(value), maxValue); // Notify parent of change
    }
  };

  const handleMaxChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value) && value >= minValue + 1) {
      setMaxValue(Number(value));
      onChange(minValue, Number(value)); // Notify parent of change
    }
  };

  const handleMinRangeChange = (e) => {
    const value = Number(e.target.value);
    if (value <= maxValue - 1) {
      setMinValue(value);
      onChange(value, maxValue); // Notify parent of change
    }
  };

  const handleMaxRangeChange = (e) => {
    const value = Number(e.target.value);
    if (value >= minValue + 1) {
      setMaxValue(value);
      onChange(minValue, value); // Notify parent of change
    }
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
        <div className={styles.priceMin}>
          <span>от </span>
          <input
            className={styles.minInput}
            type="text"
            value={minValue}
            onChange={handleMinChange}
          />
        </div>
        <span className={styles.dash}></span>
        <div className={styles.priceMax}>
          <span>до </span>
          <input
            className={styles.maxInput}
            type="text"
            value={maxValue}
            onChange={handleMaxChange}
          />
        </div>
      </div>
      <div className={styles.rangeSlider}>
        <input
          type="range"
          min={min}
          max={max}
          value={minValue}
          onChange={handleMinRangeChange}
          onMouseUp={handleMouseUp}
          className={styles.rangeInput}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={maxValue}
          onChange={handleMaxRangeChange}
          onMouseUp={handleMouseUp}
          className={styles.rangeInput}
        />
        <div className={styles.sliderTrack}></div>
      </div>
    </div>
  );
};

export default RangeSlider;
