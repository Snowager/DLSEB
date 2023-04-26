import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';
import user_data from "../../../TestingDatabase/pages/user.json";

function Navbar() {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
    const [button, setButton] = useState(true);

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };

    useEffect(() => {
        showButton();
    }, []);

    window.addEventListener('resize', showButton);

   
  return (
    <>

       <div className="">
           <nav className= "navbar navbar-opaque" >
            <div className= "navbar-container">
                <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                    TR!P <i className="fa fa-solid fa-plane" />
                </Link>
                <div className="menu-icon" onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'}/>
                   </div>
                   <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li className='nav-item'>
                        {user_data.id === "399" ? 
                        <Link to ='/register' className='nav-links' onClick={closeMobileMenu}>
                            Sign Up
                        </Link>
                        : null}
                    </li>
                    <li className='nav-item'>
                    {user_data.id === "399" ?
                        <Link to ='/login' className='nav-links' onClick={closeMobileMenu}>
                            Sign In
                        </Link>
                        : 
                        <Link to ='/login' className='nav-links' onClick={closeMobileMenu}>
                            My Profile
                        </Link>
                    }
                    </li>
                    <li className='nav-item'>
                        <Link to ='/about' className='nav-links' onClick={closeMobileMenu}>
                            About Us
                        </Link>
                    </li>
                </ul>
            </div>
            </nav>
       </div>
    </>
  )
}

export default Navbar 