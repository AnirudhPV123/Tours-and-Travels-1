import React, { useState } from 'react'
import './Signup.css'
import Axios from 'axios'
import { backend_url } from '../../Url'
import { useNavigate } from 'react-router-dom'

function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [emailErr, setEmailErr] = useState(false)
  const navigate = useNavigate();


  const handleSignup = (e) => {
    e.preventDefault();

    const email_pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;



    if (!name || !email || !password || !email_pattern.test(email) || password.length < 9) {
      if (!name || !email || !password) {
        setError(true)
      }
      if (!email_pattern.test(email)) {
        setEmailErr(true)
      } else {
        setEmailErr(false)
      }
    } else {
      console.log(password)
      Axios.post(`${backend_url}/api/user/signup`, {
        name,
        email,
        password
      }).then((response) => {
        if (response.data.user) {
          navigate('/')
          localStorage.setItem('user', JSON.stringify(response.data.user))
          localStorage.setItem('token', JSON.stringify(response.data.auth))
        } else {
          alert("something went wrong")
        }
      })
    }


  }

  return (
    <div className='signup'>
      <div className="signup-box">
        <div className="signup-image">
          <img src="../../../images/signup.svg" alt="" />
        </div>
        <div className="signup-part">
          <h2>SignUp</h2>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} name='name' placeholder='Username' className='signup-username' /><br />
          {error && !name && <div className="signup-error"><span className='input-validation' >Enter valid name</span></div>}
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} name='email' placeholder='Email' className='signup-email' /><br />
          {error && !email && <div className="signup-error"><span className='input-validation' >Enter valid email</span></div>}
          {emailErr && email && <div className="signup-error"><span className='input-validation' >Enter valid email</span></div>}
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name='password' placeholder='Password' className='signup-password' /><br />
          {error && !password && <div className="signup-error"><span className='input-validation' >Enter valid password</span></div>}
          {password.length < 9 && password && <div className="signup-error"><span className='input-validation' >Password must contains 8 digits</span></div>}
          <button className='signup-btn' onClick={handleSignup} >SignUp</button><br />
          <small>Already have an account ? <span onClick={() => navigate('/login')}>Login</span></small>
        </div>
      </div>
    </div>
  )
}

export default Signup