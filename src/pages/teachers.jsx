import React from "react";
import Header from "../components/layout_Components/header/header"
import Footer from "../components/layout_Components/footer/footer";
import MainSection from "../components/layout_Components/MainSection/mainSection";
import { useNavigate } from "react-router-dom";

function Teacher() {
  const token = sessionStorage.getItem("token");
  const navi = useNavigate();
  React.useEffect(() => {
    if (token==null) {
      navi("/");
    }
  }, [token,navi]);
    return (
      <>
        <Header headerTitle="Teachers" breadCrumb={['Dashboard','Teachers']} />
        <MainSection page="teacher" tableHeading="Teachers" column="Subject"/>
        <Footer />
      </>
    );
  }
  
  export default Teacher;