import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import Modal from "react-bootstrap/Modal";
import axios from "axios";

function MoreInfo({ data, email, page, classesJoined }) {
  // For Modal 1
  const [show, setShow] = useState(false);
  const [student, setStudent] = useState({});
  const [teacher, setTeacher] = useState({});
  const [message, setMessage] = useState({});
  const [enrollment, setEnrollment] = useState({});
  const [fees, setfee] = useState(0);
  const [salary, setSalary] = useState(0);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // For Modal 2
  const [show2, setShow2] = useState(false);

  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  // For Modal 3
  const [show3, setShow3] = useState(false);

  const handleClose3 = () => setShow3(false);
  const handleShow3 = () => setShow3(true);
  let totalfee = 0;
  if (page === "student") {
    totalfee = data.fee.reduce((x, y) => {
      return x + y;
    }, 0);
  }
  useEffect(() => {
    const fetchData = async () => {
      if (page === "student") {
        try {
          setStudent(data);
        } catch (error) {
          setStudent({});
        }
      }
      if (page === "teacher") {
        try {

          setTeacher(data);
          setSalary(data.salary);
        } catch (error) {
          setTeacher({});
        }
      }
      if (page === "home") {
        try {
          setMessage(data);
          console.log(message);
        } catch (error) {
          setMessage({})
        }
      }
      if (page === "enrollment") {
        try {
          setEnrollment(data);
        } catch (error) {
          setEnrollment({})
        }
      }
    };

    fetchData();
  }, [data, email, page, message]);
  const renderDat = () => {
    if (page === 'student') {
      return (
        <>
          Name: {student.name}
          <br />
          Email: {student.email}
          <br />
          Classes: {student.classenrolled}
          <br />
          TotalFee: {totalfee}   <br />
          Fee Due : {totalfee - student.feepaid}
        </>
      )
    } if (page === 'teacher') {
      return (
        <>
          Name: {teacher.name}
          <br />
          Email : {teacher.email}
          <br />
          Qualification : {teacher.qualification}
          <br />
          Salary : {teacher.salary}
          <br />
          Address : {teacher.address}
          <br />
          Subject: {teacher.subject}
        </>
      )
    }
    if (page === "home") {
      console.log(message);
      return (
        <>
          Name: {message.name}
          <br />
          Email: {message.email}
          <br />
          Message: {message.message}
          <br />
        </>
      )
    }
    if (page === "enrollment") {
      return (
        <>
          Name: {enrollment.name}
          <br />
          Email: {enrollment.email}
          <br />
          Phone: {enrollment.phone}
          <br />
          Classes: {classesJoined}
          <br />
        </>
      )
    }
  }

  const markfee = async () => {
    try {
      const result = await axios.post('https://s2sapi.herokuapp.com/student/updatefee', { email: student.email, amount: fees });
      if (result.status === 200) {
        let st = student;
        st.feepaid = result.data.fees;
        setStudent(st)
        handleShow3();
        handleClose2();
      } else {
        console.error(result.error);
      }
    } catch (error) {
      setfee(0);
    }
    if (page === "teacher") {
      try {
        const result = await axios.post("https://s2sapi.herokuapp.com/teacher/updateteacher", { email: teacher.email, salary: salary });
        if (result.status === 200) {
          handleShow3();
          handleClose2();
        }
        else {
          console.error(result.error);
        }
      } catch (error) {
        console.error(error.message)
      }
    }
  }

  return (
    <>
      {/* Modal 1 */}
      <Button variant="dark" onClick={handleShow}>
        {page === 'home' && `Read message`}
        {page === 'enrollment' && `View Registeration`}
        {page === 'student' && `More Info`}
        {page === 'teacher' && `More Info`}
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          {page === 'home' && <Modal.Title>{"Read message"}</Modal.Title>}
          {page === 'enrollment' && <Modal.Title>{"View Registeration"}</Modal.Title>}
          {page === 'student' && <Modal.Title>{student.name}</Modal.Title>}
          {page === 'teacher' && <Modal.Title>{teacher.name}</Modal.Title>}

        </Modal.Header>
        <Modal.Body>
          {renderDat()}

        </Modal.Body>
        <Modal.Footer>
          {page === "home" && message.responded !== true &&
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          }
          {page === "enrollment" && enrollment.responded !== true &&
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          }
          {page === "home" && message.responded === true && `Already seen`}
          {page === "enrollment" && enrollment.responded === true && `Already seen`}
          {page === "home" && message.responded === false &&
            <Button
              variant="dark"
              onClick={async () => {
                // if (page !== "home") {
                //   handleShow2();
                //   handleClose();
                // }
                if (page === 'home') {
                  try {
                    const result = await axios.post(
                      "https://s2sapi.herokuapp.com/contactus/markresponse", { id: message._id, }
                    );
                    if (result.status === 200) {
                      handleClose()
                    }
                  } catch (error) {
                    console.log(error.message);
                  }
                }
              }}
            >
              Mark as read
            </Button>
          }
          {page === "enrollment" && enrollment.responded !== true &&
            <Button
              variant="dark"
              onClick={async () => {
                // if (page !== "home") {
                //   handleShow2();
                //   handleClose();
                // }
                if (page === 'enrollment') {
                  try {
                    const resultEnrollment = await axios.post(
                      "https://s2sapi.herokuapp.com/student/markresponse", { id: enrollment._id, }
                    );
                      console.log(resultEnrollment.status)
                    if (resultEnrollment.status === 200) {
                      handleClose()
                    }
                  } catch (error) {
                    console.log(error.message);
                  }
                }
              }}
            >
              Mark as read
            </Button>
          }

          {page === "student" &&
            <Button
              variant="dark"
              onClick={async () => {
                  handleShow2();
                  handleClose();
              }}
            >
              Mark Fee Submission
            </Button>
          }
          {page === "teacher" &&
            <Button
              variant="dark"
              onClick={async () => {
                  handleShow2();
                  handleClose();
              }}
            >
              Mark Salary
            </Button>
          }
        </Modal.Footer>
      </Modal>

      {/* Modal 2 */}

      <Modal
        show={show2}
        onHide={handleClose2}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{page === "student" && `Marking Fee Submission`}
            {page === "teacher" && `Marking Salary`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Enter the amount paid :</Form.Label>
              <Form.Control
                type="number"
                required
                value={page === "student" ? `${fees}` : `${salary}`}
                // value={page==="student" && `${fees}`}
                // value={page==="teacher" && `${teacher.salary}`}
                onChange={(e) => {
                  if (page === "student") {
                    setfee(e.target.value);
                  }
                  else setSalary(e.target.value);
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="dark"
            onClick={() => {
              // if(page==="teacher"){
              markfee();
              // } else markSalary();
            }}
          >
            {page === "student" && `Mark Fee Submission`}
            {page === "teacher" && `Mark salary`}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal 3 */}

      <Modal
        show={show3}
        onHide={handleClose3}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>
            {page === "student" && `Fee Submission Marked`}
            {page === "teacher" && `Salary marked`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {page === "student" && `Fee submission has been marked for ${student.name}`}
          {page === "teacher" && `Salary submission has been marked for {teacher.name}`}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose3}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MoreInfo;
