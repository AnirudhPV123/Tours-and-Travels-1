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

  const [image200, setImage200] = useState('')
  const [image300, setImage300] = useState('')
  const [image400, setImage400] = useState('')
  const [image500, setImage500] = useState('')
  const [image750, setImage750] = useState('')
  const [image1000, setImage1000] = useState('')


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


  var image 
  if(window.innerWidth<=1200){
    image='image300'
  }else{
    image='image400'
  }

  const getProductDetails = () => {
    Axios.get(`${backend_url}/api/admin/get-product-details/${location.state.id}/${image}`, {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem('adminToken'))}`
      }
    }).then((response) => {
      if (response.data) {
        setProductDetails(response.data[0])

        setPlace(response.data[0].place)
        setCountry(response.data[0].country)
        setFeature(response.data[0].feature)
        setPrice(response.data[0].price)
        setDesc(response.data[0].desc)
        setPostImage(response.data[0].postImage)

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
      image200,
      image300,
      image400,
      image500,
      image750,
      image1000  
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
    setPostImage(e.target.files[0])
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


