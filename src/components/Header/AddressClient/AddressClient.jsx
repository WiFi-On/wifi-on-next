import iconVectorWhite from "./iconVectorWhite.svg";
import iconVectorBlack from "./iconVectorBlack.svg";
import cn from "classnames";
import styles from "./AddressClient.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";

const AddressClient = ({ mobile }) => {
  const addressStorage = localStorage.getItem("address");
  const [suggestions, setSuggestions] = useState([]);
  const [query, setQuery] = useState("");
  const [activeSuggestions, setActiveSuggestions] = useState(false);

  const handleSearch = (event) => {
    event.preventDefault();
    setQuery(event.target.value);
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
        body: JSON.stringify({ query: query, count: 3 }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setSuggestions(data.suggestions);
        setActiveSuggestions(true);
      })
      .catch((error) => {
        console.error("Ошибка:", error);
      });
  };

  const clickSuggestion = (event) => {
    localStorage.setItem("address", event.target.textContent);
    console.log(event.target);
    setQuery(event.target.textContent);
    setSuggestions([]);
    setActiveSuggestions(false);
  };

  useEffect(() => {
    if (addressStorage) {
      setQuery(addressStorage);
    }

    updateInputWidth(); // Обновляем ширину при первой загрузке компонента
  }, [addressStorage]);

  return (
    <div
      className={cn(styles.main, {
        [styles.colorMobile]: mobile,
        [styles.colorDesk]: !mobile,
      })}
    >
      <div className={styles.top}>
        {mobile ? (
          <Image className="" src={iconVectorBlack} alt="" />
        ) : (
          <Image className="" src={iconVectorWhite} alt="" />
        )}
        <input
          onChange={handleSearch}
          className={styles.address}
          value={query}
          type="text"
        ></input>
      </div>
      <div
        className={cn(styles.bot, { [styles.botActive]: activeSuggestions })}
      >
        {suggestions.map((suggestion, i) => {
          if (suggestion.data.fias_level !== "8") {
            return (
              <p key={i} onClick={clickSuggestion}>
                {suggestion.value}
              </p>
            );
          } else {
            return (
              <Link
                onClick={clickSuggestion}
                key={i}
                href={`/tariffs?address=${suggestion.value}`}
                className={styles.suggestion}
              >
                {suggestion.value}
              </Link>
            );
          }
        })}
      </div>
    </div>
  );
};

export default AddressClient;
