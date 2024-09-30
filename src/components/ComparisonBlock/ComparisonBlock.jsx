import { useEffect, useState } from "react";
import styles from "./ComparisonBlock.module.css";
import Image from "next/image";
import trash from "./iconTrash.svg";
import { useDispatch } from "react-redux";
import { openPopUpLead } from "@/redux/reducers/modalSlice";

const ComparisonBlock = () => {
  const [tariffs, setTariffs] = useState([]);
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
    9: "/imgs/providersColor/sibseti.svg",
    10: "/imgs/providersColor/rtk.svg",
  };

  useEffect(() => {
    let tariffsComparison = localStorage.getItem("listComparisons") || "[]";
    setTariffs(JSON.parse(tariffsComparison));

    console.log(tariffs);
  }, []);

  const handleConnectClick = (id) => {
    localStorage.setItem("nameProvider", tariffs[id].provider.name);
    localStorage.setItem("nameTariff", tariffs[id].name);
    localStorage.setItem("priceTariff", tariffs[id].price.split("₽")[0]);
    dispatch(openPopUpLead());
  };

  const handleClickDelete = (id) => {
    let tariffsComparison =
      JSON.parse(localStorage.getItem("listComparisons")) || [];
    const updatedTariffs = tariffsComparison.filter(
      (tariff) => tariff.id !== id
    );
    localStorage.setItem("listComparisons", JSON.stringify(updatedTariffs));
    setTariffs(updatedTariffs);
  };

  if (!tariffs[0])
    return (
      <div className={styles.main}>
        <h1>Сравнение тарифов</h1>
        <h2>Выберите тарифы</h2>
      </div>
    );
  console.log(tariffs);
  return (
    <div className={styles.main}>
      <h1>Сравнение тарифов</h1>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th></th>
              <th>
                <Image
                  src={imgProviders[tariffs[0].provider.id]}
                  width={70}
                  height={70}
                  alt=""
                ></Image>
                <span className={styles.providerName}>
                  {tariffs[0].provider.name}
                </span>
                <Image
                  onClick={() => handleClickDelete(tariffs[0].id)}
                  height={24}
                  width={24}
                  src={trash}
                  alt=""
                  className={styles.trash}
                ></Image>
              </th>
              <th>
                {tariffs[1] ? (
                  <>
                    <Image
                      src={imgProviders[tariffs[1].provider.id]}
                      width={70}
                      height={70}
                      alt=""
                    ></Image>
                    <span className={styles.providerName}>
                      {tariffs[1].provider.name}
                    </span>
                    <Image
                      onClick={() => handleClickDelete(tariffs[1].id)}
                      height={24}
                      width={24}
                      src={trash}
                      alt=""
                      className={styles.trash}
                    ></Image>
                  </>
                ) : (
                  <></>
                )}
              </th>
              <th>
                {tariffs[2] ? (
                  <>
                    <Image
                      src={imgProviders[tariffs[2].provider.id]}
                      width={70}
                      height={70}
                      alt=""
                    ></Image>
                    <span className={styles.providerName}>
                      {tariffs[2].provider.name}
                    </span>
                    <Image
                      onClick={() => handleClickDelete(tariffs[2].id)}
                      height={24}
                      width={24}
                      src={trash}
                      alt=""
                      className={styles.trash}
                    ></Image>
                  </>
                ) : (
                  <></>
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className={styles.blue}>
              <td>Название тарифа</td>
              <td>{tariffs[0].name}</td>

              {tariffs[1] ? <td>{tariffs[1].name}</td> : <td></td>}
              {tariffs[2] ? <td>{tariffs[2].name}</td> : <td></td>}
            </tr>
            <tr>
              <td>Акция</td>
              <td>{tariffs[0].newPrice}</td>
              {tariffs[1] ? <td>{tariffs[1].newPrice}</td> : <td></td>}
              {tariffs[2] ? <td>{tariffs[2].newPrice}</td> : <td></td>}
            </tr>
            <tr className={styles.blue}>
              <td>Абонентская плата без акции</td>
              <td>{tariffs[0].price}</td>
              {tariffs[1] ? <td>{tariffs[1].price}</td> : <td></td>}
              {tariffs[2] ? <td>{tariffs[2].price}</td> : <td></td>}
            </tr>
            <tr>
              <td>Скорость интернета</td>
              <td>{tariffs[0].internet_speed}</td>
              {tariffs[1] ? <td>{tariffs[1].internet_speed}</td> : <td></td>}
              {tariffs[2] ? <td>{tariffs[2].internet_speed}</td> : <td></td>}
            </tr>
            <tr className={styles.blue}>
              <td>Роутер</td>
              <td>{tariffs[0].router_rent}</td>
              {tariffs[1] ? <td>{tariffs[1].router_rent}</td> : <td></td>}
              {tariffs[2] ? <td>{tariffs[2].router_rent}</td> : <td></td>}
            </tr>
            <tr>
              <td>Кол-во каналов</td>
              <td>{tariffs[0].channels}</td>
              {tariffs[1] ? <td>{tariffs[1].channels}</td> : <td></td>}
              {tariffs[2] ? <td>{tariffs[2].channels}</td> : <td></td>}
            </tr>
            <tr className={styles.blue}>
              <td>ТВ приставка</td>
              <td>{tariffs[0].tv_box_rent}</td>
              {tariffs[1] ? <td>{tariffs[1].tv_box_rent}</td> : <td></td>}
              {tariffs[2] ? <td>{tariffs[2].tv_box_rent}</td> : <td></td>}
            </tr>
            <tr>
              <td>Минуты</td>
              <td>{tariffs[0].minutes}</td>
              {tariffs[1] ? <td>{tariffs[1].minutes}</td> : <td></td>}
              {tariffs[2] ? <td>{tariffs[2].minutes}</td> : <td></td>}
            </tr>
            <tr className={styles.blue}>
              <td>СМС</td>
              <td>{tariffs[0].sms}</td>
              {tariffs[1] ? <td>{tariffs[1].sms}</td> : <td></td>}
              {tariffs[2] ? <td>{tariffs[2].sms}</td> : <td></td>}
            </tr>
            <tr>
              <td>Особенности тарифа</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td>
                <button onClick={() => handleConnectClick(0)}>
                  Подключить
                </button>
              </td>
              <td>
                {tariffs[1] ? (
                  <button onClick={() => handleConnectClick(1)}>
                    Подключить
                  </button>
                ) : (
                  <></>
                )}
              </td>
              <td>
                <td>
                  {tariffs[2] ? (
                    <button onClick={() => handleConnectClick(2)}>
                      Подключить
                    </button>
                  ) : (
                    <></>
                  )}
                </td>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComparisonBlock;
