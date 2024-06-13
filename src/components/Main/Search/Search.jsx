import styles from "./Search.module.css";
import cn from "classnames";
import { useState, useEffect } from "react";
import Link from "next/link";

const Search = ({ device }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleSearch = (event) => {
    event.preventDefault();
    setQuery(event.target.value);

    clearTimeout(timer);

    timer = setTimeout(() => {
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
    }, 500);
  };

  let timer;

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
        {/* <div
          className={cn(styles.buttonSearch, {
            [styles.buttonSearchTablet]: device === "tablet",
            [styles.buttonSearchMobile]: device === "mobile",
          })}
        >
          <svg
            width="19"
            height="19"
            viewBox="0 0 19 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <path
                d="M18.8269 17.9859L13.0769 12.1796C14.1486 10.8913 14.7945 9.23395 14.7945 7.42422C14.7945 3.32397 11.4826 0 7.39725 0C3.3119 0 0 3.32397 0 7.42422C0 11.5245 3.3119 14.8484 7.39725 14.8484C9.25337 14.8484 10.9488 14.1607 12.2478 13.0268L17.9898 18.826C18.2209 19.058 18.5958 19.058 18.8269 18.826C19.0577 18.5941 19.0577 18.2181 18.8269 17.9859H18.8269ZM7.39725 13.6704C3.96019 13.6704 1.1738 10.8738 1.1738 7.42422C1.1738 3.97463 3.96019 1.17807 7.39725 1.17807C10.8343 1.17807 13.6207 3.97463 13.6207 7.42422C13.6207 10.8738 10.8343 13.6704 7.39725 13.6704Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_399_1678" fill="white">
                <rect width="19" height="19" />
              </clipPath>
            </defs>
          </svg>
        </div> */}
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
                href={`/tariffs?address=${suggestion.value}`}
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
