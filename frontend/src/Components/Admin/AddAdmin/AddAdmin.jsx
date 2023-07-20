import React, { useEffect, useRef, useState } from 'react'
import './AddAdmin.css'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { backend_url } from '../../../Url'
import Swal from 'sweetalert2'

function AddAdmin() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const [emailErr, setEmailErr] = useState(false)

    const [checked, setChecked] = React.useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const admin = localStorage.getItem('admin')
        if (!admin) {
            navigate('/admin/login')
        }
    }, [])


    const handleUplaod = (e) => {
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
            const data = {
                name,
                email,
                password,
                masterAdmin: checked
            }
            Axios.post(`${backend_url}/api/admin/add-admin`, data, {
                headers: {
                    authorization: `bearer ${JSON.parse(localStorage.getItem('adminToken'))}`
                }
            }).then(() => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your work has been saved',
                    showConfirmButton: false,
                    timer: 1500
                })

                setName('')
                setEmail('')
                setPassword('')
                setError(false)
                let inputs = document.getElementById('checkId');
                inputs.checked = false;
                setChecked(false)
            })
        }


    }

    const handleChange = () => {
        setChecked(!checked);
    };


    return (
        <div className='add-admin'>
            <div className="admin-box">
                <div className="admin-image">
                    <img src="../../../images/signup.svg" alt="" />
                </div>
                <div className="admin-part">
                    <h2>Add Admin</h2>
                    <div style={{ width: '65%', height: 20, textAlign: 'left', margin: 'auto' }}>
                        <label >
                            <input type="checkbox" id="checkId" value={!checked && ''} onChange={handleChange} style={{ height: 15, width: 15, marginRight: 10 }} />
                            Master Admin
                        </label><br />
                    </div>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} name='name' placeholder='Username' className='admin-username' /><br />
                    {error && !name && <div className="admin-error"><span className='input-validation' >Enter valid name</span></div>}
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} name='email' placeholder='Email' className='admin-email' /><br />
                    {error && !email && <div className="admin-error"><span className='input-validation' >Enter valid email</span></div>}
                    {emailErr && email && <div className="admin-error"><span className='input-validation' >Enter valid email</span></div>}
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name='password' placeholder='Password' className='admin-password' /><br />
                    {error && !password && <div className="admin-error"><span className='input-validation' >Enter valid password</span></div>}
                    {password.length < 9 && password && <div className="admin-error"><span className='input-validation' >Password must contains 8 digits</span></div>}
                    <button className='admin-btn' onClick={handleUplaod} >Upload</button><br />
                </div>
            </div>
        </div>
    )
}

export default AddAdmin               