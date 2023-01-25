import React, { useState } from 'react';
import '../styles/login.css';

import Navbar from '../../components/fragments/navbar';
import { Login } from '../../components/fragments/login';
import { Register } from '../../components/fragments/register';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script'; 

function LoginPage() {
  const clientId = '707704172368-21chld3a3c333od4ordt9nvk5kog2cdi.apps.googleusercontent.com';

  useEffect(() => {
   const initClient = () => {
         gapi.client.init({
         clientId: clientId,
         scope: ''
       });
    };
    gapi.load('client:auth2', initClient);
});
const onSuccess = (res) => {
  console.log('success:', res);
};
const onFailure = (err) => {
  console.log('failed:', err);
};
return (
 <GoogleLogin
    clientId={clientId}
    buttonText="Sign in with Google"
    onSuccess={onSuccess}
    onFailure={onFailure}
    cookiePolicy={'single_host_origin'}
    isSignedIn={true}
/>
);
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
