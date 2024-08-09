import Header from "@/components/Header/Header";
import Policy from "@/components/Policy/Policy";
import Footer from "@/components/Footer/Footer";
import AboutUs from "@/components/AboutUs/AboutUs";
import HelpForm from "@/components/HelpForm/HelpForm";
import Questions from "@/components/Questions/Questions";
import Head from "next/head";
import CookieAgreement from "@/components/CookieAgreement/CookieAgreement";

const PolicyPage = () => {
  return (
    <>
      <Head>
        <title>Политика конфиденциальности</title>
        <link rel="icon" href="imgs/favicon.ico"></link>
        <meta name="apple-mobile-web-app-title" content="On-wifi" />
      </Head>
      <Header />
      <Policy />
      <AboutUs />
      <HelpForm />
      <Questions />
      <Footer />
      <CookieAgreement></CookieAgreement>
    </>
  );
};

export default PolicyPage;
