import React, { useState,useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
function RemoveModals(props) {
    // For Modal 1
    const [show, setShow] = useState(false);
    const [student,setStudent] = useState({});
    const [teacher,setTeacher] = useState({});

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // For Modal 2
    const [show2, setShow2] = useState(false);

    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
    useEffect(() => {
        const fetchData = async () => {
            if(props.page==="student"){
                try {
                    const result = await axios.post('https://s2sapi.herokuapp.com/student/getbymail',{email:props.email});
                    setStudent(result.data);
                } catch (error) {
                    setStudent({});
                }
            }
            if(props.page==="teacher"){
                try {
                    const result = await axios.post('https://s2sapi.herokuapp.com/teacher/getteacherbyemail',{email:props.email});
                    setTeacher(result.data);
                } catch (error) {
                    setTeacher({});
                }
            }
        };
    
        fetchData();
    }, [props.email,props.page]);

    const handleRemove = async () => {
       if(props.page==='student'){ 
        try {
            const result = await axios.post('https://s2sapi.herokuapp.com/student/deleteadmin',{email:props.email});
            if(result.status === 200){
            handleShow2();
            handleClose();
            }
        } catch (error) {
           handleClose();
        }
    }else{
        try {
            const result = await axios.post('https://s2sapi.herokuapp.com/teacher/deleteteacher',{email:props.email});
            if(result.status === 200){
            handleShow2();
            handleClose();
            }
        } catch (error) {
           handleClose();
        }
        }
    }

    return (
        <>
            {/* Modal 1 */}
            <Button variant="dark" onClick={handleShow}>
                Remove {props.page}
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Remove a {props.page}</Modal.Title>
                </Modal.Header>
                <Modal.Body>     
             {/* Name : {student.name} */}
          <br />
          {props.page==="student" && `Email : ${student.email}` }
          {props.page==="teacher" && `Email : ${teacher.email}` }
          <br />
          {props.page==="student" && `Fee Due : ${student.feeDue}` }
          {/* {props.page==="teacher" && `Fee Due : ${teacher.feeDue}` } */}
                    <br /><br />
                    <span className="caution-message">{`NOTE: Once you remove the ${props.page}, all the information of the ${props.page}
                        will be deleted from the database`}
                    </span>        
                </Modal.Body>
                <Modal.Footer>
                {props.page==="student" && `Do you want to remove ${student.name} ?` }
                {props.page==="teacher" && `Do you want to remove ${teacher.name} ?` }
                
                    <Button variant="outline-dark" onClick={handleClose}>
                        No
                    </Button>
                    <Button
                        variant="dark"
                        onClick={() => {
                          handleRemove();
                        }}
                    >
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>


            {/* Modal 2 */}

            <Modal
                show={show2}
                onHide={handleClose2}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>{`${props.page} Removed`}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                {props.page==="student" && `&lt; ${student.name} &gt; has been removed`}
                {props.page==="teacher" && `&lt; ${teacher.name} &gt; has been removed`}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="dark" onClick={handleClose2}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default RemoveModals;
