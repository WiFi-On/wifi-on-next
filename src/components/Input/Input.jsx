import styles from "./Input.module.css";
import { useState } from "react";
import cn from "classnames";

const Input = ({ placeholder, typeInput }) => {
  if (typeInput === "phone") {
    const [phone, setPhone] = useState("");
    const [error, setError] = useState(false);

    const handleChange = (event) => {
      const newValue = event.target.value;
      setPhone(newValue);

      const phoneRegex = /^((\+7|7|8)+([0-9]){10})$/;
      if (!phoneRegex.test(newValue)) {
        setError(false);
      } else {
        setError(true);
      }
    };

    return (
      <input
        placeholder={placeholder}
        className={cn(styles.main, {
          [styles.mainActive]: phone,
        })}
        type="text"
        value={phone}
        onChange={handleChange}
        required
      ></input>
    );
  } else if (typeInput === "email") {
    const [email, setEmail] = useState("");
    const [error, setError] = useState(false);

    const handleChange = (event) => {
      const newValue = event.target.value;
      setEmail(newValue);

      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(newValue)) {
        setError(false);
      } else {
        setError(true);
      }
    };

    return (
      <input
        placeholder={placeholder}
        className={cn(styles.mainEmail, styles.mainEmail)}
        type="text"
        value={email}
        onChange={handleChange}
        required
      ></input>
    );
  } else if (typeInput === "password") {
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const handleChange = (event) => {
      const newValue = event.target.value;
      setPassword(newValue);

      const passwordPattern =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordPattern.test(newValue)) {
        setError(false);
      } else {
        setError(true);
      }
    };

    return (
      <input
        placeholder={placeholder}
        className={cn(styles.main, {
          [styles.mainActive]: password,
        })}
        value={password}
        onChange={handleChange}
        type="password"
        required
      ></input>
    );
  } else {
    const [value, setValue] = useState("");
    const [error, setError] = useState(false);

    const handleChange = (event) => {
      const newValue = event.target.value;
      setValue(newValue);

      if (!newValue) {
        setError(false);
      } else {
        setError(true);
      }
    };

    return (
      <input
        placeholder={placeholder}
        className={cn(styles.main, {
          [styles.mainActive]: value,
        })}
        value={value}
        onChange={handleChange}
        type="text"
        required
      ></input>
    );
  }
};
export default Input;
