import React, { useState, useEffect } from "react";
import Header from "../components/layout_Components/header/header";
import Footer from "../components/layout_Components/footer/footer";
import MainSection from "../components/layout_Components/MainSection/mainSection";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Enrollment() {
  const token = sessionStorage.getItem("token");
  const [data, setData] = useState([]);
  const navi = useNavigate();
  useEffect(() => {
    if (token == null) {
      navi("/");
    } else {
      const fetchData = async () => {
        try {
          const result = await axios(
            "https://s2s-bck.onrender.com//student/getenrolled"
          );
          setData(result.data);
        } catch (error) {
          setData([]);
        }
      };
      fetchData();
    }
  }, [token, navi]);

  return (
    <>
      <Header
        headerTitle="New enrollments"
        breadCrumb={["Dashboard", "Enrollment"]}
      />
      <MainSection
        page="enrollment"
        data={data}
        tableHeading="New Enrollments"
        column="Classes"
      />
      <Footer />
    </>
  );
}

export default Enrollment;
