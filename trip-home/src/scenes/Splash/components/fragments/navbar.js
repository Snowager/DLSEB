import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';

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
            <div class="">
                <nav className="navbar navbar-opaque" >
                    <div className="navbar-container">
                        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                            TR!P <i className="fa fa-solid fa-plane" />
                        </Link>
                        <div id="nav-dropdown-hidden" className="menu-icon-splashpage" onClick={handleClick}>
                            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                        </div>
                        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                            <li className='nav-item'>
                                <Link to='/SignUp' className='nav-links' onClick={closeMobileMenu}>
                                    Sign Up
                                </Link>
                            </li>
                            <li className='nav-item'>
                                <Link to='/login' className='nav-links' onClick={closeMobileMenu}>
                                    Sign In
                                </Link>
                            </li>
                            <li className='nav-item'>
                                <Link to='/ManageTrips' className='nav-links' onClick={closeMobileMenu}>
                                    Manage Trips
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