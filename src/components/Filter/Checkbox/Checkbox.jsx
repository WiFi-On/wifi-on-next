import React, { useState, useEffect } from "react";
import styles from "./Checkbox.module.css";

const Checkbox = ({ label, checked = false, onChange }) => {
  const [checkedState, setCheckedState] = useState(checked);

  useEffect(() => {
    setCheckedState(checked);
  }, [checked]);

  const handleChange = (e) => {
    setCheckedState(e.target.checked);
    onChange(e);
  };

  return (
    <label className={styles.customCheckbox}>
      <input onChange={handleChange} type="checkbox" checked={checkedState} />
      <span className={styles.checkmark}></span>
      {label}
    </label>
  );
};

export default Checkbox;
