import React from 'react'
import './Login.css'

function Login() {
  return (
    <div className='login'>
      <div className="login-box">
        <div className="login-image">
            <img src="../../../images/login.svg" alt="" />
        </div>
        <div className="login-part">
            <h2>Login</h2>
            <input type="email" placeholder='Email' className='login-email'/>
            <input type="password" placeholder='Password' className='login-password' />
            <button className='login-btn'>Login</button><br />
            <small>Create an account ? <span>SignUp</span></small>
        </div>
      </div>
    </div>
  )
}

export default Login