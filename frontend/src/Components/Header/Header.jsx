import React from 'react'
import './Header.css'
import { Link, parsePath, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2'


import user from '../../img/user.png'
import edit from '../../img/edit.png'
import logout from '../../img/log-out.png'
import help from '../../img/question.png'
import back from '../../img/back.png'
import noProfile from '../../img/noprofil.jpg'
import check from '../../img/check-mark.png'
import login from '../../img/login.png'
import { backend_url } from '../../Url';

import jwt_decode from 'jwt-decode'


function Header() {


  const [open, setOpen] = useState(false);
  const [openMyProfile, setOpenMyProfile] = useState(false)
  const [openEditProfile, setOpenEditProfile] = useState(false)

  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [userId, setUserId] = useState('')
  const [guest, setGuest] = useState(false)

  const [editName, setEditName] = useState('')

  const [editInput, setEditInput] = useState(false)

  const [profileImage, setProfileImage] = useState('')
  const [image75, setImage75] = useState('')
    const [image125, setImage125] = useState('')


  // admin
  const [admin, setAdmin] = useState(false)
  const [masterAdmin, setMasterAdmin] = useState(false)

  let menuRef = useRef();

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
        setOpenMyProfile(false)
        setOpenEditProfile(false)
      }
    };

    document.addEventListener("mousedown", handler);

    checkToken()
    getAuth()
    getAdmin()

    return () => {
      document.removeEventListener("mousedown", handler);
    }

  });

  // my profile
  const handleMyProfile = () => {
    setOpen(false)
    setOpenMyProfile(true)
  }

  const myProfileBackward = () => {
    setOpenMyProfile(false)
    setOpen(true)
  }

  // edit profile
  const handleEditProfile = () => {
    setOpen(false)
    setOpenEditProfile(true)
  }

  const EditProfileBackward = () => {
    setOpenEditProfile(false)
    setOpen(true)
  }

  const handleEditButton = () => {
    const edit = document.querySelector('.my-profile .edit-name')
    edit.style.border = 'var(--secondary-color) 1px solid'

    const checkBtn = document.querySelector('.my-profile .edit-check')
    checkBtn.style.display = 'block'

    setEditInput(true)
  }


  // helps

  const handleHelps = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }


  //auth

  const getAuth = () => {
    const auth = localStorage.getItem('user')
    if (!auth) {
      setUserName('Guest')
      setEmail("null")
      setGuest(true)
    } else {
      setUserName(JSON.parse(auth).name)
      setEmail(JSON.parse(auth).email)
      setUserId(JSON.parse(auth)._id)
      setGuest(false)

      setAdmin(false)


      const id = JSON.parse(auth)._id
      getProfileImage(id)

    }
  }


  const getAdmin = () => {
    const auth = localStorage.getItem('admin')
    const path = location.pathname.split('/')

    if (auth && path[1] == 'admin') {
      setUserName(JSON.parse(auth).name)
      setEmail(JSON.parse(auth).email)
      setUserId(JSON.parse(auth)._id)
      setGuest(false)
      setAdmin(true)

      const masterAdmin = JSON.parse(auth).masterAdmin
      setMasterAdmin(masterAdmin)


      const id = JSON.parse(auth)._id
      getProfileImage(id)
    }
  }



  // profile image base64 
  // const handleProfileImage = async (e) => {
  //   const file = e.target.files[0]
  //   const base64 = await convertToBase64(file);
  //   uploadProfileImage(base64)

  // }


  const handleProfileImage = async (e) => {
    let image_file = e.target.files[0]
    let reader = new FileReader()
    reader.readAsDataURL(image_file)
    reader.onload = (event) => {
      let image_url = event.target.result
      let image = document.createElement("img")
      image.src = image_url

      image.onload = (e) => {
        const setWidth = 125

          let canvas = document.createElement("canvas")
          let ratio = setWidth / e.target.width
          canvas.width = setWidth
          canvas.height = e.target.height * ratio

          const context = canvas.getContext('2d')
          context.drawImage(image, 0, 0, canvas.width, canvas.height)

          let new_image_url = context.canvas.toDataURL("image/webp", 100)
         
          uploadProfileImage(new_image_url)        
      }

    }
  }




  // profile image upload
  const uploadProfileImage = (profileImage) => {
    const data = {
      userId,
      profileImage
    }

    if (!admin) {
      Axios.post(`${backend_url}/api/user/update-profile-image`, data, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      }).then(() => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Profile Image Updated...',
          showConfirmButton: false,
          timer: 1500
        })

        getProfileImage(userId)

      })
    } else {
      Axios.post(`${backend_url}/api/admin/update-profile-image`, data, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem('adminToken'))}`
        }
      }).then(() => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Profile Image Updated...',
          showConfirmButton: false,
          timer: 1500
        })

        getProfileImage(userId)

      })
    }
  }

  // name update
  const handleNameEdit = () => {
    if (editName) {
      const data = {
        userId,
        editName
      }
      Axios.post(`${backend_url}/api/user/update-profile-name`, data, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      }).then(() => {

        const auth = localStorage.getItem('user')
        const email = JSON.parse(auth).email
        const _id = JSON.parse(auth)._id

        localStorage.setItem('user', JSON.stringify({ _id: _id, name: editName, email: email }));


        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'UserName Updated...',
          showConfirmButton: false,
          timer: 1500
        })


        // edit change reverse
        const edit = document.querySelector('.my-profile .edit-name')
        edit.style.border = 'none'

        const checkBtn = document.querySelector('.my-profile .edit-check')
        checkBtn.style.display = 'none'

        setEditInput(false)


      })
    } else {
      setEditInput(false)
      const edit = document.querySelector('.my-profile .edit-name')
      edit.style.border = 'none'

      const checkBtn = document.querySelector('.my-profile .edit-check')
      checkBtn.style.display = 'none'
    }
  }

  //get profile Image
  const getProfileImage = (id) => {
    if (!admin) {
      Axios.get(`${backend_url}/api/user/get-profile-image/${id}`, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      }).then((response) => {
        if (response.data.result) {

        } else {
          setProfileImage(response.data)
        }

      })
    } else if (admin) {
      Axios.get(`${backend_url}/api/admin/get-profile-image/${id}`, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem('adminToken'))}`
        }
      }).then((response) => {
        if (response.data.result) {

        } else {
          setProfileImage(response.data)
        }

      })
    }
  }


  // logout
  const handleLogout = () => {
    localStorage.clear();
    getAuth()
    window.location.reload()
  }

  // check token expires 
  const checkToken = () => {
    let token = localStorage.getItem('token');
    if (token) {
      let decodedToken = jwt_decode(token);
      let currentDate = new Date();

      // JWT exp is in seconds
      if (decodedToken.exp * '30d' < currentDate.getTime()) {
        localStorage.clear();
      }
    }
  }



  return (
    <div className="header-main">


      <div className='header'>
        <img src="../../../images/logo-2.jpg" alt="" className='logo' />
        <ul className='nav-ul' >
          {!admin ?
            <> <li><Link to='/' >Home</Link></li>
              <li><Link to='/tour' >Tour</Link></li>
              <li><Link to='/cart' >Cart</Link></li> </>
            :
            <> <li><Link to='/admin' >Home</Link></li>
              <li><Link to='/admin/add-product' >Add Tour</Link></li>
              {masterAdmin && <li><Link to='/admin/add-admin' >Add Admin</Link></li>}
              <li><Link to='/admin/booked' >Booked</Link></li>
              <li><Link to='/admin/users' >Users</Link></li>
              {masterAdmin && <li><Link to='/admin/admins' >Admins</Link></li>}
            </>
          }
        </ul>

        <div className='menu-container' ref={menuRef}>
          <div className='menu-trigger' onClick={() => { setOpen(!open) }}>
            {(!guest && profileImage) ? <img src={profileImage}></img> : <img src={noProfile}></img>}
          </div>

          <div className={`dropdown-menu ${open ? 'active' : 'inactive'}`} >
            <div className="top-profile">
              {(!guest && profileImage) ? <img src={profileImage} style={{ aspectRatio: '1/1' }} className='profileImage' alt="" /> : <img src={noProfile} className='profileImage' alt="" />}<h3>{userName}</h3>
            </div>
            <ul>
              <li className='dropdownItem'>
                <img src={user}></img>
                <a onClick={handleMyProfile}> My Profile </a>
              </li>
              {!guest && <li className='dropdownItem'>
                <img src={edit}></img>
                <a onClick={handleEditProfile} > Edit Profile </a>
              </li>}
              {!admin && <li className='dropdownItem'>
                <img src={help}></img>
                <a onClick={handleHelps} > Helps </a>
              </li>}
              <li className='dropdownItem'>
                {!guest ?
                  <><img src={logout}></img> <a onClick={handleLogout} > Logout </a></>
                  :
                  <><img src={login}></img> <a onClick={() => {
                    setOpen(false)
                    navigate('/login')
                  }}> Login </a></>}
              </li>
            </ul>
          </div>

          {/* my profile */}
          <div className={`my-profile ${openMyProfile ? 'active' : 'inactive'}`}>
            <img src={back} className='backward' style={{ cursor: 'pointer' }} onClick={myProfileBackward} />
            <div className="profileImage">
              {(!guest && profileImage) ?
                <img src={profileImage} style={{ aspectRatio: 1 / 1 }} />
                : <img src={noProfile} alt="" />}
            </div>

            <ul>
              <li className='dropdownItem'>
                <a>Name : <span>{userName}</span></a>
              </li>
              <li className='dropdownItem'>
                <a >Email : <span>{email}</span></a>
              </li>
            </ul>

          </div>



          {/* edit profile  we use same my profile layout */}
          {!guest && <div className={`my-profile ${openEditProfile ? 'active' : 'inactive'}`}>
            <img src={back} style={{ cursor: 'pointer' }} className='backward' onClick={EditProfileBackward} />
            <div className='uploadWrapper' >
              <div className="upload">
                {profileImage ? <img className='upload-image' src={profileImage} style={{ aspectRatio: '1/1' }} alt="" /> : <img className='upload-image' src={noProfile} alt="" />}
                <div className="round">
                  <input type="file" accept='.jpeg , .jpg , .png , .webp' onChange={(e) => handleProfileImage(e)} />
                  <i className="fa fa-camera" style={{ color: '#fff' }}></i>
                </div>
              </div>
            </div>

            <ul>
              {!admin ? <li className='dropdownItem'>
                <a>Name : <span><input type="text" disabled={!editInput && 'disabled'} style={{ background: '#fff' }} placeholder={userName} onChange={(e) => setEditName(e.target.value)} className='edit-name' /></span></a>
                <img style={{ cursor: 'pointer' }} src={edit} onClick={handleEditButton} alt="" />
                <img style={{ cursor: 'pointer' }} onClick={handleNameEdit} src={check} className='edit-check' alt="" />
              </li> :
                <li className='dropdownItem'>
                  <a>Name : <span>{userName}</span></a>
                </li>
              }
              <li className='dropdownItem'>
                <a >Email : <span>{email}</span></a>
              </li>
            </ul>

          </div>}

        </div>

      </div>
    </div>

  )
}


export default Header


function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result)
    };
    fileReader.onerror = (error) => {
      reject(error)
    }
  })
}
