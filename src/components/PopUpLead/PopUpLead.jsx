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

    dispatch(closePopUpLead());
    document.body.style.overflow = "auto";
    setClosing(false);
    setSent(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const responseUser = await fetch("/api/addContact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clientName: clientName,
          clientPhone: clientPhone,
          address: address,
        }),
      });
      if (!responseUser.ok) {
        throw new Error("Ошибка при отправке данных");
      }

      const userData = await responseUser.json();
      const contactId = userData.result;

      const responseLead = await fetch("/api/addLead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contactId: contactId,
          nameProvider: nameProvider,
          nameTariff: nameTariff,
          priceTariff: priceTariff,
          address: address,
        }),
      });

      if (!responseLead.ok) {
        throw new Error("Ошибка при отправке данных");
      }
      setClientName("");
      setClientPhone("");
      setAddress("");
      setNumberValidation(false);
      setSent(true); // Ставим состояние в true после успешной отправки
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
    console.log(selectedAddress);
    const lvl = parseInt(event.target.getAttribute("lvl"), 10);

    if (lvl >= 8) {
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
    if (addressStorage) {
      setAddressValidation(true);
    }
    setAddress(addressStorage);

    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
  }, [isOpen]);

  if (!isOpen && !closing) return null;

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
          {sent ? (
            <h2>Заявка успешно отправлена</h2>
          ) : (
            <>
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
                      onBlur={() => setSuggestions([])}
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
                    disabled={
                      !(numberValidation && addressValidation && checked)
                    }
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PopUpLead;
