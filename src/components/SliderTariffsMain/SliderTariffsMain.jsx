import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardTariff from "../CardTariff/CardTariff";
import styles from "./SliderTariffsMain.module.css";
import cn from "classnames";
import { useRouter } from "next/router";

const SliderTariffsMain = ({ tariffs, nameCityWhere }) => {
  const router = useRouter();
  const { city } = router.query;
  const [htmlWidth, setHtmlWidth] = useState(null);
  const sliderRef = useRef(null);

  const next = () => {
    sliderRef.current.slickNext();
  };

  const previous = () => {
    sliderRef.current.slickPrev();
  };

  useEffect(() => {
    const handleResize = (entries) => {
      for (let entry of entries) {
        setHtmlWidth(entry.contentRect.width);
      }
    };

    const observer = new ResizeObserver(handleResize);
    observer.observe(document.documentElement); // Наблюдение за элементом <html>

    return () => {
      observer.disconnect();
    };
  }, []);

  const getSettings = () => {
    if (htmlWidth > 1300) {
      return {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true,
      };
    } else if (htmlWidth < 1301 && htmlWidth >= 978) {
      return {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true,
      };
    } else if (htmlWidth <= 977 && htmlWidth >= 654) {
      return {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true,
      };
    } else {
      return {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true,
      };
    }
  };

  return (
    <div
      className={cn(
        styles.main,
        htmlWidth > 1300
          ? styles.main4Elements
          : htmlWidth < 1301 && htmlWidth >= 978
          ? styles.main3Elements
          : htmlWidth <= 977 && htmlWidth >= 654
          ? styles.main2Elements
          : styles.main1Elements
      )}
    >
      <h2>Популярные тарифы в {nameCityWhere}</h2>
      <Slider ref={sliderRef} {...getSettings()} className={styles.slider}>
        {tariffs.map((tariff) => (
          <div className={styles.element} key={tariff.id}>
            <CardTariff tariff={tariff}></CardTariff>
          </div>
        ))}
      </Slider>
      <div className={styles.buttons}>
        <svg
          width="55"
          height="55"
          viewBox="0 0 55 55"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={previous}
        >
          <path
            d="M1 27.5C1 12.8645 12.8645 1 27.5 1C42.1355 1 54 12.8645 54 27.5C54 42.1355 42.1355 54 27.5 54C12.8645 54 1 42.1355 1 27.5Z"
            fill="white"
            stroke="url(#paint0_linear_336_737)"
            strokeWidth="2"
          />
          <path
            d="M30.9577 18.0713L21.2148 28.1889L30.9577 38.4697"
            stroke="url(#paint1_linear_336_737)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <defs>
            <linearGradient
              id="paint0_linear_336_737"
              x1="-13.9108"
              y1="54.7207"
              x2="64.3673"
              y2="45.4439"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#284FDC" />
              <stop offset="1" stopColor="#578FEC" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_336_737"
              x1="18.8301"
              y1="39.1779"
              x2="32.4001"
              y2="38.4631"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#284FDC" />
              <stop offset="1" stopColor="#578FEC" />
            </linearGradient>
          </defs>
        </svg>
        <button
          onClick={() => router.push(`/${city}/tariffs`)}
          className={styles.button}
        >
          Все тарифы
        </button>
        <svg
          width="55"
          height="55"
          viewBox="0 0 55 55"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={next}
        >
          <path
            d="M54 27.5C54 12.8645 42.1355 1 27.5 1C12.8645 1 1 12.8645 1 27.5C1 42.1355 12.8645 54 27.5 54C42.1355 54 54 42.1355 54 27.5Z"
            fill="white"
            stroke="url(#paint0_linear_399_2383)"
            strokeWidth="2"
          />
          <path
            d="M22.472 18.0713L32.2148 28.1889L22.472 38.4696"
            stroke="url(#paint1_linear_399_2383)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <defs>
            <linearGradient
              id="paint0_linear_399_2383"
              x1="68.9108"
              y1="54.7207"
              x2="-9.36726"
              y2="45.4439"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#284FDC" />
              <stop offset="1" stopColor="#578FEC" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_399_2383"
              x1="34.5996"
              y1="39.1779"
              x2="21.0296"
              y2="38.4631"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#284FDC" />
              <stop offset="1" stopColor="#578FEC" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default SliderTariffsMain;
