import styles from "./Input.module.css";
import { useState } from "react";
import cn from "classnames";

const Input = ({ placeholder, typeInput }) => {
  const [inputData, setInputData] = useState("");
  const [error, setError] = useState(false);
  if (typeInput === "phone") {
    const handleChange = (event) => {
      const newValue = event.target.value;
      setInputData(newValue);

      // const phoneRegex = /^((\+7|7|8)+([0-9]){10})$/;
      // if (phoneRegex.test(newValue)) {
      //   setError(false);
      // } else {
      //   setError(true);
      // }
    };

    return (
      <>
        <input
          placeholder={placeholder}
          className={cn(styles.main, {
            [styles.mainActive]: inputData,
          })}
          type="text"
          value={inputData}
          onChange={handleChange}
          required
        ></input>
        {error && <p className={styles.error}>Некорректный номер</p>}
      </>
    );
  } else if (typeInput === "email") {
    const handleChange = (event) => {
      const newValue = event.target.value;
      setInputData(newValue);

      // const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      // if (!emailRegex.test(newValue)) {
      //   setError(false);
      // } else {
      //   setError(true);
      // }
    };

    return (
      <>
        <input
          placeholder={placeholder}
          className={cn(styles.mainEmail, styles.mainEmail)}
          type="text"
          value={inputData}
          onChange={handleChange}
          required
        ></input>
        {error && <p className={styles.error}>Некорректный email</p>}
      </>
    );
  } else if (typeInput === "password") {
    const handleChange = (event) => {
      const newValue = event.target.value;
      setInputData(newValue);

      // const passwordPattern =
      //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      // if (!passwordPattern.test(newValue)) {
      //   setError(false);
      // } else {
      //   setError(true);
      // }
    };

    return (
      <>
        <input
          placeholder={placeholder}
          className={cn(styles.main, {
            [styles.mainActive]: inputData,
          })}
          value={inputData}
          onChange={handleChange}
          type="password"
          required
        ></input>
        {error && <p className={styles.error}>Некорректный пароль</p>}
      </>
    );
  } else {
    const handleChange = (event) => {
      const newValue = event.target.value;
      setInputData(newValue);

      // if (newValue) {
      //   setError(false);
      // } else {
      //   setError(true);
      // }
    };

    return (
      <>
        <input
          placeholder={placeholder}
          className={cn(styles.main, {
            [styles.mainActive]: inputData,
          })}
          value={inputData}
          onChange={handleChange}
          type="text"
          required
        ></input>
        {error && <p className={styles.error}>Заполните поле</p>}
      </>
    );
  }
};
export default Input;
