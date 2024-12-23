import styles from "./Footer.module.css";
import { useState, useEffect } from "react";
import iconLogo from "./imgs/iconLogo.svg";
import tgIcon from "./imgs/iconTG.svg";
import waIcon from "./imgs/iconWA.svg";
import Link from "next/link";
import { Link as ScrollLink } from "react-scroll";
import Image from "next/image";
import { useRouter } from "next/router";

const Footer = () => {
  const [windowWidth, setWindowWidth] = useState(null);
  const router = useRouter();
  const { city } = router.query;
  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    handleWindowResize();

    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });
  if (windowWidth >= 1024) {
    return (
      <div className={styles.main}>
        <div className={styles.policyAndAgreement}>
          <Link href="/">
            <Image src={iconLogo} alt="Логотип компании" />
          </Link>
          <p>
            <Link href={`/${city}/policy`}>Политика конфиденциальности</Link>
          </p>
          <p>
            <Link href={`/${city}/agreement`}>Пользовательское соглашение</Link>
          </p>
        </div>
        <div className={styles.nav}>
          <div className={styles.wrapperNav}>
            <p>
              <ScrollLink
                to="aboutUs"
                smooth={true}
                duration={700}
                offset={-200}
              >
                О нас
              </ScrollLink>
            </p>
            <p>
              <Link href={`/${city}/tariffs`}>Тарифы</Link>
            </p>
          </div>
          <div className={styles.wrapperNav}>
            <p>
              <ScrollLink to="help" smooth={true} duration={700} offset={-200}>
                Помощь
              </ScrollLink>
            </p>
            <p>
              <ScrollLink smooth={true} duration={700} to="faq" offset={-200}>
                Ответы на вопросы
              </ScrollLink>
            </p>
            <p>
              <Link href={`/${city}/contacts`}>Контакты</Link>
            </p>
          </div>
        </div>
        <div className={styles.numberAndLinks}>
          <p className={styles.number}>
            <a href="tel:+79587764952">+7 (958) 776-49-52</a>
          </p>
          <p className={styles.cons}>
            Бесплатная консультация Ежедневно с 9 до 22 часов
          </p>
          <div className={styles.links}>
            <a target="_blank" href="https://web.telegram.org/a/#5162024826">
              <Image src={tgIcon} alt="Логотип Telegram" />
            </a>
            <a target="_blank" href="https://wa.me/79526896473">
              <Image src={waIcon} alt="Логотип Whatsapp" />
            </a>
          </div>
        </div>
      </div>
    );
  } else if (windowWidth < 1024 && windowWidth >= 660) {
    return (
      <div className={styles.mainTablet}>
        <div className={styles.topTablet}>
          <Link href="/">
            <Image src={iconLogo} alt="Логотип компании" />
          </Link>
          <div className={styles.navTablet}>
            <div className={styles.wrapperNavTablet}>
              <p>
                <ScrollLink
                  to="aboutUs"
                  smooth={true}
                  duration={700}
                  offset={-200}
                >
                  О нас
                </ScrollLink>
              </p>
              <p>
                <Link href={`/${city}/tariffs`}>Тарифы</Link>
              </p>
            </div>
            <div className={styles.wrapperNavTablet}>
              <p>
                <ScrollLink
                  to="help"
                  smooth={true}
                  duration={700}
                  offset={-200}
                >
                  Помощь
                </ScrollLink>
              </p>
              <p>
                <ScrollLink smooth={true} duration={700} to="faq" offset={-200}>
                  Ответы на вопросы
                </ScrollLink>
              </p>
              <p>
                <Link href={`/${city}/contacts`}>Контакты</Link>
              </p>
            </div>
          </div>
          <div className={styles.numberAndLinksTablet}>
            <p className={styles.numberTablet}>
              <a href="tel:+79587764952">+7 (958) 776-49-52</a>
            </p>
            <p className={styles.consTablet}>
              Бесплатная консультация Ежедневно с 9 до 22 часов
            </p>
          </div>
        </div>
        <div className={styles.botTablet}>
          <div className={styles.policyAndAgreementTablet}>
            <p>
              <Link href={`/${city}/policy`}>Политика конфиденциальности</Link>
            </p>
            <p>
              <Link href={`/${city}/agreement`}>
                Пользовательское соглашение
              </Link>
            </p>
          </div>
          <div className={styles.linksTablet}>
            <a target="_blank" href="https://web.telegram.org/a/#5162024826">
              <Image src={tgIcon} alt="Логотип Telegram" />
            </a>
            <a target="_blank" href="https://wa.me/79526896473">
              <Image src={waIcon} alt="Логотип Whatsapp" />
            </a>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.mainMobile}>
        <div className={styles.topOrLeft}>
          <Link href="/">
            <Image src={iconLogo} alt="Логотип компании" />
          </Link>

          <div className={styles.navMobile}>
            <p>
              <ScrollLink
                to="aboutUs"
                smooth={true}
                duration={700}
                offset={-200}
              >
                О нас
              </ScrollLink>
            </p>
            <p>
              <Link href={`/${city}/tariffs`}>Тарифы</Link>
            </p>

            <p>
              <ScrollLink to="help" smooth={true} duration={700} offset={-200}>
                Помощь
              </ScrollLink>
            </p>
            <p>
              <ScrollLink smooth={true} duration={700} to="faq" offset={-200}>
                Ответы на вопросы
              </ScrollLink>
            </p>
            <p>
              <Link href={`/${city}/contacts`}>Контакты</Link>
            </p>
          </div>
        </div>
        <div className={styles.botOrRight}>
          <div className={styles.numberAndLinksMobile}>
            <p className={styles.numberMobile}>
              <a href="tel:+79587764952">+7 (958) 776-49-52</a>
            </p>
            <p className={styles.consMobile}>
              Бесплатная консультация Ежедневно с 9 до 22 часов
            </p>
          </div>
          <div className={styles.linksMobile}>
            <a target="_blank" href="https://web.telegram.org/a/#5162024826">
              <Image src={tgIcon} alt="Логотип Telegram" />
            </a>
            <a target="_blank" href="https://wa.me/79526896473">
              <Image src={waIcon} alt="Логотип Whatsapp" />
            </a>
          </div>
          <div className={styles.policyAndAgreementMobile}>
            <p>
              <Link href={`/${city}/policy`}>Политика конфиденциальности</Link>
            </p>
            <p>
              <Link href={`/${city}/agreement`}>
                Пользовательское соглашение
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
};

export default Footer;
