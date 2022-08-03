import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import Modal from "react-bootstrap/Modal";
import axios from "axios";

function MoreInfo({ data, email, page }) {
  // For Modal 1
  const [show, setShow] = useState(false);
  const [student, setStudent] = useState({});
  const [teacher, setTeacher] = useState({});
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
      else if (page === "teacher") {
        try {

          setTeacher(data);
          setSalary(data.salary);
        } catch (error) {
          setTeacher({});
        }
      }
    };

    fetchData();
  }, [data, email, page]);
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
    } else {
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
  }

  return (
    <>
      {/* Modal 1 */}
      <Button variant="dark" onClick={handleShow}>
        More Info
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{teacher.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {renderDat()}

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="dark"
            onClick={() => {
              handleShow2();
              handleClose();
            }}
          >
            {page === "student" && `Mark Fee Submission`}
            {page === "teacher" && `Mark Salary`}
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
