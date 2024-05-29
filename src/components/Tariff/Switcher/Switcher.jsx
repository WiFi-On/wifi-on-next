import React, { useState } from "react";
import styles from "./Switcher.module.css";

const Switcher = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  return (
    <label className={styles.switch}>
      <input type="checkbox" checked={isChecked} onChange={handleToggle} />
      <span className={styles.slider}></span>
    </label>
  );
};

export default Switcher;
