
import React, { useEffect, useState } from 'react'
import './Featured.css'
import Axios from 'axios'
import { backend_url } from '../../Url'
import { useNavigate } from 'react-router-dom'

function Featured() {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [cardLimit, setCardLimit] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    if (window.innerWidth < 900) {
      setCardLimit(6)
    } else {
      setCardLimit(8)
    }

    getProduct()
  }, [])

  var image
  if(window.innerWidth<=450){
     image = 'image200'
  }else if((450<window.innerWidth)&&(window.innerWidth<=1200)){
     image = 'image300'
  }else if((1200<window.innerWidth)&&(window.innerWidth<=1500)){
     image = 'image400'
  }else if(window.innerWidth>1500){
     image = 'image500'
  }

  const getProduct = async() => {
    Axios.get(`${backend_url}/api/user/get-products/${image}`).then(async(response) => {
      setFeaturedProducts(response.data)
    })
  }


  return (
    <>
      <div className="cards-main-body">
        <div className="cards-mb-header">
          <p>Explore</p>
          <h1>Our Featured Tours</h1>
        </div>
        <div className="cards">

          {featuredProducts.map((obj, index) => {

            if (index + 1 <= cardLimit) {
              return (
                <div className="card" key={index} onClick={() => { navigate('/book-now', { state: { id: obj._id } }) }} >
                  <div className="image">
                    <img src={obj.postImage} style={{ aspectRatio: '3/2' }} alt="" />
                    <h4>Featured</h4>
                  </div>
                  <div className="desc">
                    <h6>{obj.place} , {obj.country}</h6>
                    <h3>{obj.feature}</h3>
                    <h5><span>${obj.price}</span>/per person</h5>
                  </div>
                </div>
              )
            }
          })}

        </div>
      </div>
    </>
  )
}

export default Featured