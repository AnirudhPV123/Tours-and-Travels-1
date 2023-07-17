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

  useEffect(() => {
    const auth = localStorage.getItem('user')
    if (!auth) {
      navigate('/signup')
    } else {
      const userId = JSON.parse(auth)._id;
      setUserId(userId)

      getCartItems(userId)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [])

  const getCartItems = (userId) => {
    Axios.get(`${backend_url}/api/user/get-cart-items/${userId}`, {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    }).then((response) => {
      setCartItems(response.data)
    })
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
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
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
    })
  }


  return (
    <div className='cart' >
      <div className="cart-box">
        {cartItems.length == 0 && <h2>Your Tour Cart is empty...</h2>}

        {cartItems.map((obj, index) => {
          return (
            <>
              {window.innerWidth > 800 ?

                <div className="cart-row" key={index} >
                  <div className="cart-image">
                    <img src={obj.product.postImage} style={{ aspectRatio: '3/2' }} alt="" />
                  </div>
                  <div className="cart-details">
                    <h3>{obj.product.feature}</h3>
                    <h4>{obj.product.place} , {obj.product.country}</h4>
                    <p>{obj.product.desc}</p>
                  </div>
                  <div className="price">
                    <h3><span>$ {obj.product.price}</span>/person</h3>
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
                      <img src="../../images/tokyo.webp" alt="" />
                    </div>
                    <div className="mobile-top-text">
                      <h3>Cherry Blossams</h3>
                      <h4>Tokyo , Japan</h4>
                      <h5><span>$324</span>/person</h5>
                    </div>
                  </div>
                  <div className="mobile-top-desc">
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
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