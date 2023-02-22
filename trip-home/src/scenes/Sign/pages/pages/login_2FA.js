import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, signInWithEmailAndPassword, signInWithGoogle } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import "../styles/login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const [user_name, setUser_name] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [expandForm, setExpandForm] = useState(false);
  const [OTP, setOTP] = useState('');
  const navigate = useNavigate();

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
      }
    }, auth);
  }

  const requestOPT = (e) => {
    e.preventDefault();
    if (phone_number.length >= 12) {
      setExpandForm(true);
      generateRecaptcha();
      let appVerifier = window.recaptchaVerifier;
      signInWithPhoneNumber(auth, phone_number, appVerifier)
        .then(confirmationResult => {
          window.confirmationResult = confirmationResult;
        }).catch((error) => {
          // Error; SMS not sent
          console.log(error);
        });
    }
  }

  const verifyOTP = (e) => {
    let otp = e.target.value;
    setOTP(otp);
    if(otp.length === 6) {
      // verify otp
      let confirmationResult = window.confirmationResult;
      confirmationResult.confirm(otp).then((result) => {
        // User signed in successfully.
        const user = result.user;
        // ...
      }).catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
      });
    }
  }


  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/dashboard");
  }, [user, loading]);

  return (
    <div className="login">
      <div className="login__container">
        <input
          type="text"
          className="login__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="login__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <input
          type="text"
          className="login__textBox"
          value={user_name}
          onChange={(e) => setUser_name(e.target.value)}
          placeholder="Username"
        />
        
        <form onSubmit = {requestOPT}>
          {/* Input phone number */}
          <div>
            <input
              type="tel"
              className="login__textBox"
              value={phone_number}
              onChange={(e) => setPhone_number(e.target.value)}
              placeholder="Phone number"
            />
          </div>
          {expandForm === true?
          <>
            <input
            type="number"
            className="login__textBox"
            id="otpInput"
            value={OTP}
            onChange={verifyOTP}
            placeholder="Enter your one time pin."
            />
          </>
          :
          null
          }
          { expandForm === false?
            <button type="submit" className ="login__btn">
              Request OPT
            </button>
            :
            null
          }
          <div id="recaptcha-container"></div>
        </form>

        <button
          className="login__btn"
          onClick={() => signInWithEmailAndPassword(email, password)}
        >
          Login
        </button>
        <button className="login__btn login__google" onClick={signInWithGoogle}>
          Login with Google
        </button>
        <div>
          <Link to="/reset">Forgot Password</Link>
        </div>
        <div>
          Don't have an account? <Link to="/register">Register</Link> now.
        </div>
      </div>
    </div>
  );
  }
export default Login;