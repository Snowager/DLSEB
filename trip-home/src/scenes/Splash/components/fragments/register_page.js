import React, { Component } from 'react';
import '../styles/travel_section.css';
import Register from '../../../Sign/pages/pages/register';
import Navbar from './navbar';



const RegisterPage = (props) => {

  return (
    <div className='travel-continer'>
      <Navbar> </Navbar>
      <Register></Register>
    </div>
  )
}

export default RegisterPage