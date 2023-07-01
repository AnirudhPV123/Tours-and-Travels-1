import React from 'react'
import './Header.css'

function Header() {
  return (

    <div className='header'>
        <img src="../../../images/logo-2.jpg" alt="" className='logo' />
        <ul>
            <li><a href="">Home</a></li>
            <li><a href="">Tour</a></li>
            <li><a href="">Booked</a></li>
        </ul>
        <p><a href="">Login</a></p>
    </div>

  )
}

export default Header