import styles from "./Input.module.css";
import { useState } from "react";
import cn from "classnames";

const Input = ({ placeholder, typeInput, value, onChange, setIsValid }) => {
  const [error, setError] = useState(false);
  if (typeInput === "phone") {
    const handleBlur = (e) => {
      const newValue = e.target.value;
      const phoneRegex = /^((\+7|7|8)+([0-9]){10})$/;
      if (phoneRegex.test(newValue)) {
        setError(false);
        setIsValid(true);
      } else {
        setError(true);
        setIsValid(false);
      }
    };

    return (
      <>
        <input
          placeholder={placeholder}
          className={cn(styles.main, {
            [styles.mainActive]: value,
            [styles.error]: error,
          })}
          type="text"
          value={value}
          onChange={onChange}
          onBlur={handleBlur}
          required
        ></input>
      </>
    );
  } else if (typeInput === "email") {
    const handleBlur = (event) => {
      const newValue = event.target.value;

      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (emailRegex.test(newValue)) {
        setError(false);
        setIsValid(true);
      } else {
        setError(true);
        setIsValid(false);
      }
    };

    return (
      <>
        <input
          placeholder={placeholder}
          className={cn(styles.main, {
            [styles.mainActive]: value,
            [styles.error]: error,
          })}
          type="text"
          value={value}
          onChange={onChange}
          onBlur={handleBlur}
          required
        ></input>
      </>
    );
  } else if (typeInput === "password") {
    const handleBlur = (event) => {
      const newValue = event.target.value;
      const passwordPattern =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordPattern.test(newValue)) {
        setError(false);
      } else {
        setError(true);
      }
    };

    return (
      <>
        <input
          placeholder={placeholder}
          className={cn(styles.main, {
            [styles.mainActive]: value,
            [styles.error]: error,
          })}
          value={value}
          onChange={onChange}
          onBlur={handleBlur}
          type="password"
          required
        ></input>
      </>
    );
  } else {
    const handleChange = (event) => {
      const newValue = event.target.value;
      setInputData(newValue);

      if (newValue) {
        setError(false);
      } else {
        setError(true);
      }
    };

    return (
      <>
        <input
          placeholder={placeholder}
          className={cn(styles.main, {
            [styles.mainActive]: value,
          })}
          value={value}
          onChange={onChange}
          type="text"
        ></input>
      </>
    );
  }
};
export default Input;
