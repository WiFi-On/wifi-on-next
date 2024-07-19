import styles from "./Search.module.css";
import cn from "classnames";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import CryptoJS from "crypto-js";

const Search = ({ device }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const { city } = useRouter().query;

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query) {
        fetch("/api/searchAddress", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query: query, count: 10 }),
        })
          .then((response) => response.json())
          .then((data) => {
            setSuggestions(data.suggestions);
          })
          .catch((error) => {
            console.error("Ошибка:", error);
          });
      } else {
        setSuggestions([]);
      }
    }, 300); // задержка в 300мс

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const delFlatOnAddress = (address) => {
    const addressParts = address.split(",");
    const addressWithoutFlat = addressParts
      .slice(0, addressParts.length - 1)
      .join(",");
    return addressWithoutFlat;
  };

  const handleSearch = (event) => {
    setQuery(event.target.value);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setSuggestions([]);
    }, 200);
  };

  const handleFocus = (event) => {
    event.target.select();
  };

  const clickSuggestion = (event) => {
    localStorage.setItem("address", event.target.textContent);
    console.log(event.target);
    setQuery(event.target.textContent);
    setSuggestions([]);
  };

  return (
    <div className={styles.main}>
      <div
        className={cn(styles.search, {
          [styles.searchTablet]: device === "tablet",
          [styles.searchMobile]: device === "mobile",
        })}
      >
        <input
          onChange={handleSearch}
          onBlur={handleBlur}
          onFocus={handleFocus}
          value={query}
          type="text"
          placeholder="Введите ваш адрес"
        />
      </div>
      <div
        className={cn(styles.suggestions, {
          [styles.suggestionsActive]: suggestions.length > 0,
        })}
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

export default Search;
