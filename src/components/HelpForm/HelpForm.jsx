import styles from "./HelpForm.module.css";
import cn from "classnames";
import helpDesk from "./imgs/helpDesk.png";
import { useEffect, useState } from "react";
import Input from "../Input/Input";
import Image from "next/image";
import { Element } from "react-scroll";
import Link from "next/link";

const HelpForm = (props) => {
  const [windowWidth, setWindowWidth] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [numberValidation, setNumberValidation] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    handleWindowResize();

    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const responseUser = await fetch(
        "https://on-wifi.bitrix24.ru/rest/11940/5ii72jw03e78jrz7/crm.contact.add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fields: {
              NAME: name,
              SECOND_NAME: name,
              LAST_NAME: name,
              PHONE: [{ VALUE: phone, VALUE_TYPE: "WORK" }],
              ADDRESS: address,
            },
          }),
        }
      );
      if (!responseUser.ok) {
        throw new Error("Ошибка при отправке данных");
      }

      const userData = await responseUser.json();
      const contactId = userData.result;
      console.log(contactId);
      const responseLead = await fetch(
        "https://on-wifi.bitrix24.ru/rest/11940/5ii72jw03e78jrz7/crm.deal.add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fields: {
              TITLE: "Заявка с сайта on-wifi ТЕСТ",
              CONTACT_ID: contactId,
            },
          }),
        }
      );
      if (!responseLead.ok) {
        throw new Error("Ошибка при отправке данных");
      }
      setName("");
      setPhone("");
      setAddress("");
      setNumberValidation(false);
      setSent(true);
    } catch (error) {
      console.error("Ошибка:", error.message);
    }
  };

  if (windowWidth > 1280) {
    return (
      <Element name="help" className={styles.main}>
        <form className={styles.containerForm} onSubmit={handleSubmit}>
          <h2>Нужна помощь в выборе тарифа?</h2>
          <p className={styles.desc}>
            Оставьте свои контактные данные в форме ниже и наши менеджеры
            свяжутся с вами, чтобы подробно проконсультировать вас о тарифах и
            провайдерах вашего города
          </p>
          <div className={styles.inputs}>
            <Input
              placeholder="Ваше имя"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              placeholder="Ваш телефон"
              name="phone"
              typeInput="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              setIsValid={setNumberValidation}
            />
            <Input
              placeholder="Адрес подключения"
              name="address"
              typeInput="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          {sent && (
            <p className={styles.sent}>
              Заявка отправлена! Ждите обратной связи
            </p>
          )}
          <div className={styles.sendAndText}>
            <button disabled={!numberValidation} type="submit">
              Отправить
            </button>
            <p>
              Нажимая кнопку «Отправить» вы соглашаетесь с{" "}
              <span>
                <Link href={"/policy"}>Политикой конфиденциальности</Link>
              </span>
            </p>
          </div>
        </form>
        <Image src={helpDesk} alt="" />
      </Element>
    );
  } else if (windowWidth < 1280 && windowWidth > 680) {
    return (
      <Element name="help" className={styles.mainTablet}>
        <form className={styles.containerForm} onSubmit={handleSubmit}>
          <h2>Нужна помощь в выборе тарифа?</h2>
          <p className={styles.descTablet}>
            Оставьте свои контактные данные в форме ниже и наши менеджеры
            свяжутся с вами, чтобы подробно проконсультировать вас о тарифах
            и провайдерах вашего города
          </p>
          <div className={styles.containerFormTablet}>
            <div className={styles.inputsTablet}>
              <Input
                placeholder="Ваше имя"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                placeholder="Ваш телефон"
                name="phone"
                typeInput="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                setIsValid={setNumberValidation}
              />
              <Input
                placeholder="Адрес подключения"
                name="address"
                typeInput="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <Image src={helpDesk} alt="" />
          </div>
          {sent && (
            <p className={styles.sent}>
              Заявка отправлена! Ждите обратной связи
            </p>
          )}
          <div className={styles.sendAndImgTablet}>
            <button disabled={numberValidation} type="submit">
              Отправить
            </button>
            <p>
              Нажимая кнопку «Отправить» вы соглашаетесь с 
              <span>
                <Link href={"/policy"}>Политикой конфиденциальности</Link>
              </span>
            </p>
          </div>
        </form>
      </Element>
    );
  } else {
    return (
      <Element name="help" className={styles.mainMobile}>
        <form className={styles.containerForm} onSubmit={handleSubmit}>
          <h2>Нужна помощь в выборе тарифа?</h2>
          <p className={styles.descMobile}>
            Оставьте свои контактные данные в форме ниже и наши менеджеры
            свяжутся с вами, чтобы подробно проконсультировать вас о тарифах
            и провайдерах вашего города
          </p>
          <div className={styles.inputsMobile}>
            <Input
              placeholder="Ваше имя"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              placeholder="Ваш телефон"
              name="phone"
              typeInput="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              setIsValid={setNumberValidation}
            />
            <Input
              placeholder="Адрес подключения"
              name="address"
              typeInput="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className={styles.sendAndTextMobile}>
            <button disabled={numberValidation} type="submit">
              Отправить
            </button>
            {sent && (
              <p className={styles.sent}>
                Заявка отправлена! Ждите обратной связи
              </p>
            )}
            <p>
              Нажимая кнопку «Отправить» вы соглашаетесь с 
              <span>
                {" "}
                <Link href={"/policy"}>Политикой конфиденциальности</Link>
              </span>
            </p>
          </div>
          <Image src={helpDesk} alt="" />
        </form>
      </Element>
    );
  }
};

export default HelpForm;
