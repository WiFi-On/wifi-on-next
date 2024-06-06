import styles from "./Cities.module.css";
import Link from "next/link";

const Cities = () => {
  return (
    <div className={styles.main}>
      <h2>Наши города</h2>
      <div className={styles.citiesWrapper}>
        <div className={styles.cities}>
          <Link href="/Moskva">
            <h4>Москва</h4>
          </Link>
          <Link href="/Sankt-Peterburg">
            <h4>Санкт-Петербург</h4>
          </Link>
          <Link href="/Novosibirsk">
            <h4>Новосибирск</h4>
          </Link>
          <Link href="/Ekaterinburg">
            <h4>Екатеринбург</h4>
          </Link>
          <Link href="/Nizhnij_Novgorod">
            <h4>Нижний Новгород</h4>
          </Link>
          <Link href="/Kazan">
            <h4>Казань</h4>
          </Link>
          <Link href="/Samara">
            <h4>Самара</h4>
          </Link>
          <Link href="/Cheljabinsk">
            <h4>Челябинск</h4>
          </Link>
          <Link href="/Naberezhnye_Chelny">
            <h4>Набережные Челны</h4>
          </Link>
          <Link href="/Rostov-na-Donu">
            <h4>Ростов-на-Дону</h4>
          </Link>
        </div>
        <div className={styles.cities}>
          <Link href="/Ufa">
            <h4>Уфа</h4>
          </Link>
          <Link href="/Krasnouralsk">
            <h4>Красноярск</h4>
          </Link>
          <Link href="/Perm">
            <h4>Пермь</h4>
          </Link>
          <Link href="/Moskva">
            <h4>Волгоград</h4>
          </Link>
          <Link href="/Voronezh">
            <h4>Воронеж</h4>
          </Link>
          <Link href="/Saratov">
            <h4>Саратов</h4>
          </Link>
          <Link href="/Moskva">
            <h4>Краснодар</h4>
          </Link>
          <Link href="/Toljatti">
            <h4>Тольятти</h4>
          </Link>
          <Link href="/Tjumen">
            <h4>Тюмень</h4>
          </Link>
          <Link href="/Izhevsk">
            <h4>Ижевск</h4>
          </Link>
        </div>
        <div className={styles.cities}>
          <Link href="/Barnaul">
            <h4>Барнаул</h4>
          </Link>
          <Link href="/Uljanovsk">
            <h4>Ульяновск</h4>
          </Link>
          <Link href="/Moskva">
            <h4>Иркутск</h4>
          </Link>
          <Link href="/Vladivostok">
            <h4>Владивосток</h4>
          </Link>
          <Link href="/Moskva">
            <h4>Ярославль</h4>
          </Link>
          <Link href="/Habarovsk">
            <h4>Хабаровск</h4>
          </Link>
          <Link href="/Mahachkala">
            <h4>Махачкала</h4>
          </Link>
          <Link href="/Orenburg">
            <h4>Оренбург</h4>
          </Link>
          <Link href="/Tomsk">
            <h4>Томск</h4>
          </Link>
          <Link href="/Novokuznetsk">
            <h4>Новокузнецк</h4>
          </Link>
        </div>
        <div className={styles.cities}>
          <Link href="/Kemerovo">
            <h4>Кемерово</h4>
          </Link>
          <Link href="/Astrahan">
            <h4>Астрахань</h4>
          </Link>
          <Link href="/Moskva">
            <h4>Рязань</h4>
          </Link>
          <Link href="/Kaliningrad">
            <h4>Калининград</h4>
          </Link>
          <Link href="/Penza">
            <h4>Пенза</h4>
          </Link>
          <Link href="/Lipetsk">
            <h4>Липецк</h4>
          </Link>
          <Link href="/Tula">
            <h4>Тула</h4>
          </Link>
          <Link href="/Moskva">
            <h4>Киров</h4>
          </Link>
          <Link href="/Cheboksary">
            <h4>Чебоксары</h4>
          </Link>
          <Link href="/Omsk">
            <h4>Омск</h4>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cities;
