import React from "react";
import Overview from "./overview/overview";
import MainTable from "./mainTable/MainTable";

import "./mainSection.css";

function mainSection (props){
    return (
        <section id="main">
            <div className="container">
                <div className="row">
                <Overview page={props.page} data={props.data}/>
                <MainTable page={props.page} tableHeading={props.tableHeading} column={props.column}/>
                </div>
            </div>
        </section>
    )
};

export default mainSection;