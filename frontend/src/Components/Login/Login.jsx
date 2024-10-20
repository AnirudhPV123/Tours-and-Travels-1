import React, { useState } from 'react'
import './Login.css'
import Axios from 'axios'
import { backend_url } from '../../Url'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [user, setUser] = useState(true)

  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError(true)
    } else {
      Axios.post(`${backend_url}/api/user/login`, {
        email,
        password
      }).then((response) => {
        if (response.data.user) {
          navigate('/')
          localStorage.setItem('user', JSON.stringify(response.data.user))
          localStorage.setItem('token', JSON.stringify(response.data.auth))
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'LoggedIn successfully...',
            showConfirmButton: false,
            timer: 1500
          })
        } else {
          setUser(false)
        }
      })
    }
  }

  return (
    <div className='login'>
      <div className="login-box">
        <div className="login-image">
          <img src="../../../images/login.svg" alt="" />
        </div>
        <div className="login-part">
          <h2>Login</h2>
          {!user && <div className="user-error"><span className='input-validation' >Invalid email or password</span></div>}
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} name='email' placeholder='Email' className='login-email' /><br />
          {error && !email && <div className="login-error"><span className='input-validation' >Enter valid email</span></div>}
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name='password' placeholder='Password' className='login-password' /><br />
          {error && !password && <div className="login-error"><span className='input-validation' >Enter valid password</span></div>}
          <button className='login-btn' onClick={handleLogin}>Login</button><br />
          <small>Create an account ? <span onClick={() => navigate('/signup')}>SignUp</span></small>
        </div>
      </div>
    </div>
  )
}

export default Login