import styles from "./NewsLetter.module.css";
import cn from "classnames";
import Input from "../Input/Input";
import saleIcon from "./imgs/saleIcon.svg";
import wifiIcon from "./imgs/wifiIcon.svg";
import Image from "next/image";

const Newsletter = () => {
  return (
    <div className={styles.main}>
      <div className={styles.containerText}>
        <h2>Подпишись</h2>
        <p>Чтобы быть в курсе всех специальных предложений</p>
      </div>
      <div className={styles.inputAndText}>
        <div className={styles.inputAndButton}>
          <input
            type="email"
            placeholder="Ваша почта"
            className={styles.input}
          />
          <button>Подписаться</button>
        </div>
        <p>
          Нажимая на кнопку «Подписаться», я соглашаюсь с условиями обработки
          персональных данных
        </p>
      </div>
      <Image className={styles.saleIcon} src={saleIcon} alt="Скидка" />
      <Image className={styles.wifiIcon} src={wifiIcon} alt="Интернет" />
    </div>
  );
};

export default Newsletter;
