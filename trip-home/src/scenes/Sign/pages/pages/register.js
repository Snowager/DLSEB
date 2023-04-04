import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from '@apollo/client';
import { auth, registerWithEmailAndPassword, signInWithGoogle } from "./firebase";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import "../styles/register.css";
import {CREATE_TRIP_USER} from '../../../TestingDatabase/GraphQL/inserts.js';

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const [phone_number, setPhone_number] = useState("");
  const [user_name, setUser_name] = useState("");

  const navigate = useNavigate();
  const register = () => {
    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(name, email, password);
  };
  useEffect(() => {
    if (loading) return;
    if (user) navigate.replace("/");
  }, [user, loading]);

  const routeChange = () =>{ 
    let path = '/'; 
    navigate(path);
  }

  //mutation call for adding the user to our personal database
  const [db_register, {db_loading, db_error, db_data}] = useMutation(CREATE_TRIP_USER, {
    variables: {
      email: email,
      password: password,
      phone_number: phone_number, //temporary until we add a field for user to input their phone number
      user_name: user_name, // temporary until we add a field for user to input their user name
      first_name: name.split(" ")[0],
      last_name: name.split(" ")[1]
    }
  });

  return (
    <div className="register">
      <div className="register__container">
        <input
          type="text"
          className="register__textBox"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
        />
        <input
          type="text"
          className="register__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="text"
          className="register__textBox"
          value={user_name}
          onChange={(e) => setUser_name(e.target.value)}
          placeholder="Username"
        />
        <PhoneInput
          type="tel"
          className="phoneInput__btn__Reg"
          country={'us'}
          value={phone_number}
          onChange={(e) => setPhone_number("+" + e)}
        /> 
        <input
          type="password"
          className="register__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button className="register__btn" disabled={db_loading} onClick={() => {
          register();
          db_register();
          routeChange();
        }}>
          Register
        </button>
        <button
          className="register__btn register__google"
          onClick={signInWithGoogle}
        >
          Register with Google
        </button>
        <div>
          Already have an account? <Link to="/login">Login</Link> now.
        </div>
      </div>
    </div>
  );
}
export default Register;
