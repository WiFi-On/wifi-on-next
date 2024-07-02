//ХУКИ, БИБЛИОТЕКИ, МОДУЛИ И Т.Д
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

//КОМПОНЕНТЫ
import AddressClient from "./AddressClient/AddressClient";
import Nav from "./Nav/Nav";
import ComparisonButton from "./Comparison/ComparisonButton";
import HamburgerMenu from "./HamburgerMenu/HamburgerMenu";
//СТАТИКА
import styles from "./Header.module.css";
import logo from "../../../public/imgs/iconLogo.png";
import menu from "./iconMenu.svg";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const [windowWidth, setWindowWidth] = useState<number | null>(null);
  const [statusHamburgerMenu, setStatusHamburgerMenu] =
    useState<boolean>(false);

  const openHamburgerMenu: () => void = () => {
    setStatusHamburgerMenu(true);
  };
  const closeHamburgerMenu: () => void = () => {
    setStatusHamburgerMenu(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  if (windowWidth === null) {
    return null; // Или индикатор загрузки, если хотите
  }

  if (windowWidth > 868) {
    return (
      <header className={styles.main}>
        <div className={styles.container}>
          <div className={styles.top}>
            <Link href="/">
              <Image src={logo} alt="логотип" className={styles.logo}></Image>
            </Link>
            <Nav></Nav>
            <ComparisonButton></ComparisonButton>
          </div>
          <div className={styles.bot}>
            <AddressClient mobile={false}></AddressClient>
            <h5 className={styles.number}>
              <a href="tel:+78003332450">+7 (800) 333-24-50</a>
            </h5>
          </div>
        </div>
      </header>
    );
  } else if (windowWidth <= 868 && windowWidth >= 420) {
    return (
      <header className={styles.main}>
        <div className={styles.containerTablet}>
          <Link href="/">
            <Image className={styles.logo} src={logo} alt="" />
          </Link>
          <AddressClient mobile={false}></AddressClient>
        </div>
        <Image
          onClick={openHamburgerMenu}
          className={styles.iconMenu}
          src={menu}
          alt=""
        />
        {statusHamburgerMenu && (
          <HamburgerMenu
            mobile="true"
            isOpen={statusHamburgerMenu}
            onClose={closeHamburgerMenu}
          />
        )}
      </header>
    );
  } else {
    return (
      <header className={styles.main}>
        <Link href="/">
          <Image className={styles.logo} src={logo} alt="" />
        </Link>

        <Image
          onClick={openHamburgerMenu}
          className={styles.iconMenu}
          src={menu}
          alt=""
        />
        {statusHamburgerMenu && (
          <HamburgerMenu
            mobile="true"
            isOpen={statusHamburgerMenu}
            onClose={closeHamburgerMenu}
          />
        )}
      </header>
    );
  }
};

export default Header;
