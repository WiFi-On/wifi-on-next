import styles from "./CardTypeConnect.module.css";
import iconInternet from "./internet.svg";
import iconInternetTV from "./inetTV.svg";
import iconTV from "./tv.svg";
import iconConnection from "./mobile.svg";
import cn from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const CardTypeConnect = (props) => {
  const { device, type } = props;
  const router = useRouter();
  const { city } = router.query;

  switch (type) {
    case "Internet+TV":
      return (
        <Link
          href={`${city}/tariffs?connectType=1,2`}
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
            <Image fetchPriority="high" src={iconInternetTV} alt="" />
          </div>

          <h4>Интернет+ТВ</h4>
        </Link>
      );
    case "Internet":
      return (
        <Link
          href={`${city}/tariffs?connectType=1`}
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
            <Image fetchPriority="high" src={iconInternet} alt="" />
          </div>

          <h4>Домашний интернет</h4>
        </Link>
      );
    case "TV":
      return (
        <Link
          href={`${city}/tariffs?connectType=1,3`}
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
            <Image fetchPriority="high" src={iconTV} alt="" />
          </div>

          <h4>Интернет+Связь</h4>
        </Link>
      );
    case "Internet+Connection+TV":
      return (
        <Link
          href={`${city}/tariffs?connectType=1,2,3`}
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
            <Image fetchPriority="high" src={iconConnection} alt="" />
          </div>
          <h4>Связь+Интернет+ТВ</h4>
        </Link>
      );
  }
};

export default CardTypeConnect;
