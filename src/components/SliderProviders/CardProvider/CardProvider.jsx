import styles from "./CardProvider.module.css";
import { useState, useEffect } from "react";
import cn from "classnames";
import Image from "next/image";
import { useRouter } from "next/router";

const CardProvider = ({ img, id }) => {
  const [on, setOn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if the current provider id is in the URL params and set the initial state
    const { providers } = router.query;
    if (providers) {
      const providerIds = providers.split(",").map((pid) => parseInt(pid, 10));
      if (providerIds.includes(id)) {
        setOn(true);
      }
    }
  }, [router.query, id]);

  const handleClick = () => {
    const currentQuery = { ...router.query };
    let newProviders;

    if (on) {
      setOn(false);
      newProviders = currentQuery.providers
        ? currentQuery.providers.split(",").filter((pid) => pid !== String(id))
        : [];
    } else {
      setOn(true);
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
        <Image height={100} width={100} src={img} alt="" />
      </div>
    </div>
  );
};

export default CardProvider;
