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
import { useRouter } from "next/router";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const [htmlWidth, setHtmlWidth] = useState<number | null>(null);
  const router = useRouter();
  const { city } = router.query;
  const [statusHamburgerMenu, setStatusHamburgerMenu] =
    useState<boolean>(false);
  const openHamburgerMenu: () => void = () => {
    setStatusHamburgerMenu(true);
  };
  const closeHamburgerMenu: () => void = () => {
    setStatusHamburgerMenu(false);
  };

  useEffect(() => {
    const handleResize = (entries: ResizeObserverEntry[]) => {
      for (let entry of entries) {
        setHtmlWidth(entry.contentRect.width);
      }
    };

    const observer = new ResizeObserver(handleResize);
    observer.observe(document.documentElement); // Наблюдение за элементом <html>

    return () => {
      observer.disconnect();
    };
  }, []);

  if (htmlWidth === null) {
    return null; // Или индикатор загрузки, если хотите
  }

  if (htmlWidth > 868) {
    return (
      <header className={styles.main}>
        <div className={styles.container}>
          <div className={styles.top}>
            <Link href={city ? `/${city}` : "/"}>
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
  } else if (htmlWidth <= 868 && htmlWidth >= 420) {
    return (
      <header className={styles.main}>
        <div className={styles.containerTablet}>
          <Link href={city ? `/${city}` : "/"}>
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
        <Link href={city ? `/${city}` : "/"}>
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
