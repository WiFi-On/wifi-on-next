import React, { useState, useEffect } from "react";
import styles from "./SliderTariffsFilter.module.css";
import CardTariff from "../CardTariff/CardTariff";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import Image from "next/image";

function SliderTariffsFilter({ allTariffs }) {
  const [filterTariffs, setFilterTariffs] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const tariffsPerPage = 16; // Количество тарифов на одной странице

  const dispatch = useDispatch();
  const activeProviders = useSelector((state) => state.filter.providers);

  const filterTariffsFun = (tariffs, activeProviders) => {
    let results = [];

    tariffs.forEach((tariff) => {
      if (activeProviders.includes(tariff.provider.id)) {
        results.push(tariff);
      }
    });

    setFilterTariffs(results);
  };

  useEffect(() => {
    if (activeProviders.length > 0) {
      filterTariffsFun(allTariffs, activeProviders);
    } else {
      setFilterTariffs(allTariffs);
    }
  }, [allTariffs, activeProviders]);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const pageCount = Math.ceil(filterTariffs.length / tariffsPerPage);
  const offset = currentPage * tariffsPerPage;

  return (
    <div className={styles.main}>
      <div className={styles.sliderContainer}>
        {filterTariffs.slice(offset, offset + tariffsPerPage).map((tariff) => (
          <CardTariff key={tariff.id} tariff={tariff} />
        ))}
      </div>
      <ReactPaginate
        pageCount={pageCount}
        pageRangeDisplayed={2}
        marginPagesDisplayed={1}
        onPageChange={handlePageChange}
        containerClassName={styles.pagination} // Используйте переменную стилей из модуля CSS
        activeClassName={styles.active} // Используйте переменную стилей из модуля CSS
        previousClassName={styles.previous}
        nextClassName={styles.next}
        previousLabel={"<"}
        nextLabel={">"}
      />
    </div>
  );
}

export default SliderTariffsFilter;
