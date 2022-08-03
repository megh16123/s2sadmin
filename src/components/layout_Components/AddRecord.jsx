import React,{ memo, useCallback, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
const AddRecord = (props) => {

  const [show, setShow] = useState(false);
  const [studentFormData, setStudentFormData] = useState({
    name: "",
    email:"",
    class: "",
    fathername: "",
    age: "",
    fcontact: "",
    contact:"",
    address:"",
    classes:"",
    fee:""
  });

  const [teacherFormData, setTeacherFormData] = useState({
    name: "",
    email:"",
    phone:"",
    address:"",
    subject:"",
    salary:"",
    qualification:""
  });

  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  

  const onInputChange= useCallback(

    (ev)=>{
      const name = ev.target.name;
      const value = ev.target.value;
      console.log(name,value);
      
      if(props.page==="student"){
        setStudentFormData({...studentFormData, [name]:value})
      }
      if(props.page==="teacher"){
      setTeacherFormData({...teacherFormData, [name]:value})
    }
  },[props.page,studentFormData,teacherFormData])

const onSubmit = async()=>{
if(props.page==='student'){
  const result = await axios.post('https://s2sapi.herokuapp.com/student/register',studentFormData)
  if(result.status===200){
    const courses = studentFormData.classes.split(",");
    courses.forEach(async(course)=>{
    const res = await axios.post('https://s2sapi.herokuapp.com/classes/join',{email:studentFormData.email,class:course})
    })
  }else{
    // console.log(result)
  }
  handleClose()

}else{
  const result = await axios.post('https://s2sapi.herokuapp.com/teacher/addteacher',teacherFormData)
  console.log(result)
  handleClose()
}
}
  return (
    <>
      <Button variant="dark" onClick={handleShow} className="mt-3">
      <i className="fas fa-user-plus"></i> {`Add ${props.page}`}
      </Button>

      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>{`Add a ${props.page}`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form action="" method="post">
            <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                type="name"
                placeholder="Name"
                autoFocus
                onChange={onInputChange}
                
              />
            </Form.Group>
            <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                name="email"
                type="email"
                placeholder="sample@gmail.com"
                onChange={onInputChange}
                
                
              />
            </Form.Group>
            <Form.Group
              className="mb-2"
            >
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                name="contact"
                type="string"
                placeholder="Phone Number"
                onChange={onInputChange}
               />
            </Form.Group>
            {props.page==="student" &&
            <>
            <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
              <Form.Label>Father's Name</Form.Label>
              <Form.Control
                name="fathername"
                type="string"
                placeholder=""
                onChange={onInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
              <Form.Label>Father's Contact</Form.Label>
              <Form.Control
                name="fcontact"
                type="string"
                placeholder=""
                onChange={onInputChange}
              />
            </Form.Group>
            </>
            }
            <Form.Group
              className="mb-2"            >
              <Form.Label>Address</Form.Label>
              <Form.Control
                name="address"
                type="string"
                as="textarea"
                row={3}
                placeholder='Address'
                onChange={onInputChange}
                
                
               />
            </Form.Group>
            <Form.Group
              className="mb-2"            >
              <Form.Label>{`${props.page==="student"?"Classes":"Subject"}`}</Form.Label>
              <Form.Control
                name={`${props.page==="student"?"classes":"subject"}`}
                type="string"
                placeholder={`${props.page==="student"?"Classes (Comma Seperated Values)":"Subject"}`}
                onChange={onInputChange}
                
                
               />
            </Form.Group>
            <Form.Group
              className="mb-2">
              <Form.Label>{`${props.page==="student"?"Fee":"salary"}`}</Form.Label>
              <Form.Control
                name={`${props.page==="student"?"fee":"salary"}`}
                type="string"
                placeholder={`${props.page==="student"?"Fee":"salary"}`}
                onChange={onInputChange}
                
                
               />
            </Form.Group>
            <Form.Group
              className={`mb-2 ${props.page==="student"?"d-none":" "}`}            >
              <Form.Label>Qualification</Form.Label>
              <Form.Control
                name="qualification"
                type="string"
                as="textarea"
                row={3}
                placeholder='Educational Qualification'
                onChange={onInputChange}
                
                
               />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" type="submit" onClick={onSubmit}>
            {`Add ${props.page}`}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}


export default memo(AddRecord);