import { useEffect } from "react";
import ContactsBlock from "@/components/ContactsBlock/ContactsBlock";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import HelpForm from "@/components/HelpForm/HelpForm";
import Questions from "@/components/Questions/Questions";
import AboutUs from "@/components/AboutUs/AboutUs";

const Contacts = () => {
  return (
    <>
      <Header></Header>
      <ContactsBlock></ContactsBlock>
      <AboutUs></AboutUs>
      <HelpForm></HelpForm>
      <Questions></Questions>
      <Footer></Footer>
    </>
  );
};

export default Contacts;
