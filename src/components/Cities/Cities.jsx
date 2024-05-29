import styles from "./Cities.module.css";
import { Link } from "react-router-dom";

const Cities = () => {
  return (
    <div className={styles.main}>
      <h2>Наши города</h2>
      <div className={styles.citiesWrapper}>
        <div className={styles.cities}>
          <Link to="/">
            <h4>Москва</h4>
          </Link>
          <Link to="/">
            <h4>Санкт-Петербург</h4>
          </Link>
          <Link to="/">
            <h4>Новосибирск</h4>
          </Link>
          <Link to="/">
            <h4>Екатеринбург</h4>
          </Link>
          <Link to="/">
            <h4>Нижний Новгород</h4>
          </Link>
          <Link to="/">
            <h4>Казань</h4>
          </Link>
          <Link to="/">
            <h4>Самара</h4>
          </Link>
          <Link to="/">
            <h4>Челябинск</h4>
          </Link>
          <Link to="/">
            <h4>Набережные Челны</h4>
          </Link>
          <Link to="/">
            <h4>Ростов-на-Дону</h4>
          </Link>
        </div>
        <div className={styles.cities}>
          <Link to="/">
            <h4>Москва</h4>
          </Link>
          <Link to="/">
            <h4>Санкт-Петербург</h4>
          </Link>
          <Link to="/">
            <h4>Новосибирск</h4>
          </Link>
          <Link to="/">
            <h4>Екатеринбург</h4>
          </Link>
          <Link to="/">
            <h4>Нижний Новгород</h4>
          </Link>
          <Link to="/">
            <h4>Казань</h4>
          </Link>
          <Link to="/">
            <h4>Самара</h4>
          </Link>
          <Link to="/">
            <h4>Челябинск</h4>
          </Link>
          <Link to="/">
            <h4>Набережные Челны</h4>
          </Link>
          <Link to="/">
            <h4>Ростов-на-Дону</h4>
          </Link>
        </div>
        <div className={styles.cities}>
          <Link to="/">
            <h4>Москва</h4>
          </Link>
          <Link to="/">
            <h4>Санкт-Петербург</h4>
          </Link>
          <Link to="/">
            <h4>Новосибирск</h4>
          </Link>
          <Link to="/">
            <h4>Екатеринбург</h4>
          </Link>
          <Link to="/">
            <h4>Нижний Новгород</h4>
          </Link>
          <Link to="/">
            <h4>Казань</h4>
          </Link>
          <Link to="/">
            <h4>Самара</h4>
          </Link>
          <Link to="/">
            <h4>Челябинск</h4>
          </Link>
          <Link to="/">
            <h4>Набережные Челны</h4>
          </Link>
          <Link to="/">
            <h4>Ростов-на-Дону</h4>
          </Link>
        </div>
        <div className={styles.cities}>
          <Link to="/">
            <h4>Москва</h4>
          </Link>
          <Link to="/">
            <h4>Санкт-Петербург</h4>
          </Link>
          <Link to="/">
            <h4>Новосибирск</h4>
          </Link>
          <Link to="/">
            <h4>Екатеринбург</h4>
          </Link>
          <Link to="/">
            <h4>Нижний Новгород</h4>
          </Link>
          <Link to="/">
            <h4>Казань</h4>
          </Link>
          <Link to="/">
            <h4>Самара</h4>
          </Link>
          <Link to="/">
            <h4>Челябинск</h4>
          </Link>
          <Link to="/">
            <h4>Набережные Челны</h4>
          </Link>
          <Link to="/">
            <h4>Ростов-на-Дону</h4>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cities;
