import React, { useState, useEffect } from "react";
import styles from "./Advantage.module.css";
import AnimationSetting from "../animations/animationSetting"; // Убедитесь, что вы импортируете правильно

const Advantage = ({ title, text, jsonLottie, children }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    let timer;
    if (isHovered) {
      timer = setTimeout(() => setShowAnimation(true), 300);
    } else {
      setShowAnimation(false); // Скрываем анимацию, если курсор ушёл
      clearTimeout(timer);
    }
    return () => clearTimeout(timer);
  }, [isHovered]);

  return (
    <div
      className={styles.main}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.text}>
        <h5>{title}</h5>
        <p>{text}</p>
      </div>
      {showAnimation ? (
        <AnimationSetting animation={jsonLottie} /> // Показываем Lottie через 0.6 секунд
      ) : (
        children // Показываем SVG
      )}
    </div>
  );
};

export default Advantage;
