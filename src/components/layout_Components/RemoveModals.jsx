import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
function RemoveModals(props) {
  // For Modal 1
  const [show, setShow] = useState(false);
  const [student, setStudent] = useState({});
  const [teacher, setTeacher] = useState({});
  const [message, setMessage] = useState({});
  const [enrollments, setEnrollments] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // For Modal 2
  const [show2, setShow2] = useState(false);

  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  let totalfee = 0;
  if (props.page === "student") {
    totalfee = props.data.fee.reduce((x, y) => {
      return x + y;
    }, 0);
  }
  useEffect(() => {
    const fetchData = async () => {
      if (props.page === "student") {
        try {
          setStudent(props.data);
        } catch (error) {
          setStudent({});
        }
      }
      if (props.page === "teacher") {
        try {
          setTeacher(props.data);
        } catch (error) {
          setTeacher({});
        }
      }
      if (props.page === "home") {
        try {
          setMessage(props.data);
        } catch (error) {
          setMessage({});
        }
      }
      if (props.page === "enrollment") {
        try {
          setEnrollments(props.data);
        } catch (error) {
          setEnrollments({});
        }
      }
    };

    fetchData();
  }, [props.email, props.page, props.data]);

  const handleRemove = async () => {
    console.log(totalfee);
    if (props.page === "student") {
      try {
        const result = await axios.post(
          "https://s2s-bck.onrender.com/student/deletestudent",
          { email: props.data.email }
        );
        if (result.status === 200) {
          handleShow2();
          handleClose();
        }
      } catch (error) {
        handleClose();
      }
    }
    if (props.page === "teacher") {
      try {
        const result = await axios.post(
          "https://s2s-bck.onrender.com/teacher/deleteteacher",
          { email: props.data.email }
        );
        if (result.status === 200) {
          handleShow2();
          handleClose();
        }
      } catch (error) {
        handleClose();
      }
    }
    if (props.page === "home") {
      try {
        const result = await axios.post(
          "https://s2s-bck.onrender.com/contactus/deletecontact",
          { id: props.data._id }
        );
        if (result.status === 200) {
          handleShow2();
          handleClose();
        }
      } catch (error) {
        handleClose();
      }
    }
    if (props.page === "enrollment") {
      try {
        const result = await axios.post(
          "https://s2s-bck.onrender.com/student/deleteenrolled",
          { email: props.data.email }
        );
        if (result.status === 200) {
          handleShow2();
          handleClose();
        }
      } catch (error) {
        handleClose();
      }
    }
  };

  return (
    <>
      {/* Modal 1 */}
      <Button variant="dark" onClick={handleShow}>
        {props.page === "teacher" && `Remove ${props.page}`}
        {props.page === "student" && `Remove ${props.page}`}
        {(props.page === "home" || props.page === "enrollment") && `Remove`}
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          {(props.page === "teacher" || props.page === "student") && (
            <Modal.Title>Remove a {props.page}</Modal.Title>
          )}
          {props.page === "enrollment" && (
            <Modal.Title>Remove a registeration</Modal.Title>
          )}
          {props.page === "home" && <Modal.Title>Remove a message</Modal.Title>}
        </Modal.Header>
        <Modal.Body>
          {/* Name : {student.name} */}
          <br />
          {props.page === "student" && `Name : ${student.name}`}
          {props.page === "teacher" && `Name : ${teacher.name}`}
          {props.page === "enrollment" && `Name : ${enrollments.name}`}
          {props.page === "home" && `Name : ${message.name}`}
          <br />
          {props.page === "student" && `Email : ${student.email}`}
          {props.page === "teacher" && `Email : ${teacher.email}`}
          {props.page === "enrollment" && `Email : ${enrollments.email}`}
          {props.page === "home" && `Email : ${message.email}`}
          <br />
          {props.page === "student" && `Phone : ${student.contact}`}
          {props.page === "teacher" && `Phone : ${teacher.phone}`}
          {props.page === "enrollment" && `Phone number : ${enrollments.phone}`}
          <br />
          {props.page === "student" && `Class : ${student.classenrolled}`}
          {props.page === "teacher" && `Subject : ${teacher.subject}`}
          <br />
          {props.page === "student" &&
            `Fee Due : ${totalfee - student.feepaid}`}
          {props.page === "home" && `Message : ${message.message}`}
          {props.page === "enrollment" && `Classes : ${props.classesJoined}`}
          <br />
          <br />
          {(props.page === "teacher" || props.page === "student") && (
            <span className="caution-message">
              {`NOTE: Once you remove the ${props.page}, all the information of the ${props.page}
                        will be deleted from the database`}
            </span>
          )}
        </Modal.Body>
        <Modal.Footer>
          {props.page === "student" &&
            `Do you want to remove ${student.name} ?`}
          {props.page === "teacher" &&
            `Do you want to remove ${teacher.name} ?`}
          {props.page === "home" && `Do you want to remove this message?`}
          {props.page === "enrollment" &&
            `Do you want to remove this registeration?`}

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
          {(props.page === "teacher" || props.page === "student") && (
            <Modal.Title>{`${props.page} Removed`}</Modal.Title>
          )}
          {props.page === "home" && (
            <Modal.Title>{`Message Removed`}</Modal.Title>
          )}
          {props.page === "enrollment" && (
            <Modal.Title>{`Registeration Removed`}</Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          {props.page === "student" && ` ${student.name} has been removed`}
          {props.page === "teacher" && ` ${teacher.name} has been removed`}
          {props.page === "home" && ` Message has been removed`}
          {props.page === "enrollment" && ` Registeration has been removed`}
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
