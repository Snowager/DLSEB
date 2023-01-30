import React, { useState, useEffect } from 'react';
import '../styles/login.css';

import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script'; 

function App() {
  const [ profile, setProfile ] = useState([]);
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
      setProfile(res.profileObj);
  };

  const onFailure = (err) => {
      console.log('failed', err);
  };

  const logOut = () => {
      setProfile(null);
  };

  return (
      <div classname = "App">
          <h2>React Google Login</h2>
          <br />
          <br />
          {profile ? (
        <div classname = "auth-form-container">
                  <img src={profile.imageUrl} alt="user image" />
                  <h3>User Logged in</h3>
                  <p>Name: {profile.name}</p>
                  <p>Email Address: {profile.email}</p>
                  <br />
                  <br />
                  <GoogleLogout clientId={clientId} buttonText="Log out" onLogoutSuccess={logOut} />
              </div>
          ) : (
              <GoogleLogin
                  clientId={clientId}
                  buttonText="Sign in with Google"
                  onSuccess={onSuccess}
                  onFailure={onFailure}
                  cookiePolicy={'single_host_origin'}
                  isSignedIn={true}
              />
          )}
          
      </div>
  );
}
export default App;