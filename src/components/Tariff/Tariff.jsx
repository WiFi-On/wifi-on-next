import styles from "./Tariff.module.css";
import ParamTariff from "./ParamTariff/ParamTariff";
import compare from "./imgs/compare.svg";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { openPopUpLead } from "@/redux/reducers/modalSlice";

function Tariff({ tariffInfo }) {
  const [windowWidth, setWindowWidth] = useState(null);
  const dispatch = useDispatch();
  const imgProviders = {
    1: "/imgs/providersColor/ruscom.svg",
    2: "/imgs/providersColor/mts.svg",
    3: "/imgs/providersColor/megafon.svg",
  };

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

  const handleClickComparison = () => {
    const tariffComparison = {
      id: tariffInfo.id,
      name: tariffInfo.name,
      provider: tariffInfo.provider.name,
      imgProvider: tariffInfo.provider.img,
      price: tariffInfo.max_tariff_cost + "₽",
      newPrice: tariffInfo.min_tariff_cost
        ? tariffInfo.min_tariff_cost + "₽"
        : "-",
      internet_speed: tariffInfo.internet_speed
        ? tariffInfo.internet_speed + "Мбит/с"
        : "-",
      router_rent: tariffInfo.router_rent ? tariffInfo.router_rent + "₽" : "-",
      tv_box_rent: tariffInfo.tv_box_rent ? tariffInfo.tv_box_rent + "₽" : "-",
      minutes: tariffInfo.minutes ? tariffInfo.minutes + "мин." : "-",
      channels: tariffInfo.channels_count
        ? tariffInfo.channels_count + "кан."
        : "-",
      sms: tariffInfo.sms ? tariffInfo.sms + "шт." : "-",
    };

    const listComparisons = localStorage.getItem("listComparisons") || "[]";
    const list = JSON.parse(listComparisons);

    if (!list.some((item) => item.id === tariffComparison.id)) {
      if (list.length === 3) {
        list.shift();
      }
      list.push(tariffComparison);
      localStorage.setItem("listComparisons", JSON.stringify(list));
      console.log(list);
    } else {
      console.log("Tariff already exists in comparison list");
    }
  };
  const handleConnectClick = () => {
    localStorage.setItem("nameProvider", tariffInfo.provider.name);
    localStorage.setItem("nameTariff", tariffInfo.name);
    localStorage.setItem(
      "priceTariff",
      tariffInfo.min_tariff_cost
        ? tariffInfo.min_tariff_cost
        : tariffInfo.max_tariff_cost
    );
    dispatch(openPopUpLead());
  };

  if (tariffInfo.provider && windowWidth >= 650) {
    console.log(tariffInfo);
    return (
      <div className={styles.main}>
        <div className={styles.logoAndButton}>
          <div className={styles.logoAndText}>
            <Image
              src={imgProviders[tariffInfo.provider.id]}
              alt=""
              width={70}
              height={70}
            />
            <p>{tariffInfo.provider.name}</p>
          </div>
          <div className={styles.buttons}>
            <Image onClick={handleClickComparison} src={compare} alt="" />
            <button onClick={handleConnectClick}>Подключить</button>
          </div>
        </div>
        <div className={styles.nameAndPrice}>
          <h2>{tariffInfo.name}</h2>
          <div className={styles.priceWrapper}>
            <p className={styles.textPrice}>Абонентская плата</p>
            <p className={styles.price}>
              {tariffInfo.sale_cost ? tariffInfo.sale_cost : tariffInfo.cost}
               ₽/мес
            </p>
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
                ,
                ...(tariffInfo.router_payment
                  ? [
                      {
                        name: "В рассрочку",
                        value: tariffInfo.router_payment,
                        value_type: "мес.",
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
              equipmen={true} // Assuming this is meant to be "equipment"
              params={[
                {
                  name: "В аренду",
                  value: tariffInfo.tv_box_rent,
                  value_type: "₽",
                },
                ...(tariffInfo.tv_box_cost
                  ? [
                      {
                        name: "В собственность (единоразово)",
                        value: tariffInfo.tv_box_cost,
                        value_type: "₽",
                      },
                    ]
                  : []),
                ...(tariffInfo.tv_box_payment
                  ? [
                      {
                        name: "В рассрочку",
                        value: tariffInfo.tv_box_payment,
                        value_type: "мес.",
                      },
                    ]
                  : []),
              ]}
              img="iconTv.svg"
            />
          )}
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
              src={imgProviders[tariffInfo.provider.id]}
              alt=""
              width={70}
              height={70}
            />
            <p>{tariffInfo.provider.name}</p>
          </div>
          <button onClick={handleConnectClick}>Подключить</button>
        </div>
        <div className={styles.nameAndCompareMobile}>
          <h2>{tariffInfo.name}</h2>
          <Image onClick={handleClickComparison} src={compare} alt="" />
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
}

export default Tariff;
