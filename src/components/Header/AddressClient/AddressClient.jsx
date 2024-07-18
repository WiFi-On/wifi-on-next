import iconVectorWhite from "./iconVectorWhite.svg";
import iconVectorBlack from "./iconVectorBlack.svg";
import cn from "classnames";
import styles from "./AddressClient.module.css";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import CryptoJS from "crypto-js";

const AddressClient = ({ mobile }) => {
  const addressStorage = localStorage.getItem("address");
  const [suggestions, setSuggestions] = useState([]);
  const [query, setQuery] = useState("");
  const [activeSuggestions, setActiveSuggestions] = useState(false);

  const router = useRouter();
  const { city } = router.query;
  const inputRef = useRef(null);

  const handleSearch = (event) => {
    event.preventDefault();
    const newQuery = event.target.value;
    setQuery(newQuery);

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
        body: JSON.stringify({ query: newQuery, count: 3 }),
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

  const handlefocus = (event) => {
    inputRef.current.select();
  };

  const clickSuggestion = (event) => {
    const address = event.target.textContent;
    localStorage.setItem("address", address);
    setQuery(address);
    setSuggestions([]);
    setActiveSuggestions(false);
  };

  useEffect(() => {
    if (addressStorage) {
      setQuery(addressStorage);
    }
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
          <Image className="" src={iconVectorBlack} alt="icon" />
        ) : (
          <Image className="" src={iconVectorWhite} alt="icon" />
        )}
        <input
          onChange={handleSearch}
          className={styles.address}
          value={query}
          type="text"
          ref={inputRef}
          onFocus={handlefocus}
        />
      </div>
      <div
        className={cn(styles.bot, { [styles.botActive]: activeSuggestions })}
      >
        {suggestions.map((suggestion, i) => {
          if (suggestion.data.fias_level !== "8") {
            return (
              <p
                className={styles.suggestion}
                key={i}
                onClick={clickSuggestion}
              >
                {suggestion.value}
              </p>
            );
          } else {
            return (
              <Link
                onClick={clickSuggestion}
                key={i}
                href={`/${city}/tariffs?address=${CryptoJS.MD5(
                  suggestion.value
                ).toString()}`}
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
