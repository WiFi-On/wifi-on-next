import styles from "./CardTariff.module.css";
import Link from "next/link";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { openPopUpLead } from "@/redux/reducers/modalSlice";

const CardTariff = ({ tariff }) => {
  const dispatch = useDispatch();

  const handleConnectClick = () => {
    localStorage.setItem("nameProvider", tariff.provider.name);
    localStorage.setItem("nameTariff", tariff.name);
    localStorage.setItem(
      "priceTariff",
      tariff.newprice ? tariff.newprice : tariff.price
    );
    dispatch(openPopUpLead());
  };

  if (!tariff) return <div>Loading...</div>;
  console.log(tariff);
  return (
    <div className={styles.main}>
      <div className={styles.logoAndName}>
        <Image
          src={`/imgs/cardTariff/providers/${tariff.provider.img}`}
          alt=""
          width={50}
          height={50}
        />
        <span>{tariff.provider.name}</span>
      </div>
      <p className={styles.nameTariff}>{tariff.name}</p>
      <div className={styles.params}>
        {tariff.params.map((paramMain, i) => (
          <div key={i} className={styles.param}>
            <div className={styles.wrapperImgParam}>
              <Image
                src={`/imgs/cardTariff/params/${paramMain.img}`}
                alt=""
                width={20}
                height={20}
              />
            </div>
            <div className={styles.paramText}>
              <p>{paramMain.name}</p>
              <p>
                {paramMain.params[0].name} {paramMain.params[0].value}{" "}
                {paramMain.params[0].value_type}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.detailsAndComparison}>
        <div className={styles.buttonDetails}>
          <Link href={`/Moskva/${tariff.id}`}>Подробнее о тарифе</Link>
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="#fff"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.5972 1.69401L6.93623 4.80743C7.00947 4.87536 7.05054 4.96706 7.05054 5.06262C7.05054 5.15818 7.00947 5.24988 6.93623 5.31781L3.59792 8.43124C3.52473 8.49959 3.48371 8.59159 3.48371 8.68742C3.48371 8.78325 3.52473 8.87525 3.59792 8.9436C3.63368 8.97726 3.67641 9.00401 3.72361 9.02228C3.77081 9.04054 3.82151 9.04995 3.87273 9.04995C3.92396 9.04995 3.97466 9.04054 4.02186 9.02228C4.06905 9.00401 4.11179 8.97726 4.14755 8.9436L7.48586 5.83084C7.70522 5.62581 7.82812 5.34996 7.82812 5.06262C7.82812 4.77528 7.70522 4.49943 7.48586 4.2944L4.14755 1.18164C4.11178 1.14788 4.069 1.12104 4.02173 1.10272C3.97447 1.08439 3.92368 1.07495 3.87237 1.07495C3.82106 1.07495 3.77027 1.08439 3.72301 1.10272C3.67575 1.12104 3.63296 1.14788 3.5972 1.18164C3.524 1.24999 3.48299 1.34199 3.48299 1.43782C3.48299 1.53366 3.524 1.62566 3.5972 1.69401Z"
              fill="url(#paint0_linear_556_4282)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_556_4282"
                x1="3.50505"
                y1="-0.942118"
                x2="5.89549"
                y2="10.0477"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#284FDC" />
                <stop offset="1" stopColor="#578FEC" />
              </linearGradient>
              <clipPath id="clip0_556_4282">
                <rect
                  width="9.425"
                  height="9.41446"
                  fill="white"
                  transform="translate(10 0.349976) rotate(90)"
                />
              </clipPath>
            </defs>
          </svg>
        </div>
        <svg
          width="23"
          height="25"
          viewBox="0 0 23 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0.912893"
            y="1.28753"
            width="21.7"
            height="22.425"
            rx="3.48752"
            stroke="#545454"
            strokeWidth="0.775005"
          />
          <line
            x1="5.98907"
            y1="15.0627"
            x2="5.98907"
            y2="19.3627"
            stroke="#545454"
            strokeWidth="0.775005"
            strokeLinecap="round"
          />
          <line
            x1="11.0652"
            y1="4.91253"
            x2="11.0652"
            y2="19.3625"
            stroke="#545454"
            strokeWidth="0.775005"
            strokeLinecap="round"
          />
          <line
            x1="16.1375"
            y1="9.2625"
            x2="16.1375"
            y2="19.3625"
            stroke="#545454"
            strokeWidth="0.775005"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div className={styles.priceAndButton}>
        <div className={styles.wrapperPrices}>
          <p>Абонентская плата</p>
          <div className={styles.prices}>
            <span className={styles.newPrice}>
              {tariff.newprice ? tariff.newprice : tariff.price}
            </span>
            <div className={styles.oldPriceContainer}>
              <span className={styles.oldPrice}>
                {tariff.newprice ? tariff.price : ""}
              </span>
              <span className={styles.rubles}>₽/мес</span>
            </div>
          </div>
        </div>
        <button className={styles.buttonConnect} onClick={handleConnectClick}>
          Подключить
        </button>
      </div>
    </div>
  );
};

export default CardTariff;
