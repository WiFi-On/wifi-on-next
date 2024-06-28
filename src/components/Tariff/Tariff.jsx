import styles from "./Tariff.module.css";
import ParamTariff from "./ParamTariff/ParamTariff";
import compare from "./imgs/compare.svg";
import Image from "next/image";
import { useEffect, useState } from "react";

function Tariff({ tariffInfo }) {
  const [windowWidth, setWindowWidth] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (tariffInfo.provider && windowWidth >= 650) {
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
            <p className={styles.price}>{tariffInfo.max_tariff_cost} ₽/мес</p>
          </div>
        </div>
        <div className={styles.params}>
          {tariffInfo.internet_speed && (
            <ParamTariff
              title="Домашний интернет"
              params={[
                {
                  name: "Скорость",
                  value: tariffInfo.internet_speed,
                  value_type: "Мбит/с",
                },
              ]}
              img="iconInternet.svg"
            />
          )}
          {tariffInfo.channels_count && (
            <ParamTariff
              title="ТВ"
              params={[
                {
                  name: "Кол-во каналов",
                  value: tariffInfo.channels_count,
                  value_type: "каналов",
                },
              ]}
              img="iconTv.svg"
            />
          )}
          {tariffInfo.minutes && (
            <ParamTariff
              title="Мобильная связь"
              params={[
                {
                  name: "Кол-во минут",
                  value: tariffInfo.minutes,
                  value_type: "каналов",
                },
                ...(tariffInfo.gigabytes
                  ? [
                      {
                        name: "Мобильный интернет",
                        value: tariffInfo.gigabytes,
                        value_type: "Гб.",
                      },
                    ]
                  : []),
                ...(tariffInfo.sms
                  ? [
                      {
                        name: "Мобильный интернет",
                        value: tariffInfo.sms,
                        value_type: "шт.",
                      },
                    ]
                  : []),
              ]}
              img="iconMob.svg"
            />
          )}
          {tariffInfo.connection_cost && (
            <ParamTariff
              title="Стоимость подключения"
              params={[
                {
                  name: "Стоимость подключения (единоразово)",
                  value: tariffInfo.connection_cost,
                  value_type: "₽",
                },
              ]}
              img="iconWallet.svg"
            />
          )}
          {tariffInfo.router_rent && (
            <ParamTariff
              title="Wi-Fi роутер"
              equipmen={true}
              params={[
                {
                  name: "В аренду",
                  value: tariffInfo.router_rent,
                  value_type: "₽",
                },
                ...(tariffInfo.router_cost
                  ? [
                      {
                        name: "В собственность (единоразово)",
                        value: tariffInfo.router_cost,
                        value_type: "₽",
                      },
                    ]
                  : []),
              ]}
              img="iconWifi.svg"
            />
          )}
          {tariffInfo.tv_box_rent && (
            <ParamTariff
              title="ТВ приставка"
              equipmen={true}
              params={[
                {
                  name: "В аренду",
                  value: tariffInfo.tv_box_rent,
                  value_type: "₽",
                },
                ...(tariffInfo.tv_box_cost
                  ? [
                      {
                        name: "В собственность (единоразово)",
                        value: tariffInfo.tv_box_cost,
                        value_type: "₽",
                      },
                    ]
                  : []),
              ]}
              img="iconTv.svg"
            />
          )}

          {/* <ParamTariff
            key={i}
            title={param.name}
            params={param.params}
            img={param.img}
            equipmen={true}
          />

          <ParamTariff
            key={i}
            title={param.name}
            params={param.params}
            img={param.img}
          /> */}
        </div>
      </div>
    );
  } else {
    console.log(tariffInfo);
    return (
      <div className={styles.mainMobile}>
        <div className={styles.logoAndButtonMobile}>
          <div className={styles.logoAndTextMobile}>
            <Image
              src={`/imgs/providersColor/${tariffInfo.provider.img}`}
              alt=""
              width={70}
              height={70}
            />
            <p>{tariffInfo.provider.name}</p>
          </div>
          <button>Подключить</button>
        </div>
        <div className={styles.nameAndCompareMobile}>
          <h2>{tariffInfo.name}</h2>
          <Image src={compare} alt="" />
        </div>
        <div className={styles.twoTextMobile}>
          <p className={styles.textPriceMobile}>Абонентская плата</p>
          <p className={styles.priceMobile}>
            {tariffInfo.max_tariff_cost} ₽/мес
          </p>
        </div>
        <div className={styles.paramsMobile}>
          {tariffInfo.internet_speed && (
            <ParamTariff
              title="Домашний интернет"
              params={[
                {
                  name: "Скорость",
                  value: tariffInfo.internet_speed,
                  value_type: "Мбит/с",
                },
              ]}
              img="iconInternet.svg"
            />
          )}
          {tariffInfo.channels_count && (
            <ParamTariff
              title="ТВ"
              params={[
                {
                  name: "Кол-во каналов",
                  value: tariffInfo.channels_count,
                  value_type: "каналов",
                },
              ]}
              img="iconTv.svg"
            />
          )}
          {tariffInfo.minutes && (
            <ParamTariff
              title="Мобильная связь"
              params={[
                {
                  name: "Кол-во минут",
                  value: tariffInfo.minutes,
                  value_type: "каналов",
                },
                ...(tariffInfo.gigabytes
                  ? [
                      {
                        name: "Мобильный интернет",
                        value: tariffInfo.gigabytes,
                        value_type: "Гб.",
                      },
                    ]
                  : []),
                ...(tariffInfo.sms
                  ? [
                      {
                        name: "Мобильный интернет",
                        value: tariffInfo.sms,
                        value_type: "шт.",
                      },
                    ]
                  : []),
              ]}
              img="iconMob.svg"
            />
          )}
          {tariffInfo.connection_cost && (
            <ParamTariff
              title="Стоимость подключения"
              params={[
                {
                  name: "Стоимость подключения (единоразово)",
                  value: tariffInfo.connection_cost,
                  value_type: "₽",
                },
              ]}
              img="iconWallet.svg"
            />
          )}
          {tariffInfo.router_rent && (
            <ParamTariff
              title="Wi-Fi роутер"
              equipmen={true}
              params={[
                {
                  name: "В аренду",
                  value: tariffInfo.router_rent,
                  value_type: "₽",
                },
                ...(tariffInfo.router_cost
                  ? [
                      {
                        name: "В собственность (единоразово)",
                        value: tariffInfo.router_cost,
                        value_type: "₽",
                      },
                    ]
                  : []),
              ]}
              img="iconWifi.svg"
            />
          )}
          {tariffInfo.tv_box_rent && (
            <ParamTariff
              title="ТВ приставка"
              equipmen={true}
              params={[
                {
                  name: "В аренду",
                  value: tariffInfo.tv_box_rent,
                  value_type: "₽",
                },
                ...(tariffInfo.tv_box_cost
                  ? [
                      {
                        name: "В собственность (единоразово)",
                        value: tariffInfo.tv_box_cost,
                        value_type: "₽",
                      },
                    ]
                  : []),
              ]}
              img="iconTv.svg"
            />
          )}

          {/* <ParamTariff
            key={i}
            title={param.name}
            params={param.params}
            img={param.img}
            equipmen={true}
          />

          <ParamTariff
            key={i}
            title={param.name}
            params={param.params}
            img={param.img}
          /> */}
        </div>
      </div>
    );
  }

  return null;
}

export default Tariff;
