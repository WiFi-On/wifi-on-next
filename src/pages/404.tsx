import styles from "../styles/page404.module.css";
import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";

const NotFoundPage = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>404</title>
      </Head>
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
          <button onClick={() => router.push("/Moscow")}>На главную</button>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
