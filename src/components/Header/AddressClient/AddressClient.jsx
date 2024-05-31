import iconVectorWhite from "./iconVectorWhite.svg";
import iconVectorBlack from "./iconVectorBlack.svg";
import cn from "classnames";
import styles from "./AddressClient.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";

const AddressClient = ({ mobile }) => {
  const [address, setAddress] = useState("Ваш адрес");
  const addressStorage = localStorage.getItem("address");

  useEffect(() => {
    if (addressStorage) {
      setAddress(addressStorage);
    }
  }, [addressStorage]);

  return (
    <div
      className={cn(styles.main, {
        [styles.colorMobile]: mobile,
        [styles.colorDesk]: !mobile,
      })}
    >
      {mobile ? (
        <Image className="" src={iconVectorBlack} alt="" />
      ) : (
        <Image className="" src={iconVectorWhite} alt="" />
      )}
      <span className={styles.address}>{address}</span>
    </div>
  );
};

export default AddressClient;
