import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import app from "./firebase";
import LoginPage from "./routes/LoginPage";
import RegisterPage from "./routes/RegisterPage";
import Home from "./routes/Home";
import DayLog from "./routes/DayLog";
import PrivateRoute from "./routes/PrivateRoute";
import Detail from "./routes/Detail";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  const [isLogined, setIsLogined] = useState(false);

  const auth = getAuth();
  const user = auth.currentUser;
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogined(true);
      } else {
        setIsLogined(false);
      }
    });
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home isLogined={isLogined} />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route
          path="/dayLog"
          element={
            <PrivateRoute>
              <DayLog />
            </PrivateRoute>
          }
        />
        <Route
          path="/daylog/:email/:date"
          element={
            <PrivateRoute>
              <Detail />
            </PrivateRoute>
          }
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
