import React, { useEffect, useState } from 'react'
import './Tour.css'
import Axios from 'axios'
import { backend_url } from '../../Url'
import { v4 as uuidv4 } from 'uuid'  //universal unique id 
import { useNavigate } from 'react-router-dom'

function Tour() {
  const [products, setProducts] = useState([])
  const [noItems, setNoItems] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    getProduct()
  }, [])

  const getProduct = async () => {
    Axios.get(`${backend_url}/api/user/get-products`).then(async (response) => {
      setProducts(response.data)
    })
  }

  const handleSearch = (e) => {
    const key = e.target.value
    if (key) {
      Axios.get(`${backend_url}/api/user/search/${key}`).then((response) => {
        if (response.data.length > 0) {
          setProducts(response.data)
        } else {
          setNoItems(true)

        }
      })
    } else {
      getProduct()
    }

  }

  return (
    <>
      <div className="search-box">
        <form action="" className="search-bar">
          <input type="text" onChange={handleSearch} placeholder="search" name="search" />
          <button type="submit"><img src="../../../images/search.png" /></button>
        </form>
      </div>

      <div className="cards">
        {noItems && <h3>No items found...</h3>}
        {products.map((obj) => {
          return (
            <div className="card" key={uuidv4()} onClick={() => { navigate('/book-now', { state: { id: obj._id } }) }} >
              <div className="image">
                <img src={obj.postImage} style={{ aspectRatio: '3/2' }} alt='tour image' />
                <h4>Featured</h4>
              </div>
              <div className="desc">
                <h6>{obj.place} , {obj.country}</h6>
                <h3>{obj.feature}</h3>
                <h5><span>{obj.price}</span>/per person</h5>
              </div>
            </div>
          );
        })}

      </div>
    </>
  )
}

export default Tour