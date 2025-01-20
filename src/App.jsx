import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthForm from "./components/AuthForm";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import QrScan from "./components/QrScan";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/login"
          element={!isLoggedIn ? <AuthForm /> : <Home />}
        />
        <Route
          path="/home"
          element={isLoggedIn ? <Home /> : <AuthForm />}
        />
        <Route path="/qr" element = {<QrScan/>}/>
      </Routes>
    </Router>
  );
};

export default App;
