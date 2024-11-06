import styles from "./CardProvider.module.css";
import { useState, useEffect } from "react";
import cn from "classnames";
import Image from "next/image";
import { useRouter } from "next/router";

const CardProvider = ({ img, id }) => {
  const [on, setOn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const { providers } = router.query;
    if (providers) {
      const providerIds = providers.split(",").map((pid) => parseInt(pid, 10));
      setOn(providerIds.includes(id));
    } else {
      setOn(false);
    }
  }, [router.query, id]);

  const handleClick = () => {
    const currentQuery = { ...router.query };
    let newProviders;

    if (on) {
      newProviders = currentQuery.providers
        ? currentQuery.providers.split(",").filter((pid) => pid !== String(id))
        : [];
    } else {
      newProviders = currentQuery.providers
        ? [...currentQuery.providers.split(","), String(id)]
        : [String(id)];
    }

    if (newProviders.length > 0) {
      currentQuery.providers = newProviders.join(",");
    } else {
      delete currentQuery.providers;
    }

    router.push({
      pathname: router.pathname,
      query: currentQuery,
    });
  };

  return (
    <div onClick={handleClick} className={cn(styles.main, { [styles.on]: on })}>
      <div className={styles.wrapper}>
        <Image height={100} width={100} src={img} alt="Логотип провайдера" />
      </div>
    </div>
  );
};

export default CardProvider;
