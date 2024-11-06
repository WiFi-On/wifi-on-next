import styles from "./NotTariffs.module.css";
import Image from "next/image";
import { useRouter } from "next/router";

const NotTariffs = ({ status }) => {
  const router = useRouter();
  const { query } = router;
  const { city, address } = query;

  return (
    <div className={styles.main}>
      <div className={styles.wrapper}>
        <Image
          width={180}
          height={40}
          src="/imgs/404logo.png"
          alt="Логотип компании"
        />
        <p>418</p>
        {status === 0 && (
          <>
            <h4>Тарифы не найдены</h4>
            <button
              onClick={() =>
                router.push(`/${city}/tariffs/?address=${address}`)
              }
            >
              Тарифы
            </button>
          </>
        )}
        {status === 1 && (
          <>
            <h4>Техническая возможность отсутствует</h4>
            <button onClick={() => router.push(`/${city}`)}>Главная</button>
          </>
        )}
      </div>
    </div>
  );
};

export default NotTariffs;
