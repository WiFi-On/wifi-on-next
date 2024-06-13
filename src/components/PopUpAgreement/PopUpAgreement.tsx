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
    console.log(isOpen);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.container}>
      <Image
        onClick={() => {
          dispatch(closePopUpAgreement());
        }}
        src={close}
        alt=""
      ></Image>
      <div className={styles.main}>
        <h2>Пользовательское соглашение</h2>
      </div>
    </div>
  );
};

export default PopUpAgreement;
