import styles from "./Search.module.css";
import cn from "classnames";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Search = ({ device }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const router = useRouter();
  const { city } = router.query;

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const delayDebounceFn = setTimeout(() => {
      if (query) {
        fetch("/api/searchAddress", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query: query, count: 10 }),
          signal: signal,
        })
          .then((response) => response.json())
          .then((data) => {
            setSuggestions(data.suggestions);
          })
          .catch((error) => {
            if (error.name !== "AbortError") {
              console.error("Ошибка:", error);
            }
          });
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => {
      clearTimeout(delayDebounceFn);
      controller.abort();
    };
  }, [query]);

  const checkCity = async (districtFiasId) => {
    try {
      const response = await fetch("/api/checkDistrict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ districtFiasId: districtFiasId }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

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

  const clickSuggestionlvl8 = async (address, fiasId) => {
    const cityData = await checkCity(fiasId);
    const cityURL = cityData.engNameDistrict ? cityData.engNameDistrict : city;
    router.push(`/${cityURL}/tariffs?address=${address}`);
    localStorage.setItem("address", address);
    localStorage.setItem(
      "city",
      cityData.engNameDistrict.engname ? cityData.engNameDistrict.engname : city
    );
    setQuery(address);
    setSuggestions([]);
  };
  const clickSuggestion = (address) => {
    setQuery(address);
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
                <p
                  onClick={() =>
                    clickSuggestionlvl8(
                      address,
                      suggestion.data.settlement_fias_id
                        ? suggestion.data.settlement_fias_id
                        : suggestion.data.city_fias_id
                    )
                  }
                  key={i}
                  className={styles.suggestion}
                >
                  {suggestion.value}
                </p>
              );
            }
            return (
              <p
                onClick={() =>
                  clickSuggestionlvl8(
                    suggestion.value,
                    suggestion.data.settlement_fias_id
                      ? suggestion.data.settlement_fias_id
                      : suggestion.data.city_fias_id
                  )
                }
                key={i}
                className={styles.suggestion}
              >
                {suggestion.value}
              </p>
            );
          } else {
            return (
              <p
                key={i}
                onClick={() =>
                  clickSuggestion(
                    suggestion.value,
                    suggestion.data.settlement_fias_id
                      ? suggestion.data.settlement_fias_id
                      : suggestion.data.city_fias_id
                  )
                }
              >
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
