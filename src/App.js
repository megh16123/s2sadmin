import React from "react";
import Home from "./pages/home";
import Student from "./pages/student";
import Teacher from "./pages/teachers";
import Login from "./pages/login";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const style = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
    height: "30rem",
    fontSize: "xx-large",
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/student" element={<Student />} />
        <Route path="/teacher" element={<Teacher />} />
        <Route
          path="*"
          element={<div style={style}>404 Page Not Found</div>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
