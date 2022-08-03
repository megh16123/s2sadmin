import React,{ useState,useEffect } from "react";
import Header from "../components/layout_Components/header/header"
import Footer from "../components/layout_Components/footer/footer";
import MainSection from "../components/layout_Components/MainSection/mainSection";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function Student() {
  const token = sessionStorage.getItem("token");
  const [data, setData] = useState([]);
  const navi = useNavigate();
  useEffect(() => {
    if (token==null) {
      navi("/");
    }else{
      const fetchData = async () => {
        try {
          const result = await axios(
            "https://s2sapi.herokuapp.com/admin/getstudentdata"
          );
          setData(result.data);
        } catch (error) {
          setData([]);
        }
      };
      fetchData();

    }
  }, [token,navi]);
  
    return (
      <>
        <Header headerTitle="Students" breadCrumb={['Dashboard','Student']} />
        <MainSection page="student" data={data} tableHeading="All Students" column="Classes"/>
        <Footer />
      </>
    );
  }
  
  export default Student;