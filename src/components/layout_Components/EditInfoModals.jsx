import React, { useState } from 'react'
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from 'axios';
const FormGroup = ({inputValue,formLabel,inputName,inputPlaceholder,inputType,as,row,page}) => {
    const [input, setInput] = useState(inputValue)

    return (<Form.Group className={`mb-2 ${(inputName === "qualification" && page==="student") ? "d-none" : ""}`} controlId="exampleForm.ControlInput1">
        <Form.Label>{formLabel}</Form.Label>
        <Form.Control
            name={inputName}
            type={inputType}
            value={input}
            placeholder={inputPlaceholder}
            as = {as}
            row={row}
            onChange={(e) => {
                setInput(e.target.value);
            }}
        />
    </Form.Group>)
}

const EditInfoModals = ({ data, page }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    let studentFormData = {}
    let teacherFormData = {}

    if (page === "student") {
        studentFormData = {
            name: data.name,
            email: data.email,
            contact: data.contact,
            address: data.address,
            classes: data.classenrolled.join(","),
            fee: data.fee.reduce((x, y) => {
                return x + y;
            }, 0)
        };
    }
    const handleSubmit = async(e) =>  {
e.preventDefault();
        if (page === "student") {
            
            let data = {}
             for(let i = 0;i<e.target.length;i++){
                 data[e.target[i].name] = e.target[i].value
            }
         const result = await axios.post('https://s2sapi.herokuapp.com/student/update', data)
         console.log(result)
        }
        if (page === "teacher") {
            let data = {}
            for(let i = 0;i<e.target.length;i++){
                data[e.target[i].name] = e.target[i].value
            }
            const result = await axios.post('https://s2sapi.herokuapp.com/teacher/updateteacher', data)
            console.log(result)
            

        }
    }
    if (page === "teacher") {
        teacherFormData = {
            name: data.name,
            email: data.email,
            phone: data.phone,
            address: data.address,
            subject: data.subject,
            salary: data.salary,
            qualification: ""
        }
    }

    return (
        <>
            {/* Modal 1 */}
            <Button variant="dark" onClick={handleShow}>
                Edit info
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        {page === "student" && `Edit ${studentFormData.name}`}
                        {page === "teacher" && `Edit ${teacherFormData.name}`}
                    </Modal.Title>
                </Modal.Header>
                    <Form onSubmit={handleSubmit} method="post">
                <Modal.Body>
                    <FormGroup inputValue={page === "student" ? studentFormData.name : teacherFormData.name} inputName="name" inputPlaceholder="Name" formLabel="Name" inputType="text" />

                    <FormGroup inputValue={page === "student" ? studentFormData.email : teacherFormData.email} inputName="email" inputPlaceholder="Email" formLabel="Email" inputType="email" />

                    <FormGroup inputValue={page === "student" ? studentFormData.contact : teacherFormData.phone} inputName={page==='student'?"contact":"phone"} inputPlaceholder="Phone Number" formLabel="Phone Number" inputType="text" />

                    <FormGroup inputValue={page === "student" ? studentFormData.address : teacherFormData.address} inputName="address" inputPlaceholder="Address" formLabel="Address" inputType="text" as="textarea"/>
                    
                    <FormGroup inputValue={page === "student" ? studentFormData.classenrolled : teacherFormData.subject} inputName={`${page === "student" ? "classes" : "subject"}`} inputPlaceholder={`${page === "student" ? "Classes (Comma Seperated Values)" : "Subject"}`} formLabel={`${page === "student" ? "Classes" : "Subject"}`} inputType="text" />

                    <FormGroup inputValue={page === "student" ? studentFormData.fee : teacherFormData.salary} inputName={`${page === "student" ? "Fee" : "salary"}`} inputPlaceholder={`${page === "student" ? "Fee" : "salary"}`} formLabel={`${page === "student" ? "Fee" : "salary"}`} inputType="text"/>
                       
                    <FormGroup inputValue="" inputName="qualification" inputPlaceholder='Educational Qualification' formLabel="Educational Qualification" inputType="text" as="textarea" row={3} page={page}/>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="dark" type="submit">
                        Save changes
                    </Button>
                </Modal.Footer>
                    </Form>
            </Modal>
        </>
    )
}

export default EditInfoModals