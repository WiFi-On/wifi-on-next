import React from "react";
import styles from "./ParamTariff.module.css";
import { useState } from "react";
import { useEffect } from "react";
import Switcher from "../Switcher/Switcher";
import Image from "next/image";

function ParamTariff({ title, params, img, equipmen = false }) {
  const [rent, setRent] = useState(0);
  const [buy, setBuy] = useState(0);
  const [installment, setInstallment] = useState(0);
  if (equipmen) {
    return (
      <div className={styles.main}>
        <div className={styles.top}>
          <Image
            width={25}
            height={25}
            src={`/imgs/paramsTariff/${img}`}
            alt="Параметр"
          />
          <h2>{title}</h2>
        </div>
        <div className={styles.botEquipment}>
          {params.map((param, i) => (
            <div key={i} className={styles.equipmentPayment}>
              <div className={styles.switcher}>
                <Switcher></Switcher>
                <span>{param.name}</span>
              </div>
              <span className={styles.valueEquipmen}>
                {param.value} {param.value_type}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.main}>
        <div className={styles.top}>
          <Image
            width={25}
            height={25}
            src={`/imgs/paramsTariff/${img}`}
            alt="Параметр"
          />
          <h2>{title}</h2>
        </div>
        <div className={styles.bot}>
          {params.map((param, i) => (
            <div key={i} className={styles.param}>
              <p>{param.name}</p>
              <span>
                {param.value} {param.value_type}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default ParamTariff;
