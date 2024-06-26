import React, { useState, useEffect } from "react";
import styles from "./SliderTariffsFilter.module.css";
import CardTariff from "../CardTariff/CardTariff";
import ReactPaginate from "react-paginate";
import { useRouter } from "next/router";

function SliderTariffsFilter({ allTariffs }) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0);
  const [filteredTariffs, setFilteredTariffs] = useState(allTariffs);
  const tariffsPerPage = 16; // Количество тарифов на одной странице
  console.log(filteredTariffs);
  useEffect(() => {
    const { providers, connectType, discount, freeConnection } = router.query;
    let filtered = allTariffs;

    if (providers) {
      const providerIds = providers.split(",").map((id) => parseInt(id, 10));
      filtered = filtered.filter((tariff) =>
        providerIds.includes(tariff.provider.id)
      );
    }

    if (connectType) {
      const typeTariffIds = connectType
        .split(",")
        .map((id) => parseInt(id, 10));
      if (typeTariffIds.length === 1) {
        if (typeTariffIds.includes(1)) {
          filtered = filtered.filter(
            (tariff) =>
              tariff.internet_speed && !tariff.channels_count && !tariff.minutes
          );
        }
        if (typeTariffIds.includes(2)) {
          filtered = filtered.filter(
            (tariff) =>
              tariff.internet_speed && tariff.channels_count && !tariff.minutes
          );
        }
        if (typeTariffIds.includes(3)) {
          filtered = filtered.filter((tariff) => tariff.minutes);
        }
      }
      if (typeTariffIds.length === 2) {
        if (typeTariffIds.includes(1) && typeTariffIds.includes(2)) {
          filtered = filtered.filter(
            (tariff) =>
              tariff.internet_speed && tariff.channels_count && !tariff.minutes
          );
        }
        if (typeTariffIds.includes(2) && typeTariffIds.includes(3)) {
          filtered = filtered.filter(
            (tariff) =>
              tariff.internet_speed && tariff.channels_count && tariff.minutes
          );
        }
        if (typeTariffIds.includes(1) && typeTariffIds.includes(3)) {
          filtered = filtered.filter(
            (tariff) =>
              tariff.internet_speed && !tariff.channels_count && tariff.minutes
          );
        }
      }
      if (typeTariffIds.length === 3) {
        filtered = filtered.filter(
          (tariff) =>
            tariff.internet_speed && tariff.channels_count && tariff.minutes
        );
      }
    }
    console.log(filtered);
    if (discount) {
      filtered = filtered.filter((tariff) => tariff.min_tariff_cost);
    }
    if (freeConnection) {
      filtered = filtered.filter((tariff) => tariff.connection_cost);
    }
    setFilteredTariffs(filtered);
    setCurrentPage(0); // Сброс текущей страницы при изменении фильтров
  }, [router.query, allTariffs]);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
    smoothScrollToTop();
  };

  const smoothScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const pageCount = Math.ceil(filteredTariffs.length / tariffsPerPage);
  const offset = currentPage * tariffsPerPage;

  if (filteredTariffs.length < 1)
    return (
      <div className={styles.main}>
        <div className={styles.sliderContainer}>
          {Array.from({ length: tariffsPerPage }).map((_, index) => (
            <div key={index} className={styles.cardTariffLoading}></div>
          ))}
        </div>
        <ReactPaginate
          pageCount={pageCount}
          pageRangeDisplayed={2}
          marginPagesDisplayed={1}
          onPageChange={handlePageChange}
          containerClassName={styles.pagination}
          activeClassName={styles.active}
          previousClassName={styles.previous}
          nextClassName={styles.next}
          previousLabel={"<"}
          nextLabel={">"}
          renderOnZeroPageCount={null}
          breakLabel="..."
        />
      </div>
    );

  return (
    <div className={styles.main}>
      <div className={styles.sliderContainer}>
        {filteredTariffs
          .slice(offset, offset + tariffsPerPage)
          .map((tariff) => (
            <CardTariff key={tariff.id} tariff={tariff} />
          ))}
      </div>
      <ReactPaginate
        pageCount={pageCount}
        pageRangeDisplayed={2}
        marginPagesDisplayed={1}
        onPageChange={handlePageChange}
        containerClassName={styles.pagination}
        activeClassName={styles.active}
        previousClassName={styles.previous}
        nextClassName={styles.next}
        disabledClassName={styles.disabled}
        pageClassName={styles.page}
        previousLabel={"<"}
        nextLabel={">"}
        renderOnZeroPageCount={null}
        disableInitialCallback={true}
        breakLabel="..."
      />
    </div>
  );
}

export default SliderTariffsFilter;
