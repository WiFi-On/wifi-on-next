import { useEffect } from "react";
import ContactsBlock from "@/components/ContactsBlock/ContactsBlock";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import HelpForm from "@/components/HelpForm/HelpForm";
import Questions from "@/components/Questions/Questions";
import AboutUs from "@/components/AboutUs/AboutUs";
import PopUpLead from "@/components/PopUpLead/PopUpLead";
import PopUpPolicy from "@/components/PopUpPolicy/PopUpPolicy";
import PopUpAgreement from "@/components/PopUpAgreement/PopUpAgreement";
import Head from "next/head";
import CookieAgreement from "@/components/CookieAgreement/CookieAgreement";

const Contacts = () => {
  return (
    <>
      <Head>
        <title>Контакты</title>
        <link rel="icon" href="imgs/favicon.ico"></link>
        <meta name="apple-mobile-web-app-title" content="On-wifi" />
      </Head>
      <Header></Header>
      <ContactsBlock></ContactsBlock>
      <PopUpLead></PopUpLead>
      <AboutUs></AboutUs>
      <HelpForm></HelpForm>
      <Questions></Questions>
      <Footer></Footer>
      <CookieAgreement></CookieAgreement>
    </>
  );
};

export default Contacts;
