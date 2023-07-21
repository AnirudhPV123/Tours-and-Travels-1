import React, { useEffect, useState } from 'react'
import './Cart.css'
import { useNavigate } from 'react-router-dom'
import Axios from 'axios'
import { backend_url } from '../../Url'
import Swal from 'sweetalert2'


function Cart() {
  const navigate = useNavigate()

  const [userId, setUserId] = useState('')
  const [cartItems, setCartItems] = useState([])
  const [noItems, setNoItems] = useState(false)

  useEffect(() => {
    const auth = localStorage.getItem('user')
    if (!auth) {
      navigate('/signup')
    } else {
      const userId = JSON.parse(auth)._id;
      setUserId(userId)

      getLoading('open')
      getCartItems(userId)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [])


  var image
  if(window.innerWidth<=450){
     image = 'image200'
  }else if((450<window.innerWidth)&&(window.innerWidth<=1200)){
     image = 'image200'
  }else if((1200<window.innerWidth)&&(window.innerWidth<=1500)){
     image = 'image300'
  }else if(window.innerWidth>1500){
     image = 'image500'
  }


  const getCartItems = (userId) => {
    Axios.get(`${backend_url}/api/user/get-cart-items/${userId}/${image}`, {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    }).then((response) => {
      if(response.data.length>0){
        setCartItems(response.data)
      }else{
        setNoItems(true)
        setCartItems(response.data)
      }
      getLoading()
    })
  }

  // loading
  const getLoading=(loading)=>{
    if(loading==='open'){
      Swal.showLoading()
    }else{
      Swal.close()
    }
  }


  const handleDelete = (productId) => {

    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteItem(productId)
      }
    })
  }

  const deleteItem = (productId) => {
    const proDetails = {
      userId,
      productId
    }
    Axios.post(`${backend_url}/api/user/delete-cart-item`, proDetails, {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    }).then(() => {
      getCartItems(userId)
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your cart item has been deleted...',
        showConfirmButton: false,
        timer: 1500
      })
    })
  }


  return (
    <div className='cart' >
      <div className="cart-box">
        {noItems && <h2  >Your Tour Cart is empty...</h2>}

        {cartItems.map((obj, index) => {
          return (
            <>
              {window.innerWidth > 800 ?

                <div className="cart-row" key={index} >
                  <div className="cart-image">
                    <img src={obj.postImage} style={{ aspectRatio: '3/2' }} alt="" />
                  </div>
                  <div className="cart-details">
                    <h3>{obj.feature}</h3>
                    <h4>{obj.place} , {obj.country}</h4>
                    <p>{obj.desc}</p>
                  </div>
                  <div className="price">
                    <h3><span>$ {obj.price}</span>/person</h3>
                  </div>
                  <div className="cart-buttons">
                    <button className='cart-buy' onClick={() => { navigate('/book-now', { state: { id: obj.productId } }) }} >Book Now</button>
                    <button className='cart-delete' onClick={() => handleDelete(obj.productId)} >Delete</button>
                  </div>
                </div>
                :
                <div className='mobile-cart-row'>
                  <div className="mobile-top-details">
                    <div className="mobile-top-image">
                      <img src={obj.postImage} style={{aspectRatio:'3/2'}} alt="" />
                    </div>
                    <div className="mobile-top-text">
                      <h3>{obj.feature}</h3>
                      <h4>{obj.place} , {obj.country}</h4>
                      <h5><span>{obj.price}</span>/person</h5>
                    </div>
                  </div>
                  <div className="mobile-top-desc">
                    <p>{obj.desc}</p>
                  </div>
                  <div className="cart-buttons">
                    <button className='cart-buy' onClick={() => { navigate('/book-now', { state: { id: obj.productId } }) }} >Book Now</button>
                    <button className='cart-delete' style={{ backgroundColor: '#DC3545' }} onClick={() => handleDelete(obj.productId)} >Delete</button>
                  </div>
                </div>
              }
            </>
          )
        })}






      </div>
    </div>
  )
}

export default Cart