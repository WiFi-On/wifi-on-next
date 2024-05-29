// src/Checkbox.js
import React, { useState } from "react";
import styles from "./Checkbox.module.css";

const Checkbox = ({ label }) => {
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
    setChecked(!checked);
  };

  return (
    <label className={styles.customCheckbox}>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleCheckboxChange}
      />
      <span className={styles.checkmark}></span>
      {label}
    </label>
  );
};

export default Checkbox;
