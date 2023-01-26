import React, { useState } from 'react';
import '../styles/login.css';

import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script'; 

function LoginGooglePage() {
  const clientId = '707704172368-21chld3a3c333od4ordt9nvk5kog2cdi.apps.googleusercontent.com';

  const useEffect = () => {
   const initClient = () => {
         gapi.client.init({
         clientId: clientId,
         scope: ''
       });
    };
    gapi.load('client:auth2', initClient);
    }
    const onSuccess = (res) => {
    console.log('success:', res);
    };
    const onFailure = (err) => {
    console.log('failed:', err);
    };

return (
    <div className="App">
      <div className="auth-form-container">
        <GoogleLogin
          clientId={clientId}
          buttonText="Sign in with Google"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
          isSignedIn={true}
        />
      </div>
    </div>
  );
}

export default LoginGooglePage;