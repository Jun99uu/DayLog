import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useReducer } from "react";
import app from "./firebase";
import LoginPage from "./routes/LoginPage";
import RegisterPage from "./routes/RegisterPage";
import Home from "./routes/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
