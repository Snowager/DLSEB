import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, signInWithGoogle, signin, getUserCredentials } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useLazyQuery, useQuery } from '@apollo/client';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import "../styles/login.css"; 
import {GET_TRIP_USER_BY_EMAIL} from '../../../TestingDatabase/GraphQL/queries.js';
import { Get_User } from "../../components/fragments/get_user_query";

// regex validation
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
const phoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,24}$/

function Login () {
  const nameRef = useRef()
  const errorRef = useRef()
  const [user, loading, error] = useAuthState(auth);

  // variables
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const [success, setSuccess] = useState(false)

  // validate variable
  const [validEmail, setValidEmail] = useState(false)
  const [validPhone, setValidPhone] = useState(false)
  const [validPassword, setValidPassword] = useState(false)

  // input focus variable
  const [emailFocus, setEmailFocus] = useState(false)
  const [phoneFocus, setPhoneFocus] = useState(false)
  const [passwordFocus, setPasswordFocus] = useState(false)

  const [expandForm, setExpandForm] = useState(false);
  const [OTP, setOTP] = useState('');

  const [userInDatabase, setUserInDatabase] = useState(null)
  const [databaseCheck, setDatabaseCheck] = useState(null);
  const [googleUser, setGoogleUser] = useState({email: null})

  const [get_user, {loading: user_loading, error: user_error, data: user_data}] = useLazyQuery(GET_TRIP_USER_BY_EMAIL)
  

  

  const userExists = () => {
    console.log(user_data)
    if(user_data && user_data !== undefined && user_data.trip_user[0]){setUserInDatabase(true)}
    else{setUserInDatabase(false)}
    if (userInDatabase === true) {
      console.log("inside if");
      signInWithGoogle(); 
      routeChange();
    } else {
      console.log("in else");
      setDatabaseCheck(true);
    }
  }

  useEffect(() => {
    
  }, [googleUser])
  

  // use effects to test validation 
  useEffect(() => {
    const result = emailRegex.test(email)
    setValidEmail(result)
  }, [email])

  useEffect(() => {
    const result = phoneRegex.test(phone)
    setValidPhone(result)
  }, [phone])

  useEffect(() => {
    const result = passwordRegex.test(password)
    setValidPassword(result)
  }, [password])

  useEffect(() => {
    setErrorMsg("")
  }, [password])

  // navigation
  const navigate = useNavigate();
  const routeChange = () =>{ 
    let path = '/'; 
    navigate(path);
  }

  // validating all register variables
  const handleSubmit = async (e) => {
    e.preventDefault()
    const v1 = emailRegex.test(email)
    const v2 = phoneRegex.test(phone)
    const v3 = passwordRegex.test(password)
    if (!v1 || !v2 || !v3) {
      setErrorMsg("Invalid Entry")
      return
    } 
    try {
      console.log("Login successful")
      setSuccess(true)
    } catch (error) {
      if (!error?.response) {
        setErrorMsg("No Server Response")
      } else {
        setErrorMsg("Login Failed")
      }
      errorRef.current.focus()
    }
  }

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
      }
    }, auth);
  }
      
  const requestOTP = (e) => {
    e.preventDefault();
    if (phone.length >= 10) {
      setExpandForm(true);
      generateRecaptcha();
      let appVerifier = window.recaptchaVerifier;
      signInWithPhoneNumber(auth, phone, appVerifier)
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
      let confirmationResult = window.confirmationResult;
      confirmationResult.confirm(otp).then((result) => {
        // User signed in successfully.
        const user = result.user;
      }).catch((error) => {
        // User couldn't sign in (bad verification code?)
      });
    }
  }

  return (
    <>
      {success ? (
        <h1>Success</h1>
      ) : (
        <div className="login">
          <div className="login__container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
              {/* input for email */}
              <label>
                Email:
              </label>
              <input
                type="text"
                className="login__textBox"
                value={email}
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                aria-invalid={validEmail ? "false" : "true"}
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
              />
              <div id="errorMessage">
                {emailFocus && email && !validEmail ? <p>Please enter a valid email.</p> : null}
                {!emailFocus && email && !validEmail ? <p>Please enter a valid email.</p> : null}
              </div>

              {/* input for password */}
              <label>
                Password:
              </label>
              <input
                type="password"
                className="login__textBox"
                value={password}
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                aria-invalid={validPassword ? "false" : "true"}
                onFocus={() => setPasswordFocus(true)}
                onBlur={() => setPasswordFocus(false)}
              />
              <div id="errorMessage">
                {passwordFocus && password && !validPassword  ? <p>Please enter a valid password:<ul><li>8-24 characters</li><li>at least one capital letter</li><li>at least one number</li></ul></p> : null}
                {!passwordFocus && password && !validPassword  ? <p>Please enter a valid password:<ul><li>8-24 characters</li><li>at least one capital letter</li><li>at least one number</li></ul></p> : null}
              </div>
              </form>

              {/* phone input form */}
              <form onSubmit = {requestOTP}>
                <label>
                  Phone Number:
                </label>
                <div className="phoneInput__btn">
                  <PhoneInput
                    type="tel"
                    className="phoneInput__btn__Reg"
                    id="phone"
                    country={'us'}
                    value={phone}
                    onChange={(e) => setPhone("+" + e)}
                    required
                    aria-invalid={validPhone ? "false" : "true"}
                    onFocus={() => setPhoneFocus(true)}
                    onBlur={() => setPhoneFocus(false)}
                  /> 
                </div>

                {expandForm === true?
                <>
                  <input
                    type="number"
                    className="otp__textBox"
                    id="otpInput"
                    value={OTP}
                    onChange={verifyOTP}
                    placeholder="Enter your one time pin."
                  />
                  <button className="login__btn" onClick={() => {
                    signin(email, password);
                    routeChange();
                    }}>
                    Login
                  </button>
                </>
                :
                null
                }
                { expandForm === false?
                  <button type="submit" className ="otp__btn">
                    Request OTP
                  </button>
                  :
                  null
                }
                <div id="recaptcha-container"></div>
            </form>

          {/* login with google button */}
          <button className="login__btn login__google" onClick={() => {
            getUserCredentials().then((user) => {
              setGoogleUser(user)
            }).then(get_user({variables: {email: googleUser.email}, 
              onCompleted: userExists()}))
            }}>
            Login with Google
          </button>
          <div>
            {databaseCheck ? (
              <div id="errorMessage2">No account found! Register below.
              </div>
            ) : (
              <div></div>
            )}
          </div>
          <div className="resetRegisterLink">
            <div>
              <Link to="/reset">Forgot Password</Link>
            </div>
            <div>
              Don't have an account? <Link to="/register">Register</Link> now.
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  );
}

export default Login;

