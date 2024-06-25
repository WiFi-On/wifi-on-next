import iconComparisonWhite from "./iconComparisonWhite.svg";
import iconComparisonBlack from "./iconComparisonBlack.svg";
import styles from "./ComparisonButton.module.css";
import Link from "next/link";
import cn from "classnames";
import Image from "next/image";
import { useRouter } from "next/router";

const ComparisonButton = (props) => {
  const { mobile } = props;
  const router = useRouter();
  const { city } = router.query;

  return (
    <Link
      className={cn(styles.main, {
        [styles.colorMobile]: mobile === "true",
        [styles.colorDesk]: mobile !== "true",
      })}
      href={`/${city}/compare`}
    >
      {mobile === "true" ? (
        <Image src={iconComparisonBlack} alt="" />
      ) : (
        <Image src={iconComparisonWhite} alt="" />
      )}
      <span>Сравнение</span>
    </Link>
  );
};

export default ComparisonButton;
