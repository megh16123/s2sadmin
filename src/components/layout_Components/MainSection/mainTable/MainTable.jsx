import React, { useEffect, useState } from "react";
import EditInfoModals from "../../EditInfoModals";
import MoreInfo from "../../MoreInfoModals";
import RemoveModals from "../../RemoveModals";

function MainTable(props) {
    const style = {
        backgroundColor: "#cccccc !important"
    };

    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            if (props.page === "teacher") {
                const response = await fetch("https://s2sapi.herokuapp.com/teacher/getteacher");
                const dat = await response.json();
                setData(dat);
            }
            if (props.page === "student") {
                const response = await fetch("https://s2sapi.herokuapp.com/student/studentdata");
                const dat = await response.json();
                const d = dat.map((item) => {
                    item.fee = item.classenrolled.map((it) => {
                        return it.fee;
                    })
                    item.classenrolled = item.classenrolled.map((ite) => {
                        return ite.clas;
                    });
                    return item;
                })
                setData(d);
            }
            if (props.page === "home") {
                const response = await fetch("https://s2sapi.herokuapp.com/contactus/getcontacts");
                const dat = await response.json();
                setData(dat);
            }
            if (props.page === "enrollment") {
                const response = await fetch("https://s2sapi.herokuapp.com/student/getenrolled");
                const dat = await response.json();
                setData(dat);
            }
        }
        fetchData();

    }, [props]);
    const datafilt = () => {
        if (props.page === "student") {
            return (data.map((item, index) => (
                <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.name}</td>
                    <td>{item.classenrolled.join(",")}</td>
                    <td><RemoveModals email={item.email} data={item} page={props.page} />&nbsp;&nbsp;<MoreInfo data={item} page={props.page} />
                        &nbsp;&nbsp;<EditInfoModals page={props.page} data={item} /></td>
                </tr>
            )))
        }
        if (props.page === "teacher") {
            return (data.map((item, index) => (
                <tr key={index}>

                    <td>{index}</td>
                    <td>{item.name}</td>
                    <td>{item.subject}</td>
                    <td><RemoveModals email={item.email} data={item} page={props.page} />&nbsp;&nbsp;<MoreInfo data={item} amount={item.salary} page={props.page} />&nbsp;&nbsp;<EditInfoModals page={props.page} data={item} /></td>
                </tr>
            )))
        }
        if (props.page === "home") {
            return (data.map((item, index) => (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.message}</td>
                    <td><RemoveModals page={props.page} data={item} />&nbsp;&nbsp;<MoreInfo data={item} page={props.page} /></td>
                </tr>
            )))
        }
        if (props.page === "enrollment") {
            return (data.map((item, index) => (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{
                        item.classes.map((element) => element.class).join(', ')
                    }</td>
                    <td><RemoveModals classesJoined={item.classes.map((element) => element.class).join(', ')} page={props.page} data={item} />&nbsp;&nbsp;<MoreInfo classesJoined={item.classes.map((element) => element.class).join(', ')} data={item} page={props.page} /></td>
                </tr>
            )))
        }
    }
    return (
        <div className="container">
            <div className="card mt-3">
                <h5 className="card-header main-color-bg">{props.tableHeading}</h5>
                <div className="card-body p-2">
                    <div className="col-md-12" style={style}>
                        <table className="table table-hover m-0" id="dataTable">
                            <thead>
                                <tr>
                                    <th scope="col">S. No.</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">{props.column}</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr key={-1}>
                                    <th scope="row"></th>
                                    <td>{null}</td>
                                    <td>{null}</td>
                                </tr>
                                {datafilt()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default MainTable;
