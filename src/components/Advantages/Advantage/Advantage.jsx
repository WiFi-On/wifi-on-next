import { Children } from "react";
import styles from "./Advantage.module.css";

const Advantage = ({ children, title, text }) => {
  return (
    <div className={styles.main}>
      <div className={styles.text}>
        <h5>{title}</h5>
        <p>{text}</p>
      </div>
      {children}
    </div>
  );
};

export default Advantage;
