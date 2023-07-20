import React, { useEffect, useRef, useState } from 'react'
import './Add_Product.css'
import Axios from 'axios'
import { backend_url } from '../../../Url'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

function Add_Product() {
  const [place, setPlace] = useState('')
  const [country, setCountry] = useState('')
  const [feature, setFeature] = useState('')
  const [price, setPrice] = useState('')
  const [desc, setDesc] = useState('')
  const [postImage, setPostImage] = useState(false)
  const [image200, setImage200] = useState('')
  const [image300, setImage300] = useState('')
  const [image400, setImage400] = useState('')
  const [image500, setImage500] = useState('')
  const [image750, setImage750] = useState('')
  const [image1000, setImage1000] = useState('')

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
        image200,
        image300,
        image400,
        image500,
        image750,
        image1000
      }
      Axios.post(`${backend_url}/api/admin/add-product`, data, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem('adminToken'))}`
        }
      }).then((response) => {
        if (response.data.acknowledged) {

          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
          })

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
    setPostImage(true)
    let image_file = e.target.files[0]
    let reader = new FileReader()
    reader.readAsDataURL(image_file)
    reader.onload = (event) => {
      let image_url = event.target.result
      let image = document.createElement("img")
      image.src = image_url

      image.onload = (e) => {
        const setWidth = [200, 300, 400, 500, 750, 1000]

        for (let i = 0; i <= setWidth.length; i++) {
          let canvas = document.createElement("canvas")
          let ratio = setWidth[i] / e.target.width
          canvas.width = setWidth[i]
          canvas.height = e.target.height * ratio

          const context = canvas.getContext('2d')
          context.drawImage(image, 0, 0, canvas.width, canvas.height)

          let new_image_url = context.canvas.toDataURL("image/webp", 100)

          if (i === 0) {
            setImage200(new_image_url)
          } else if (i === 1) {
            setImage300(new_image_url)
          } else if (i === 2) {
            setImage400(new_image_url)
          } else if (i === 3) {
            setImage500(new_image_url)
          } else if (i === 4) {
            setImage750(new_image_url)
          } else if (i === 5) {
            setImage1000(new_image_url)
          }
        }

        {

        }
      }

    }
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
