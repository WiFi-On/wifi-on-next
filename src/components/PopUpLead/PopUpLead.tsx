import styles from "./PopUpLead.module.css";
import Input from "../Input/Input";

import Image from "next/image";
import close from "./Button.png";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  closeModal,
  openModal,
  selectIsOpen,
} from "../../redux/reducers/modalSlice";

const PopUpLead = () => {
  const isOpen = useSelector(selectIsOpen);
  const dispatch = useDispatch();

  const closeModalHandler = () => {
    dispatch(closeModal());
    document.body.style.overflow = "auto";
  };

  useEffect(() => {
    console.log(isOpen);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
  }, [isOpen]);

  if (isOpen) {
    // console.log("открыто");
    return (
      <div className={styles.container} onClick={closeModalHandler}>
        <div className={styles.main} onClick={(e) => e.stopPropagation()}>
          <Image
            className={styles.close}
            src={close}
            onClick={closeModalHandler}
            alt=""
          ></Image>
          <div className={styles.wrapper}>
            <h2>Заявка на подключение</h2>
            <div className={styles.inputs}>
              <Input placeholder="Название тарифа" typeInput="text"></Input>
              <Input placeholder="Ваше имя" typeInput="text"></Input>
              <Input placeholder="Ваш телефон" typeInput="phone"></Input>
              <Input placeholder="Адрес подключения" typeInput="email"></Input>
            </div>
            <div className={styles.agreement}>
              <input type="checkbox" name="" id="" />
              <p>
                Я согласен с{" "}
                <span>Политикой обработки персональных данных</span>
              </p>
            </div>
            <div className={styles.buttonAndText}>
              <button>Отправить</button>
              <p>
                Отправляя заявку, вы соглашаетесь с Политикой обработки
                персональных данных
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    // console.log("закрыто");
    return null;
  }
};

export default PopUpLead;
