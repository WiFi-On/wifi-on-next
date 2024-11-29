import styles from "./Cities.module.css";
import Link from "next/link";

const Cities = () => {
  return (
    <div className={styles.main}>
      <h2>Наши города</h2>
      <div className={styles.citiesWrapper}>
        <div className={styles.container}>
          <div className={styles.cities}>
            <Link href="/Moscow">
              <p>Москва</p>
            </Link>
            <Link href="/Saint-Petersburg">
              <p>Санкт-Петербург</p>
            </Link>
            <Link href="/Novosibirsk">
              <p>Новосибирск</p>
            </Link>
            <Link href="/Yekaterinburg">
              <p>Екатеринбург</p>
            </Link>
            <Link href="/NizhnyNovgorod">
              <p>Нижний Новгород</p>
            </Link>
            <Link href="/Kazan">
              <p>Казань</p>
            </Link>
            <Link href="/Samara">
              <p>Самара</p>
            </Link>
            <Link href="/Chelyabinsk">
              <p>Челябинск</p>
            </Link>
            <Link href="/NaberezhnyeChelny">
              <p>Набережные Челны</p>
            </Link>
            <Link href="/Rostov-on-Don">
              <p>Ростов-на-Дону</p>
            </Link>
          </div>
          <div className={styles.cities}>
            <Link href="/Ufa">
              <p>Уфа</p>
            </Link>
            <Link href="/Krasnoyarsk">
              <p>Красноярск</p>
            </Link>
            <Link href="/Perm">
              <p>Пермь</p>
            </Link>
            <Link href="/Volgograd">
              <p>Волгоград</p>
            </Link>
            <Link href="/Voronezh">
              <p>Воронеж</p>
            </Link>
            <Link href="/Saratov">
              <p>Саратов</p>
            </Link>
            <Link href="/Krasnodar">
              <p>Краснодар</p>
            </Link>
            <Link href="/Tobolsk">
              <p>Тобольск</p>
            </Link>
            <Link href="/Tyumen">
              <p>Тюмень</p>
            </Link>
            <Link href="/Izhevsk">
              <p>Ижевск</p>
            </Link>
          </div>
        </div>
        <div className={styles.container}>
          {" "}
          <div className={styles.cities}>
            <Link href="/Barnaul">
              <p>Барнаул</p>
            </Link>
            <Link href="/Ulyanovsk">
              <p>Ульяновск</p>
            </Link>
            <Link href="/Pervomaysky.g-Irkutsk">
              <p>Иркутск</p>
            </Link>
            <Link href="/Vladivostok">
              <p>Владивосток</p>
            </Link>
            <Link href="/Yaroslavl">
              <p>Ярославль</p>
            </Link>
            <Link href="/Khabarovsk">
              <p>Хабаровск</p>
            </Link>
            <Link href="/Magadan">
              <p>Магадан</p>
            </Link>
            <Link href="/Orenburg">
              <p>Оренбург</p>
            </Link>
            <Link href="/Tomsk">
              <p>Томск</p>
            </Link>
            <Link href="/Central.g-Novokuznetsk">
              <p>Новокузнецк</p>
            </Link>
          </div>
          <div className={styles.cities}>
            <Link href="/Kemerovo">
              <p>Кемерово</p>
            </Link>
            <Link href="/Astrakhan">
              <p>Астрахань</p>
            </Link>
            <Link href="/Ryazan">
              <p>Рязань</p>
            </Link>
            <Link href="/Kaliningrad">
              <p>Калининград</p>
            </Link>
            <Link href="/Penza">
              <p>Пенза</p>
            </Link>
            <Link href="/Lipetsk">
              <p>Липецк</p>
            </Link>
            <Link href="/Tula">
              <p>Тула</p>
            </Link>
            <Link href="/Kirov">
              <p>Киров</p>
            </Link>
            <Link href="/Cheboksary">
              <p>Чебоксары</p>
            </Link>
            <Link href="/Omsk">
              <p>Омск</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cities;
