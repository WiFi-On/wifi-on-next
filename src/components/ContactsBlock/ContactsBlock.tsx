import React from "react";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import styles from "./ContactsBlock.module.css";
import geo from "./imgs/geo.png";
import tel from "./imgs/tel.png";
import Image from "next/image";
import { Link as ScrollLink } from "react-scroll";

const ContactsBlock = () => {
  return (
    <YMaps>
      <div className={styles.main}>
        <h2>Контакты</h2>
        <div className={styles.infos}>
          <div className={styles.info}>
            <Image src={geo} alt=""></Image>
            <div className={styles.text}>
              <p>Адрес</p>
              <p>г. Москва, улица Коровий Вал, 5</p>
            </div>
          </div>
          <div className={styles.info}>
            <Image src={tel} alt="" />
            <div className={styles.text}>
              <p>Телефон для подключения</p>
              <a href="tel:+78003332450">+7 (800) 333-24-50</a>
            </div>
            <ScrollLink to="help" smooth={true} duration={700} offset={-200}>
              <button className={styles.button}>Заказать звонок</button>
            </ScrollLink>
          </div>
        </div>
        <Map
          height={"500px"}
          width={"100%"}
          defaultState={{
            center: [55.729098, 37.620285],
            zoom: 16,
            controls: ["zoomControl", "fullscreenControl"],
          }}
          modules={["control.ZoomControl", "control.FullscreenControl"]}
        >
          <Placemark defaultGeometry={[55.729098, 37.620285]} />
        </Map>
      </div>
    </YMaps>
  );
};

export default ContactsBlock;
