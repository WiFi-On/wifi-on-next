import Header from "@/components/Header/Header";
import Agreement from "@/components/Agreement/Agreement";
import Footer from "@/components/Footer/Footer";
import AboutUs from "@/components/AboutUs/AboutUs";
import HelpForm from "@/components/HelpForm/HelpForm";
import Questions from "@/components/Questions/Questions";
import Head from "next/head";
import CookieAgreement from "@/components/CookieAgreement/CookieAgreement";

const AgreementPage = () => {
  return (
    <div>
      <Head>
        <title>Пользовательское соглашение</title>
        <link rel="icon" href="imgs/favicon.ico"></link>
        <meta name="apple-mobile-web-app-title" content="On-wifi" />
      </Head>
      <Header />
      <Agreement />
      <AboutUs />
      <HelpForm />
      <Questions />
      <Footer />
      <CookieAgreement></CookieAgreement>
    </div>
  );
};

export default AgreementPage;
