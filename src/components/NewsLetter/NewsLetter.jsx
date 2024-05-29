import styles from "./NewsLetter.module.css";
import cn from "classnames";
import Input from "../Input/Input";
import saleIcon from "./imgs/saleIcon.png";
import wifiIcon from "./imgs/wifiIcon.png";

const Newsletter = () => {
  return (
    <div className={styles.main}>
      <div className={styles.containerText}>
        <h2>Подпишись</h2>
        <p>Чтобы быть в курсе всех специальных предложений</p>
      </div>
      <div className={styles.inputAndText}>
        <div className={styles.inputAndButton}>
          <Input placeholder="Введите email" typeInput="email"></Input>
          <button>Подписаться</button>
        </div>
        <p>
          Нажимая на кнопку «Подписаться», я соглашаюсь с условиями обработки
          персональных данных
        </p>
      </div>
      <img className={styles.saleIcon} src={saleIcon} alt="" />
      <img className={styles.wifiIcon} src={wifiIcon} alt="" />
    </div>
  );
};

export default Newsletter;
