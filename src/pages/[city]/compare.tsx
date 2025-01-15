import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import HelpForm from "@/components/HelpForm/HelpForm";
import AboutUs from "@/components/AboutUs/AboutUs";
import Questions from "@/components/Questions/Questions";
import ComparisonBlock from "@/components/ComparisonBlock/ComparisonBlock";
import PopUpLead from "@/components/PopUpLead/PopUpLead";
import PopUpAgreement from "@/components/PopUpAgreement/PopUpAgreement";
import PopUpPolicy from "@/components/PopUpPolicy/PopUpPolicy";
import Head from "next/head";
import CookieAgreement from "@/components/CookieAgreement/CookieAgreement";

const compare = () => {
  return (
    <>
      <Head>
        <title>
          📊 Сравнение тарифов - On-wifi: Найдите лучший интернет-план!
        </title>
        <link rel="icon" href="imgs/favicon.ico"></link>
        <meta name="apple-mobile-web-app-title" content="On-wifi" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Узнайте, как тарифы On-wifi сравниваются с другими провайдерами! 🚀 Сравните скорость, стоимость и условия и выберите лучший вариант для себя. "
        />
      </Head>
      <Header></Header>
      <ComparisonBlock></ComparisonBlock>
      <AboutUs></AboutUs>
      <HelpForm></HelpForm>
      <Questions></Questions>
      <Footer></Footer>
      <PopUpLead></PopUpLead>
      <PopUpAgreement></PopUpAgreement>
      <PopUpPolicy></PopUpPolicy>
      <CookieAgreement></CookieAgreement>
    </>
  );
};

export default compare;
