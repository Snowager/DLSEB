import React, { useState } from 'react';
import '../styles/login.css';

import Navbar from '../../components/fragments/navbar';
import { Login } from '../../components/fragments/login';
import { Register } from '../../components/fragments/register';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script'; 

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
