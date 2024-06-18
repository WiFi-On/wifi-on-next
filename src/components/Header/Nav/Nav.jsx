import styles from "./Nav.module.css";
import React, { useState } from "react";
import Link from "next/link";
import cn from "classnames";
import { Link as ScrollLink } from "react-scroll";

const Nav = (props) => {
  const { mobile } = props;
  const [currentPage, setCurrentPage] = useState("");

  return (
    <div
      className={cn(styles.main, { [styles.mobileMain]: mobile === "true" })}
    >
      <ScrollLink
        to="aboutUs"
        smooth={true}
        duration={700}
        offset={-200}
        className={cn(styles.navElement, {
          [styles.active]: currentPage === "aboutUs",
          [styles.colorMobile]: mobile,
          [styles.colorDesk]: !mobile,
        })}
      >
        О нас
      </ScrollLink>
      <Link
        href="/tariffs"
        className={cn(styles.navElement, {
          [styles.active]: currentPage === "tariffs",
          [styles.colorMobile]: mobile,
          [styles.colorDesk]: !mobile,
        })}
      >
        Тарифы
      </Link>
      <ScrollLink
        to="help"
        smooth={true}
        duration={700}
        offset={-200}
        className={cn(styles.navElement, {
          [styles.active]: currentPage === "help",
          [styles.colorMobile]: mobile,
          [styles.colorDesk]: !mobile,
        })}
      >
        Помощь
      </ScrollLink>
      <ScrollLink
        smooth={true}
        duration={700}
        to="faq"
        offset={-200}
        className={cn(styles.navElement, {
          [styles.active]: currentPage === "faq",
          [styles.colorMobile]: mobile,
          [styles.colorDesk]: !mobile,
        })}
      >
        Ответы на вопросы
      </ScrollLink>
      <Link
        href="/contacts"
        className={cn(styles.navElement, {
          [styles.active]: currentPage === "contacts",
          [styles.colorMobile]: mobile,
          [styles.colorDesk]: !mobile,
        })}
      >
        Контакты
      </Link>
    </div>
  );
};

export default Nav;
