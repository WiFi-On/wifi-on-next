import styles from "./Tariff.module.css";
import ParamTariff from "./ParamTariff/ParamTariff";
import compare from "./imgs/compare.svg";
import Image from "next/image";

function Tariff({ tariffInfo }) {
  if (tariffInfo.provider) {
    console.log(tariffInfo);
    return (
      <div className={styles.main}>
        <div className={styles.logoAndButton}>
          <div className={styles.logoAndText}>
            <Image
              src={`/imgs/providersColor/${tariffInfo.provider.img}`}
              alt=""
              width={70}
              height={70}
            />
            <p>{tariffInfo.provider.name}</p>
          </div>
          <div className={styles.buttons}>
            <Image src={compare} alt="" />
            <button>Подключить</button>
          </div>
        </div>
        <div className={styles.nameAndPrice}>
          <h2>{tariffInfo.name}</h2>
          <div className={styles.priceWrapper}>
            <p className={styles.textPrice}>Абонентская плата</p>
            <p className={styles.price}>{tariffInfo.price} ₽/мес</p>
          </div>
        </div>
        <div className={styles.params}>
          {tariffInfo.params.map((param, i) => {
            console.log(param);
            if (param.name == "Wi-Fi Роутер" || param.name == "ТВ приставка") {
              return (
                <ParamTariff
                  key={i}
                  title={param.name}
                  params={param.params}
                  img={param.img}
                  equipmen={true}
                />
              );
            } else {
              return (
                <ParamTariff
                  key={i}
                  title={param.name}
                  params={param.params}
                  img={param.img}
                />
              );
            }
          })}
        </div>
      </div>
    );
  }

  return null;
}

export default Tariff;
