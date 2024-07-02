import iconCross from "./iconCross.svg";
import styles from "./HamburgerMenu.module.css";
import Nav from "../Nav/Nav";
import ComparisonButton from "../Comparison/ComparisonButton";
import iconLogo from "../iconLogo.png";
import Link from "next/link";
import AddressClient from "../AddressClient/AddressClient";
import cn from "classnames";
import Image from "next/image";

const HamburgerMenu = (props) => {
  const { isOpen, onClose, mobile } = props;
  return (
    <div className={styles.main}>
      <div className={styles.logoAndCross}>
        <Link href="/">
          <Image src={iconLogo} alt="" />
        </Link>
        <Image
          className={styles.cross}
          onClick={onClose}
          src={iconCross}
          alt=""
        />
      </div>
      <Nav mobile="true"></Nav>
      <ComparisonButton mobile={mobile}></ComparisonButton>
      <a className={styles.number} href="tel:+78003332450">
        +7 (800) 333-24-50
      </a>
      <AddressClient mobile="true"></AddressClient>
    </div>
  );
};

export default HamburgerMenu;
