import React, { useState } from "react";
import Header from "../components/layout_Components/header/header"
import Footer from "../components/layout_Components/footer/footer";
import MainSection from "../components/layout_Components/MainSection/mainSection";
import { useNavigate } from "react-router-dom";

function Home() {
  const [data, setData] = useState([]);
  const token = sessionStorage.getItem("token");
  const navi = useNavigate();
  React.useEffect(() => {
    if (token==null) {
      navi("/");
    }
  }, [token,navi]);

    return (
      <>
        <Header headerTitle="Dashboard" breadCrumb={['Dashboard']} />
        <MainSection page="home" tableHeading="New registerations" column="Message"/>
        <Footer />
      </>
    );
  }
  
  export default Home;