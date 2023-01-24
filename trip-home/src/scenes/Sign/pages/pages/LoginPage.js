import React, { useState } from 'react';
import './login.css';

import Navbar from "./components/navbar";
import { Login } from "./components/login";
import { Register } from "./components/register";

function LoginPage() {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm =  (formName) => {
    setCurrentForm(formName);
  }


  return (
    <>
      <div className="navbar">
        <Navbar />
      </div>
      <div className="App">
        {currentForm === 'login' ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />}
      </div>
    </>
  );
}

export default LoginPage;
