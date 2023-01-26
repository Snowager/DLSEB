import React, { useState } from 'react';
import '../styles/login.css';

import Navbar from '../../components/fragments/navbar';
import { Login } from '../../components/fragments/login';
import { Register } from '../../components/fragments/register';

function LoginPage() {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm =  (formName) => {
    setCurrentForm(formName);
  }
  
  return (
    <div className="App">
      <div className="auth-form-container">
         {currentForm === 'login' ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />}
      </div>
    </div>
  );
}

export default LoginPage;
