import React from "react";
import "./header.css";
import { NavLink } from "react-router-dom";

function Header(props) {
  const breadCrumbLast = props.breadCrumb.length - 1;
  if (props.headerTitle === "Login") {
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <NavLink className="navbar-brand ms-sm-5" to="#">
              S2S Admin
            </NavLink>
          </div>
        </nav>
      </>
    );
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <NavLink className="navbar-brand ms-sm-5" to="/home">
            S2S Admin
          </NavLink>
          <button
            className="navbar-toggler me-sm-5"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto ms-sm-5 ms-lg-auto me-lg-5 mb-2 mb-lg-0">
              <li className="nav-item pe-4">
                <NavLink className="nav-link" aria-current="page" to="/home">
                  Home
                </NavLink>
              </li>
              <li className="nav-item pe-4">
                <NavLink className="nav-link" to="/student">
                  Students
                </NavLink>
              </li>
              <li className="nav-item pe-4">
                <NavLink className="nav-link" to="/teacher">
                  Teachers
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink onClick={()=>{
                  sessionStorage.removeItem("token");
                }} className="nav-link" to="/">
                  Log Out
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <header id="header">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2>
                <i className="fas fa-cog"></i> {props.headerTitle}{" "}
                <small className="header-small">Manage your institute</small>
              </h2>
            </div>
          </div>
        </div>
      </header>
      <section id="breadcrumb">
        <div className="container">
          <ol className="breadcrumb">
            {props.breadCrumb.map((_, index) => {
              return (
                <li
                  key={index}
                  className={index === breadCrumbLast ? "active" : ""}
                >{`${props.breadCrumb[index]} / `}</li>
              );
            })}
          </ol>
        </div>
      </section>
    </>
  );
}

export default Header;
