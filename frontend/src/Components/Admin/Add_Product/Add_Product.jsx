import React, { useEffect, useRef, useState } from 'react'
import './Add_Product.css'
import Axios from 'axios'
import { backend_url } from '../../../Url'
import { useNavigate } from 'react-router-dom'

function Add_Product() {
  const [place, setPlace] = useState('')
  const [country, setCountry] = useState('')
  const [feature, setFeature] = useState('')
  const [price, setPrice] = useState('')
  const [desc, setDesc] = useState('')
  const [postImage, setPostImage] = useState('')
  const [error, setError] = useState(false)

  let formRef = useRef();
  const navigate = useNavigate()

  useEffect(() => {
    const admin = localStorage.getItem('admin')
    if (!admin) {
      navigate('/admin/login')
    }
  }, [])



  const createPost = async () => {
    try {
      const data = {
        place,
        country,
        feature,
        price,
        desc,
        postImage
      }
      Axios.post(`${backend_url}/api/admin/add-product`, data, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem('adminToken'))}`
        }
      }).then((response) => {
        if (response.data.acknowledged) {
          setPlace('')
          setCountry('')
          setFeature('')
          setPrice('')
          setDesc('')
          setPostImage('')
          setError(false)
          formRef.current.reset();
        } else {
          alert("Something went wrong ?")
        }
      })

    } catch (error) {
      console.log(error)
    }
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
        <h1>Add Product</h1>
        <form ref={formRef} onSubmit={handleSubmit}>
          {error && place && country && feature && price && desc && !postImage && <div className="add-error"><span className='input-validation' >Everything must be required</span></div>}
          <input type="text" value={place} onChange={(e) => setPlace(e.target.value)} placeholder='Place' className='ap-place' />
          {error && !place && <div className="add-error"><span className='input-validation' >Place must be required</span></div>}
          <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} placeholder='Country' className='ap-country' />
          {error && !country && <div className="add-error"><span className='input-validation' >Country must be required</span></div>}
          <input type="text" value={feature} onChange={(e) => setFeature(e.target.value)} placeholder='Feature' className='ap-feature' />
          {error && !feature && <div className="add-error"><span className='input-validation' >Feature must be required</span></div>}
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder='Price per person' className='ap-price' /><br />
          {error && !price && <div className="add-error"><span className='input-validation' >Price must be required</span></div>}
          <input type="text" value={desc} onChange={(e) => setDesc(e.target.value)} placeholder='Description' className='ap-desc' />
          {error && !desc && <div className="add-error"><span className='input-validation' >Description must be required</span></div>}
          <input type="file" /*lable='Image' name='myFile' id='file-upload'*/ accept='.jpeg , .jpg , .png , .webp' className='ap-choose-file' onChange={(e) => handleFileUpload(e)} /><br />
          {error && !postImage && <div className="add-error"><span className='input-validation' >Image must be required</span></div>}
          <button type='submit' className='ap-upload'>Upload</button>
        </form>
      </div>
    </div>
  )
}

export default Add_Product



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