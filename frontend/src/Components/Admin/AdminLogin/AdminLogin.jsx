import React, { useState } from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { backend_url } from '../../../Url'

function AdminLogin() {
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
      Axios.post(`${backend_url}/api/admin/login`, {
        email,
        password
      }).then((response) => {
        if (response.data.admin) {
          navigate('/admin')
          localStorage.setItem('admin', JSON.stringify(response.data.admin))
          localStorage.setItem('adminToken', JSON.stringify(response.data.auth))
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

export default AdminLogin