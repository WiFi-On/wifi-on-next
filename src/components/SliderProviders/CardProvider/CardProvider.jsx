import styles from "./CardProvider.module.css";
import { useState } from "react";
import cn from "classnames";
import { useDispatch } from "react-redux";
import {
  addProvider,
  removeProvider,
} from "../../../redux/actions/providerAction";
import Image from "next/image";

const CardProvider = ({ img, id }) => {
  const [on, setOn] = useState(false);
  const dispatch = useDispatch();
  const handleClick = () => {
    if (on) {
      setOn(false);
      dispatch(removeProvider(id));
    } else {
      setOn(true);
      dispatch(addProvider(id));
    }
  };

  return (
    <div onClick={handleClick} className={cn(styles.main, { [styles.on]: on })}>
      <div className={styles.wrapper}>
        <Image height={100} width={100} src={img} alt="" />
      </div>
    </div>
  );
};

export default CardProvider;
