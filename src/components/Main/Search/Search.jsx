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

  const handleSearch = (event) => {
    event.preventDefault();
    setQuery(event.target.value);

    console.log("тут");
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
        body: JSON.stringify({ query: query }),
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
