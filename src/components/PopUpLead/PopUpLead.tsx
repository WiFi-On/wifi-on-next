import styles from "./PopUpLead.module.css";
import Input from "../Input/Input";
import Image from "next/image";
import close from "./Button.png";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  openPopUpAgreement,
  openPopUpPolicy,
  closePopUpLead,
  selectIsOpenPopUpLead,
  selectIsOpenPopUpPolicy,
} from "../../redux/reducers/modalSlice";
import cn from "classnames";

const PopUpLead = () => {
  const isOpen = useSelector(selectIsOpenPopUpLead);
  const isOpenPolicy = useSelector(selectIsOpenPopUpPolicy);
  const dispatch = useDispatch();

  const idProvidersBitrix = {
    МТС: 54,
    Ростелеком: 52,
    Билайн: 56,
    Мегафон: 57,
    "Дом.ру": 60,
  };

  const [nameTariff, setNameTariff] = useState("");
  const [nameProvider, setNameProvider] = useState("");
  const [priceTariff, setPriceTariff] = useState("");

  const [address, setAddress] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");

  const [numberValidation, setNumberValidation] = useState(false);
  const [addressValidation, setAddressValidation] = useState(false);

  const [sent, setSent] = useState(false);

  const [checked, setChecked] = useState(false);

  const [closing, setClosing] = useState(false);

  const closeModalHandler = () => {
    setClosing(true);
    setTimeout(() => {
      dispatch(closePopUpLead());
      document.body.style.overflow = "auto";
      setClosing(false);
    }, 300);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const responseUser = await fetch(
        "https://on-wifi.bitrix24.ru/rest/11940/8je0m717nl212bhe/crm.contact.add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fields: {
              NAME: clientName,
              SECOND_NAME: clientName,
              LAST_NAME: clientName,
              PHONE: [{ VALUE: clientPhone, VALUE_TYPE: "WORK" }],
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

      const responseLead = await fetch(
        "https://on-wifi.bitrix24.ru/rest/11940/8je0m717nl212bhe/crm.deal.add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fields: {
              TITLE: "Заявка с сайта on-wifi ТЕСТ",
              CONTACT_ID: contactId,
              UF_CRM_1697294773665: idProvidersBitrix[nameProvider],
              UF_CRM_1697294796468: nameTariff,
              OPPORTUNITY: priceTariff,
              UF_CRM_1697646751446: address,
            },
          }),
        }
      );
      if (!responseLead.ok) {
        throw new Error("Ошибка при отправке данных");
      }
      setClientName("");
      setClientPhone("");
      setAddress("");
      setNumberValidation(false);
      setSent(true);
      setTimeout(() => {
        closeModalHandler();
      }, 3000);
    } catch (error) {
      console.error("Ошибка:", error.message);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    setAddress(event.target.value);

    const token = "bbbdb08051ba3df93014d80a721660db6c19f0db";
    fetch(
      "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Token " + token,
        },
        body: JSON.stringify({ query: address, count: 5 }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setSuggestions(data.suggestions);
      })
      .catch((error) => {
        console.error("Ошибка:", error);
      });
  };

  const clickSuggestion = (event) => {
    const selectedAddress = event.target.textContent;
    const lvl = parseInt(event.target.getAttribute("lvl"), 10);

    if (lvl >= 9) {
      setAddressValidation(true);
    } else {
      setAddressValidation(false);
    }

    setAddress(selectedAddress);
    setSuggestions([]);
  };

  useEffect(() => {
    const nameLastTariff = localStorage.getItem("nameTariff");
    setNameTariff(nameLastTariff);
    const nameLastProvider = localStorage.getItem("nameProvider");
    setNameProvider(nameLastProvider);
    const priceLastTariff = localStorage.getItem("priceTariff");
    setPriceTariff(priceLastTariff);
    const addressStorage = localStorage.getItem("address");
    setAddress(addressStorage);

    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
  }, [isOpen]);

  if (!isOpen && !closing) return null;

  if (sent) {
    return (
      <div className={styles.container} onClick={closeModalHandler}>
        <div
          className={cn(styles.main, {
            [styles.mainActive]: isOpen,
            [styles.mainClosing]: closing,
          })}
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            className={styles.close}
            src={close}
            onClick={closeModalHandler}
            alt=""
          ></Image>
          <div className={styles.wrapper}>
            <h2>Заявка успешно отправлена</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(styles.container, {
        [styles.containerActive]: isOpen,
        [styles.containerClosing]: closing,
      })}
      onClick={closeModalHandler}
    >
      <div
        className={cn(styles.main, {
          [styles.mainActive]: isOpen,
          [styles.mainClosing]: closing,
        })}
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          className={styles.close}
          src={close}
          onClick={closeModalHandler}
          alt=""
        ></Image>
        <div className={styles.wrapper}>
          <h2>Заявка на подключение</h2>
          <form onSubmit={handleSubmit}>
            <div className={styles.inputs}>
              <Input
                placeholder="Ваше имя"
                onChange={(e) => setClientName(e.target.value)}
                value={clientName}
              ></Input>
              <Input
                placeholder="Ваш телефон"
                onChange={(e) => setClientPhone(e.target.value)}
                typeInput="phone"
                value={clientPhone}
                setIsValid={setNumberValidation}
              ></Input>
              <div className={styles.wrapperAddress}>
                <input
                  onChange={handleSearch}
                  placeholder="Адрес подключения"
                  className={cn({
                    [styles.activeAddress]: address,
                    [styles.wrapperAddressInput]: !address,
                  })}
                  value={address}
                  onBlur={() => setTimeout(() => setSuggestions([]), 100)}
                ></input>
                <div
                  className={cn(styles.suggestions, {
                    [styles.suggestionsActive]: suggestions.length > 0,
                  })}
                >
                  {suggestions.map((suggestion, i) => {
                    return (
                      <p
                        key={i}
                        lvl={suggestion.data.fias_level}
                        onClick={clickSuggestion}
                      >
                        {suggestion.value}
                      </p>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className={styles.agrement}>
              <label className={styles.customCheckbox}>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => {
                    setChecked(!checked);
                  }}
                  spellcheck="false"
                />
                <span className={styles.checkmark}></span>
              </label>
              <p>
                Я даю{" "}
                <p
                  onClick={() => dispatch(openPopUpAgreement())}
                  className={styles.link}
                >
                  Согласие на обработку персональных данных
                </p>
              </p>
            </div>
            <div className={styles.buttonAndText}>
              <button
                disabled={!(numberValidation && addressValidation && checked)}
              >
                Отправить
              </button>
              <p>
                Отправляя заявку, вы соглашаетесь с{" "}
                <p
                  onClick={() => {
                    dispatch(openPopUpPolicy());
                  }}
                  className={styles.link}
                >
                  Политикой обработки персональных данных
                </p>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PopUpLead;
