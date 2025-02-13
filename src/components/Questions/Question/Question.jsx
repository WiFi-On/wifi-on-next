import styles from "./Question.module.css";
import iconPlus from "./imgs/iconPlus.svg";
import iconMinus from "./imgs/iconMinus.svg";
import { useState, useRef } from "react";
import cn from "classnames";
import Image from "next/image";

const Question = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const answerRef = useRef(null);

  const toggleAnswer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={cn(styles.main, { [styles.activeBackground]: isOpen })}
      onClick={toggleAnswer}
    >
      <div
        className={cn(styles.question, {
          [styles.activeColor]: isOpen,
        })}
      >
        <p>{question}</p>
        <Image src={isOpen ? iconMinus : iconPlus} alt="Закрыть или открыть" />
      </div>
      <div
        className={cn(styles.answerWrapper, { [styles.open]: isOpen })}
        ref={answerRef}
        style={{
          maxHeight: isOpen ? answerRef.current.scrollHeight : 0,
        }}
      >
        <p className={styles.answer}>{answer}</p>
      </div>
    </div>
  );
};

export default Question;
