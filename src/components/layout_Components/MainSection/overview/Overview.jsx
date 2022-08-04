import React, { useState, useEffect } from "react";
import "./overview.css";

import { NavLink } from "react-router-dom";
import axios from "axios";
import OverviewCard from "./OverviewCard";
import OverviewOptionCards from "./OverviewOptionCards";
import AddRecord from "../../AddRecord";
function Overview(props) {
  const [studentCount, setStudentCount] = useState(0);
  const [teacherCount, setTeacherCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setStudentCount(0);
      setTeacherCount(0);
      try {
        const result = await axios("https://s2sapi.herokuapp.com/student/allcount");
        const result1 = await axios(
            "https://s2sapi.herokuapp.com/teacher/allcount"
        );
        setTeacherCount(result1.data.count);
        setStudentCount(result.data.count);
      } catch (error) {
        setTeacherCount(0);
      }
    };
    fetchData();
  }, []);

  function DataComponent() {
    if (props.page === "student") {
      const data = props.data;
      const ninthclass = data.filter((item) => item.class === 9);
      const tenthclass = data.filter((item) => item.class === 10);
      const eleventhclass = data.filter((item) => item.class === 11);
      const twelthclass = data.filter((item) => item.class === 12);
      const jeeclass = data.filter((item) => item.class === 13);
      const neetclass = data.filter((item) => item.class === 14);
      return (
        <>
          <div className="card-header main-color-bg">
            <h6>Students</h6>
          </div>
          <div className="card-body row">
            <OverviewCard
              styleClass="col-md-2"
              count={ninthclass.length}
              heading="2nd-9th"
            />
            <OverviewCard
              styleClass="col-md-2"
              count={tenthclass.length}
              heading="Class 10th"
            />
            <OverviewCard
              styleClass="col-md-2"
              count={eleventhclass.length}
              heading="Class 11th"
            />
            <OverviewCard
              styleClass="col-md-2"
              count={twelthclass.length}
              heading="Class 12th"
            />
            <OverviewCard
              styleClass="col-md-2"
              count={jeeclass.length}
              heading="JEE"
            />
            <OverviewCard
              styleClass="col-md-2"
              count={neetclass.length}
              heading="NEET"
            />
          </div>
        </>
      );
    }
    if (props.page === "teacher") {
      // const data = props.data;
      // const medical = data.filter((item) => item.class === "medical");
      // const nonMedical = data.filter((item) => item.class === "nonMedical");
      // const commerce = data.filter((item) => item.class === "commerce");

      return (
        <>
          <div className="card-header main-color-bg">
            <h6>Students</h6>
          </div>
          <div className="card-body row">
            <OverviewCard styleClass="col-md-4" count="0" heading="Medical" />
            <OverviewCard
              styleClass="col-md-4"
              count="1"
              heading="Non medical"
            />
            <OverviewCard styleClass="col-md-4" count="0" heading="Commerce" />
          </div>
        </>
      );
    }

    return (
      <>
        <div className="card-header main-color-bg">
          <h6>Overview</h6>
        </div>
        <div className="card-body row">
          <NavLink to="/student" className="col-md-6">
            {" "}
            <OverviewOptionCards count={studentCount} heading="Students" />{" "}
          </NavLink>
          <NavLink to="/student" className="col-md-6">
            {" "}
            <OverviewOptionCards count={teacherCount} heading="Teachers" />{" "}
          </NavLink>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="col-md-3" id="side-bar">
        <div className="list-group">
          <NavLink
            to="/home"
            className="list-group-item list-group-item-action active main-color-bg"
            aria-current="true"
            style={{ color: "white" }}
          >
            <i className="fas fa-cog"></i> Dashboard
          </NavLink>
          <NavLink
            to="/enrollment"
            className="list-group-item list-group-item-action"
          >
            <i className="fas fa-chalkboard-teacher"></i> Enrollment{" "}
            {/* <span className="badge bg-secondary ">{teacherCount}</span> */}
          </NavLink>
          <NavLink
            to="/student"
            className="list-group-item list-group-item-action"
          >
            <i className="fas fa-graduation-cap"></i>
            Students <span className="badge bg-secondary ">{studentCount}</span>
          </NavLink>
          <NavLink
            to="/teacher"
            className="list-group-item list-group-item-action"
          >
            <i className="fas fa-chalkboard-teacher"></i> Teachers{" "}
            <span className="badge bg-secondary ">{teacherCount}</span>
          </NavLink>
          {(props.page === "teacher" || props.page === "student") && (<AddRecord page={props.page}/> )}
        </div>
      </div>
      <div className="col-md-9" id="overview">
        <div className="card mt-3 mt-md-0">{DataComponent()}</div>
      </div>
    </>
  );
}

export default Overview;
