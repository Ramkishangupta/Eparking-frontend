import React, { useState, useEffect } from "react";
import AuthForm from "./components/AuthForm";
import Navbar from "./components/Navbar";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <>
      {isLoggedIn ? <Navbar /> : <AuthForm />}
    </>
  );
};

export default App;
