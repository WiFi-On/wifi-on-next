import React from "react";
import styles from "./SliderTariffsFilter.module.css";
import CardTariff from "../CardTariff/CardTariff";
import arrowLeft from "./imgs/arrowLeft.svg";
import arrowRight from "./imgs/arrowRight.svg";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

function SliderTariffsFilter({ allTariffs }) {
  const [filterTariffs, setFilterTariffs] = useState([]);

  const dispatch = useDispatch();
  const activeProviders = useSelector((state) => state.filter.providers);

  const filterTariffsFun = (tariffs, activeProviders) => {
    let results = [];

    tariffs.forEach((tariff) => {
      if (activeProviders.includes(tariff.provider.id)) {
        results.push(tariff);
      }
    });

    console.log(results);
    setFilterTariffs(results);
  };

  useEffect(() => {
    if (activeProviders.length > 0) {
      console.log("я в фильтрации");
      filterTariffsFun(allTariffs, activeProviders);
    } else {
      console.log("я не в фильтрации");
      setFilterTariffs(allTariffs);
    }
  }, [allTariffs, activeProviders]);

  return (
    <div className={styles.main}>
      <div className={styles.sliderContainer}>
        {filterTariffs.map((tariff) => (
          <CardTariff key={tariff.id} tariff={tariff} />
        ))}
      </div>
      <div className={styles.buttons}>
        <img src={arrowLeft} alt="" />
        <img src={arrowRight} alt="" />
      </div>
    </div>
  );
}

export default SliderTariffsFilter;
