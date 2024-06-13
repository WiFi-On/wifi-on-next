import styles from "./PopUpPolicy.module.css";
import close from "./Button.png";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsOpenPopUpPolicy,
  closePopUpPolicy,
} from "../../redux/reducers/modalSlice";

const PopUpPolicy = () => {
  const isOpen = useSelector(selectIsOpenPopUpPolicy);
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
        onClick={() => dispatch(closePopUpPolicy())}
        src={close}
        alt=""
      ></Image>
      <div className={styles.main}>
        <h2>Политика конфиденциальности</h2>
      </div>
    </div>
  );
};

export default PopUpPolicy;
