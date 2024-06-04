import styles from "../styles/page404.module.css";

import Image from "next/image";

const NotFoundPage = () => {
  return (
    <div className={styles.main}>
      <div className={styles.wrapper}>
        <Image
          width={180}
          height={40}
          src="/imgs/404logo.png"
          alt="logo"
        ></Image>
        <p>404</p>
        <h4>Такой страницы не существует;(</h4>
        <button>На главную</button>
      </div>
    </div>
  );
};

export default NotFoundPage;
