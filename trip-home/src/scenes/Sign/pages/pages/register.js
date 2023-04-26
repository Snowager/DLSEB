import React, { useEffect, useState, useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useLazyQuery } from '@apollo/client';
import { auth, getUserCredentials, registerWithEmailAndPassword, RegisterWithGoogle } from "./firebase";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import "../styles/register.css";
import {CREATE_TRIP_USER} from '../../../TestingDatabase/GraphQL/inserts.js';
import {GET_TRIP_USER_BY_EMAIL} from '../../../TestingDatabase/GraphQL/queries.js';

// regex validation
const nameRegex = /^[a-z ,.'-]+$/i
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
const phoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{6,24}$/

function Register () {
  // references
  const nameRef = useRef()
  const errorRef = useRef()
  const [user, loading, error] = useAuthState(auth);
  const [new_user, setNew_user] = useState(null)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const [success, setSuccess] = useState(false)

  const [validName, setValidName] = useState(false)
  const [validEmail, setValidEmail] = useState(false)
  const [validPhone, setValidPhone] = useState(false)
  const [validPassword, setValidPassword] = useState(false)
  const [validConfirm, setValidConfirm] = useState(false)

  const [nameFocus, setNameFocus] = useState(false)
  const [emailFocus, setEmailFocus] = useState(false)
  const [phoneFocus, setPhoneFocus] = useState(false)
  const [passwordFocus, setPasswordFocus] = useState(false)
  const [confirmFocus, setConfirmFocus] = useState(false)

  // database variables
  const [userInDatabase, setUserInDatabase] = useState(null)
  const [databaseCheck, setDatabaseCheck] = useState(false);

  const [get_user, {loading: user_loading, error: user_error, data: user_data}] = useLazyQuery(GET_TRIP_USER_BY_EMAIL)

  const userExists = (user_data) => {
    if(user_data && user_data !== undefined) {
      console.log("inside if");
      setDatabaseCheck(true);}
    else{
      console.log("in else");
      RegisterWithGoogle().then((user) => 
        setNew_user(user), 
      console.log(new_user)
      );
      routeChange();
    }
  }

  const [db_register, {db_loading, db_error, db_data}] = useMutation(CREATE_TRIP_USER, {
    variables: {
      email: email,
      password: password,
      phone_number: phone, 
      first_name: name.split(" ")[0],
      last_name: name.split(" ")[1],
      user_name: email
    }
  });

  useEffect(() => {
    console.log(new_user)
    if(new_user !== null){
      console.log("more stuff")
    db_register({variables: {
      email: new_user.email,
      password: "RegisteredWithGoogle1!",
      phone_number: new_user.phoneNumber !== null ? new_user.phoneNumber : "+10000000000",
      first_name: new_user.displayName.split(" ")[0],
      last_name: new_user.displayName.split(" ")[1],
      user_name: new_user.email
    }})}
  }, [new_user])

  
    
// useEffects for testing validity
  useEffect(() => {
    nameRef.current.focus()
  }, [])

  useEffect(() => {
    const result = nameRegex.test(name)
    setValidName(result)
  }, [name])

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
    const confirmedPassword = password === confirmPassword
    setValidConfirm(confirmedPassword)
  }, [password, confirmPassword])

  useEffect(() => {
    setErrorMsg("")
  }, [name, password, confirmPassword])

  const navigate = useNavigate();
  const register = () => {
    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(name, email, password);
  };

  const routeChange = () =>{ 
    let path = '/'; 
    navigate(path);
  }

// error handling
  const handleSubmit = async (e) => {
    e.preventDefault()
    const v1 = nameRegex.test(name)
    const v2 = emailRegex.test(email)
    const v3 = phoneRegex.test(phone)
    const v4 = passwordRegex.test(password)
    if (!v1 || !v2 || !v3 || !v4) {
        setErrorMsg("Invalid Entry")
        return
    } 
    try {
        console.log("Registered successfully")
        setSuccess(true)
    } catch (error) {
    if (!error?.response) {
        setErrorMsg("No Server Response")
     } else if (error.response?.status === 400) {
         setErrorMsg("Username Taken")
     } else {
         setErrorMsg("Registration Failed")
     }
     errorRef.current.focus()
      }
    }

  return (
    <>
      {success ? (
        <h1>Success</h1>
      ) : (
        <div className="register">
          <div className="register__container">
            <h1>Register</h1>
            <form onsubmit={handleSubmit}>
              <label>
                Full Name: 
              </label>
              <input
                type="text"
                className="register__textBox"
                ref={nameRef}
                value={name}
                id="name"
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                required
                aria-invalid={validName ? "false" : "true"}
                onFocus={() => setNameFocus(true)}
                onBlur={() => setNameFocus(false)}
              />
              <div id="errorMessage">
                {nameFocus && name && !validName ? <p>Please enter a valid name.</p> : null}
                {!nameFocus && name && !validName ? <p>Please enter a valid name.</p> : null}
              </div>

              <label>
                Email:
              </label>
              <input
                type="text"
                className="register__textBox"
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

              <label>
                Phone Number:
              </label>
              <PhoneInput
                type="tel"
                className="phoneInput__btn__Reg"
                id="phone"
                country={'us'}
                value={phone}
                onChange={(e) => setPhone("+" + e)}
                placeholder="Phone Number"
                required
                aria-invalid={validPhone ? "false" : "true"}
                onFocus={() => setPhoneFocus(true)}
                onBlur={() => setPhoneFocus(false)}
              /> 

              <label>
                Password:
              </label>
              <input
                type="password"
                className="register__textBox"
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
                {passwordFocus && password && !validPassword  ? <p>Please enter a valid password:<ul><li>6-24 characters</li><li>at least one capital letter</li><li>at least one number</li></ul></p> : null}
                {!passwordFocus && password && !validPassword  ? <p>Please enter a valid password:<ul><li>6-24 characters</li><li>at least one capital letter</li><li>at least one number</li></ul></p> : null}
              </div>

              <label>
                Confirm Password:
              </label>
              <input
                type="password"
                className="register__textBox"
                value={confirmPassword}
                id="confirmPassword"
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                required
                aria-invalid={validConfirm ? "false" : "true"}
                onFocus={() => setConfirmFocus(true)}
                onBlur={() => setConfirmFocus(false)}
              />
              <div id="errorMessage">
                {confirmFocus && !validConfirm ? <p>Passwords do not match.</p> : null}
                {!confirmFocus && !validConfirm ? <p>Passwords do not match.</p> : null}
              </div>
            </form>
            {/* register button for email and password */}
            <button className="register__btn" disabled={db_loading} onClick={() => {
              register();
              db_register();
              routeChange();
            }}>
              Register
            </button>

            {/* register button for Google registration */}
            <button
              className="register__btn register__google"
              onClick={() => {
                getUserCredentials().then((user) => {get_user({variables: {email: user.email}, 
                  onCompleted: data =>  userExists(data)})})
              }}>
              Register with Google
            </button>
            <div>
              {databaseCheck ? (
                <div id="errorMessage2">Your account already exists! Login below.
                </div>
              ) : (
                <div></div>
              )}
            </div>
            <div>
              Already have an account? <Link to="/login">Login</Link> now.
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default Register;
