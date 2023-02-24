import React, { Component } from 'react';
import '../styles/travel_section.css';
import Login from '../../../Sign/pages/pages/login_2FA';
import Navbar from './navbar';



const LoginPage = (props) => {

  return (
    <div className='travel-continer'>
      <Navbar> </Navbar>
      <Login></Login>
    </div>
  )
}

export default LoginPage