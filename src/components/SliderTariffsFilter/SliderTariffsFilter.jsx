import React, { useState, useEffect } from "react";
import styles from "./SliderTariffsFilter.module.css";
import CardTariff from "../CardTariff/CardTariff";
import ReactPaginate from "react-paginate";
import { useRouter } from "next/router";
import NotTariffs from "../NotTariffs/NotTariffs";

function SliderTariffsFilter({ allTariffs, loading = true }) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0);
  const [filteredTariffs, setFilteredTariffs] = useState(allTariffs);
  const tariffsPerPage = 16; // Количество тарифов на одной странице

  useEffect(() => {
    const {
      providers,
      connectType,
      discount,
      freeConnection,
      priceRange,
      speedRange,
    } = router.query;
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
      if (typeTariffIds.includes(1)) {
        filtered = filtered.filter((tariff) => tariff.internet_speed);
      }
      if (typeTariffIds.includes(2)) {
        filtered = filtered.filter((tariff) => tariff.channels_count);
      }
      if (typeTariffIds.includes(3)) {
        filtered = filtered.filter((tariff) => tariff.minutes);
      }
    }
    if (discount) {
      filtered = filtered.filter((tariff) => tariff.sale_cost);
    }
    if (freeConnection) {
      filtered = filtered.filter((tariff) => !tariff.connection_cost);
    }
    if (priceRange) {
      const [minPrice, maxPrice] = priceRange.split("-");
      filtered = filtered.filter(
        (tariff) =>
          tariff.cost >= parseInt(minPrice, 10) &&
          tariff.cost <= parseInt(maxPrice, 10)
      );
    }
    if (speedRange) {
      const [minSpeed, maxSpeed] = speedRange.split("-");
      filtered = filtered.filter(
        (tariff) =>
          tariff.internet_speed >= parseInt(minSpeed, 10) &&
          tariff.internet_speed <= parseInt(maxSpeed, 10)
      );
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
        marginPagesDisplayed={0}
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
