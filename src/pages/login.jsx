import React from "react";
import Header from "../components/layout_Components/header/header";
import Footer from "../components/layout_Components/footer/footer";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

function Login() {
  const style = {
    borderRadius: "10px",
    border: "5px solid #ccc",
  };
  const navi = useNavigate();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://s2s-bck.onrender.com/admin/login", {
        username: username,
        password: password,
      })
      .then((res) => {
        if (res.status === 200) {
          sessionStorage.setItem("token", res.data.token);
          navi("/home");
        } else {
          localStorage.setItem("token", null);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  function LoginForm() {
    return (
      <div className="container mt-5 mb-5 p-5" style={style}>
        <Form action="/home" method="" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              required
              type="email"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              placeholder="Enter email"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Password"
            />
          </Form.Group>
          <Button
            variant="dark"
            type="submit"
            className="mt-5 ms-auto me-auto"
            style={{ display: "block" }}
          >
            Submit
          </Button>
        </Form>
      </div>
    );
  }

  return (
    <>
      <Header headerTitle="Login" breadCrumb={["Login"]} />
      {LoginForm()}
      <Footer page="Login" />
    </>
  );
}

export default Login;
