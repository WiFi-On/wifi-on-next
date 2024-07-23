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

  // Дебаунсинг
  const debounceTimeoutRef = useRef(null);

  const router = useRouter();
  const { city } = router.query;
  const inputRef = useRef(null);

  const fetchSuggestions = (newQuery) => {
    fetch("/api/searchAddress", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: newQuery, count: 4 }),
    })
      .then((response) => response.json())
      .then((data) => {
        setSuggestions(data.suggestions);
        setActiveSuggestions(true);
      })
      .catch((error) => {
        console.error("Ошибка:", error);
      });
  };

  const handleSearch = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);

    // Очистка предыдущего таймера
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    // Установка нового таймера
    debounceTimeoutRef.current = setTimeout(() => {
      if (newQuery.trim() !== "") {
        fetchSuggestions(newQuery);
      } else {
        setSuggestions([]);
        setActiveSuggestions(false);
      }
    }, 300); // задержка в 300мс
  };

  const delFlatOnAddress = (address) => {
    const addressParts = address.split(",");
    const addressWithoutFlat = addressParts
      .slice(0, addressParts.length - 1)
      .join(",");
    return addressWithoutFlat;
  };

  const handleFocus = (event) => {
    if (event.target.value !== "") {
      inputRef.current.select();
      handleSearch(event);
    }
  };

  const handleBlur = () => {
    setTimeout(() => {
      setActiveSuggestions(false);
    }, 200);
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
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>
      <div
        className={cn(styles.bot, { [styles.botActive]: activeSuggestions })}
      >
        {suggestions.map((suggestion, i) => {
          if (suggestion.data.fias_level >= "8") {
            let address;
            if (suggestion.data.flat) {
              address = delFlatOnAddress(suggestion.value);
              return (
                <Link
                  onClick={clickSuggestion}
                  key={i}
                  href={`/${city}/tariffs?address=${CryptoJS.MD5(
                    address
                  ).toString()}`}
                  className={styles.suggestion}
                >
                  {suggestion.value}
                </Link>
              );
            }
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
          } else {
            return (
              <p key={i} onClick={clickSuggestion}>
                {suggestion.value}
              </p>
            );
          }
        })}
      </div>
    </div>
  );
};

export default AddressClient;
