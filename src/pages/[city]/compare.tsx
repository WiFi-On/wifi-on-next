import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import HelpForm from "@/components/HelpForm/HelpForm";
import AboutUs from "@/components/AboutUs/AboutUs";
import Questions from "@/components/Questions/Questions";
import ComparisonBlock from "@/components/ComparisonBlock/ComparisonBlock";
import PopUpLead from "@/components/PopUpLead/PopUpLead";
import PopUpAgreement from "@/components/PopUpAgreement/PopUpAgreement";
import PopUpPolicy from "@/components/PopUpPolicy/PopUpPolicy";

const compare = () => {
  return (
    <>
      <Header></Header>
      <ComparisonBlock></ComparisonBlock>
      <AboutUs></AboutUs>
      <HelpForm></HelpForm>
      <Questions></Questions>
      <Footer></Footer>
      <PopUpLead></PopUpLead>
      <PopUpAgreement></PopUpAgreement>
      <PopUpPolicy></PopUpPolicy>
    </>
  );
};

export default compare;
