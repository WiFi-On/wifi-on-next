import styles from "./CardTypeConnect.module.css";
import iconInternet from "./internet.svg";
import iconInternetTV from "./inetTV.svg";
import iconTV from "./tv.svg";
import iconConnection from "./mobile.svg";
import cn from "classnames";
import Image from "next/image";

const CardTypeConnect = (props) => {
  const { device, type } = props;

  switch (type) {
    case "Internet+TV":
      return (
        <div
          className={cn(styles.main, {
            [styles.mainTablet]: device === "tablet",
            [styles.mainMobile]: device === "mobile",
          })}
        >
          <div
            className={cn(styles.wrapperImg, {
              [styles.wrapperImgTablet]: device === "tablet",
              [styles.wrapperImgMobile]: device === "mobile",
            })}
          >
            <Image src={iconInternetTV} alt="" />
          </div>

          <h4>Интернет+ТВ</h4>
        </div>
      );
    case "Internet":
      return (
        <div
          className={cn(styles.main, {
            [styles.mainTablet]: device === "tablet",
            [styles.mainMobile]: device === "mobile",
          })}
        >
          <div
            className={cn(styles.wrapperImg, {
              [styles.wrapperImgTablet]: device === "tablet",
              [styles.wrapperImgMobile]: device === "mobile",
            })}
          >
            <Image src={iconInternet} alt="" />
          </div>

          <h4>Домашний интернет</h4>
        </div>
      );
    case "TV":
      return (
        <div
          className={cn(styles.main, {
            [styles.mainTablet]: device === "tablet",
            [styles.mainMobile]: device === "mobile",
          })}
        >
          <div
            className={cn(styles.wrapperImg, {
              [styles.wrapperImgTablet]: device === "tablet",
              [styles.wrapperImgMobile]: device === "mobile",
            })}
          >
            <Image src={iconTV} alt="" />
          </div>

          <h4>Телевидение</h4>
        </div>
      );
    case "Internet+Connection+TV":
      return (
        <div
          className={cn(styles.main, {
            [styles.mainTablet]: device === "tablet",
            [styles.mainMobile]: device === "mobile",
          })}
        >
          <div
            className={cn(styles.wrapperImg, {
              [styles.wrapperImgTablet]: device === "tablet",
              [styles.wrapperImgMobile]: device === "mobile",
            })}
          >
            <Image src={iconConnection} alt="" />
          </div>
          <h4>Связь+Интернет+ТВ</h4>
        </div>
      );
  }
};

export default CardTypeConnect;
