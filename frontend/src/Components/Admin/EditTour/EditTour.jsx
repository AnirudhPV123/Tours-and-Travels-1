import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Axios from 'axios'
import { backend_url } from '../../../Url'
import Swal from 'sweetalert2'

function EditTour() {
  const location = useLocation()
  const [productDetails, setProductDetails] = useState('')

  const [place, setPlace] = useState('')
  const [country, setCountry] = useState('')
  const [feature, setFeature] = useState('')
  const [price, setPrice] = useState('')
  const [desc, setDesc] = useState('')
  const [postImage, setPostImage] = useState('')
  const [error, setError] = useState(false)

  const navigate = useNavigate()
  let formRef = useRef();


  useEffect(() => {
    const admin = localStorage.getItem('admin')
    if (!admin) {
      navigate('/admin/login')
    } else {
      if (location.state) {
        getProductDetails()
      }
    }
  }, [])

  const getProductDetails = () => {
    Axios.get(`${backend_url}/api/admin/get-product-details/${location.state.id}`, {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem('adminToken'))}`
      }
    }).then((response) => {
      if (response.data) {
        setProductDetails(response.data)

        setPlace(response.data.place)
        setCountry(response.data.country)
        setFeature(response.data.feature)
        setPrice(response.data.price)
        setDesc(response.data.desc)
        setPostImage(response.data.postImage)

      }
    })
  }



  const createPost = async () => {
    const data = {
      place,
      country,
      feature,
      price,
      desc,
      postImage
    }
    Axios.post(`${backend_url}/api/admin/update-product/${productDetails._id}`, data, {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem('adminToken'))}`
      }
    }).then((response) => {
      if (response.data.result) {
        Swal.fire(response.data.result);
      } else {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Tour data updated...',
          showConfirmButton: false,
          timer: 1500
        })
        navigate('/admin')
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!place || !country || !feature || !price || !desc || !postImage) {
      setError(true)
    } else {
      createPost()
    }
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setPostImage(base64)
  }




  return (
    <div className='add-product'>
      <div className="add-product-box">
        <h1>Update Tour</h1>
        <form ref={formRef} onSubmit={handleSubmit}>
          {error && place && country && feature && price && desc && !postImage && <div className="add-error"><span className='input-validation' >Everything must be required</span></div>}
          <input type="text" value={place} onChange={(e) => setPlace(e.target.value)} className='ap-place' />
          {error && !place && <div className="add-error"><span className='input-validation' >Place must be required</span></div>}
          <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} className='ap-country' />
          {error && !country && <div className="add-error"><span className='input-validation' >Country must be required</span></div>}
          <input type="text" value={feature} onChange={(e) => setFeature(e.target.value)} className='ap-feature' />
          {error && !feature && <div className="add-error"><span className='input-validation' >Feature must be required</span></div>}
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className='ap-price' /><br />
          {error && !price && <div className="add-error"><span className='input-validation' >Price must be required</span></div>}
          {/* <input type="text" value={desc} onChange={(e)=>setDesc(e.target.value)} placeholder={productDetails.desc} className='ap-desc' /> */}
          <textarea style={{ height: '10vh', width: '80%', outline: 'none', border: 'none', marginTop: 15, borderRadius: 5, resize: 'none', paddingLeft: 10, paddingTop: 10 }} value={desc} onChange={(e) => setDesc(e.target.value)} className='ap.desc' ></textarea>
          {error && !desc && <div className="add-error"><span className='input-validation' >Description must be required</span></div>}
          <img src={postImage} style={{ width: '60%', height: 'auto', borderRadius: 8, marginTop: 20, aspectRatio: '3/2' }} alt="" />
          <input type="file" /*lable='Image' name='myFile' id='file-upload'*/ accept='.jpeg , .jpg , .png , .webp' className='ap-choose-file' onChange={(e) => handleFileUpload(e)} /><br />
          <button type='submit' className='ap-upload'>Upload</button>
        </form>
      </div>
    </div>
  )
}

export default EditTour


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