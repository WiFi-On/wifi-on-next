import styles from "./PopUpAgreement.module.css";
import close from "./Button.png";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsOpenPopUpAgreement,
  closePopUpAgreement,
} from "../../redux/reducers/modalSlice";

const PopUpAgreement = () => {
  const isOpen = useSelector(selectIsOpenPopUpAgreement);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.container}>
      <div className={styles.wrapperMain}>
        <Image
          onClick={() => {
            dispatch(closePopUpAgreement());
          }}
          src={close}
          alt="Закрыть"
        ></Image>
        <div className={styles.main}>
          <h1>Пользовательское соглашение</h1>
          <h2>1. Общие положения</h2>
          <p>
            1.1. Настоящее Пользовательское соглашение (далее - Соглашение)
            регулирует отношения между ИП Кривошеиным Ярославом Петровичем,
            ОГРНИП: 321723200036962, ИНН: 451501513311 (далее - Администратор) и
            пользователями сайта on-wifi.ru (далее - Сайт).
          </p>
          <p>
            1.2. Пользовательское соглашение является публичной офертой.
            Пользователь, регистрируясь на Сайте или используя его ресурсы,
            выражает полное и безоговорочное согласие с условиями Соглашения.
          </p>
          <h2>2. Условия использования Сайта</h2>
          <p>
            2.1. Пользователь обязуется использовать Сайт в соответствии с
            действующим законодательством РФ и настоящим Соглашением.
          </p>
          <p>2.2. Запрещено использовать Сайт для:</p>
          <ul>
            <li>
              Распространения незаконного, вредоносного, клеветнического,
              оскорбительного, порнографического или иного противоправного
              контента;
            </li>
            <li>Нарушения прав интеллектуальной собственности;</li>
            <li>Вмешательства в нормальную работу Сайта;</li>
            <li>
              Сбора и хранения персональных данных других пользователей без их
              согласия.
            </li>
          </ul>
          <h2>3. Обязанности и права Администратора</h2>
          <p>
            3.1. Администратор обязуется обеспечивать функционирование Сайта и
            его доступность для пользователей.
          </p>
          <p>3.2. Администратор имеет право:</p>
          <ul>
            <li>
              Изменять содержание Сайта и условия предоставления услуг в любое
              время без предварительного уведомления пользователей;
            </li>
            <li>
              Блокировать доступ пользователей к Сайту в случае нарушения ими
              условий Соглашения или требований законодательства РФ;
            </li>
            <li>
              Использовать информацию, размещенную пользователями на Сайте, в
              соответствии с Политикой конфиденциальности.
            </li>
          </ul>
          <h2>4. Ответственность сторон</h2>
          <p>
            4.1. Пользователь несет ответственность за достоверность и
            законность размещаемой на Сайте информации.
          </p>
          <p>
            4.2. Администратор не несет ответственности за любой ущерб,
            возникший в результате использования или невозможности использования
            Сайта.
          </p>
          <h2>5. Заключительные положения</h2>
          <p>
            5.1. Настоящее Соглашение регулируется законодательством Российской
            Федерации.
          </p>
          <p>
            5.2. В случае возникновения споров, связанных с исполнением
            Соглашения, стороны обязуются разрешать их путем переговоров. Если
            спор не может быть разрешен путем переговоров, он подлежит
            рассмотрению в суде по месту нахождения Администратора.
          </p>
          <p>
            5.3. Администратор оставляет за собой право вносить изменения в
            настоящее Соглашение. Изменения вступают в силу с момента их
            опубликования на Сайте.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PopUpAgreement;
