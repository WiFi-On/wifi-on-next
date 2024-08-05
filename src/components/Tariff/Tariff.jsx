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
    4: "/imgs/providersColor/ttk.svg",
    5: "/imgs/providersColor/almatel.svg",
    6: "/imgs/providersColor/avatell.svg",
    7: "/imgs/providersColor/beeline.svg",
    8: "/imgs/providersColor/domru.svg",
  };
  const [compareTariffsIds, setCompareTariffsIds] = useState([]);

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
      provider: tariffInfo.provider,
      price: tariffInfo.cost + "₽",
      newPrice: tariffInfo.sale_cost ? tariffInfo.sale_cost + "₽" : "-",
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

    // Проверка, есть ли уже тариф в списке
    const exists = list.some((item) => item.id === tariffComparison.id);

    let updatedList;
    if (exists) {
      // Если тариф уже есть, удаляем его из списка
      updatedList = list.filter((item) => item.id !== tariffComparison.id);
    } else {
      // Если тариф отсутствует, добавляем его
      updatedList = [...list, tariffComparison];
    }

    // Если список превышает 3 элемента, удаляем первый
    if (updatedList.length > 3) {
      updatedList.shift(); // удаляет первый элемент из массива
    }

    localStorage.setItem("listComparisons", JSON.stringify(updatedList));

    // Обновляем состояние compareTariffsIds
    setCompareTariffsIds(updatedList.map((item) => item.id));
  };
  const handleConnectClick = () => {
    localStorage.setItem("nameProvider", tariffInfo.provider.name);
    localStorage.setItem("nameTariff", tariffInfo.name);
    localStorage.setItem(
      "priceTariff",
      tariffInfo.sale_cost ? tariffInfo.sale_cost : tariffInfo.cost
    );
    dispatch(openPopUpLead());
  };

  useEffect(() => {
    const listComparisons = localStorage.getItem("listComparisons") || "[]";
    const list = JSON.parse(listComparisons);
    setCompareTariffsIds(list.map((item) => item.id));
  }, []);
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
            <svg
              width="23"
              height="25"
              viewBox="0 0 23 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke={
                compareTariffsIds.includes(tariffInfo.id)
                  ? "#5685f5"
                  : "#545454"
              }
              onClick={handleClickComparison}
            >
              <rect
                x="0.912893"
                y="1.28753"
                width="21.7"
                height="22.425"
                rx="3.48752"
                strokeWidth="0.775005"
              />
              <line
                x1="5.98907"
                y1="15.0627"
                x2="5.98907"
                y2="19.3627"
                strokeWidth="0.775005"
                strokeLinecap="round"
              />
              <line
                x1="11.0652"
                y1="4.91253"
                x2="11.0652"
                y2="19.3625"
                strokeWidth="0.775005"
                strokeLinecap="round"
              />
              <line
                x1="16.1375"
                y1="9.2625"
                x2="16.1375"
                y2="19.3625"
                strokeWidth="0.775005"
                strokeLinecap="round"
              />
            </svg>
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
          <svg
            width="23"
            height="25"
            viewBox="0 0 23 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke={
              compareTariffsIds.includes(tariffInfo.id) ? "#5685f5" : "#545454"
            }
            onClick={handleClickComparison}
          >
            <rect
              x="0.912893"
              y="1.28753"
              width="21.7"
              height="22.425"
              rx="3.48752"
              strokeWidth="0.775005"
            />
            <line
              x1="5.98907"
              y1="15.0627"
              x2="5.98907"
              y2="19.3627"
              strokeWidth="0.775005"
              strokeLinecap="round"
            />
            <line
              x1="11.0652"
              y1="4.91253"
              x2="11.0652"
              y2="19.3625"
              strokeWidth="0.775005"
              strokeLinecap="round"
            />
            <line
              x1="16.1375"
              y1="9.2625"
              x2="16.1375"
              y2="19.3625"
              strokeWidth="0.775005"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div className={styles.twoTextMobile}>
          <p className={styles.textPriceMobile}>Абонентская плата</p>
          <p className={styles.priceMobile}>{tariffInfo.cost} ₽/мес</p>
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
        </div>
      </div>
    );
  }
}

export default Tariff;
