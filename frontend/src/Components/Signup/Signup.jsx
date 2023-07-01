import React from 'react'
import './Signup.css'

function Signup() {
  return (
    <div className='signup'>
    <div className="signup-box">
      <div className="signup-image">
          <img src="../../../images/signup.svg" alt="" />
      </div>
      <div className="signup-part">
          <h2>Login</h2>
          <input type="text" placeholder='Username' className='signup-username' />
          <input type="email" placeholder='Email' className='signup-email'/>
          <input type="password" placeholder='Password' className='signup-password' />
          <button className='signup-btn'>SignUp</button><br />
          <small>Already have an account ? <span>Login</span></small>
      </div>
    </div>
  </div>
  )
}

export default Signup