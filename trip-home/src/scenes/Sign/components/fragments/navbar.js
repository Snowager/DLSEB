import React from "react"

export default function Navbar() {
    return <nav className='nav'>
        <a href='/' className='site-title'>TR!P</a>
        <ul>
            <li>
                <a href='/login'>Login</a>
            </li>
            <li>
                <a href='/register'>Register</a>
            </li>
        </ul>
    </nav>
}