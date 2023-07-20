import React, { useEffect, useState } from 'react'
import './Tour.css'
import Axios from 'axios'
import { backend_url } from '../../Url'
import { v4 as uuidv4 } from 'uuid'  //universal unique id 
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

function Tour() {
  const [products, setProducts] = useState([])
  const [noItems, setNoItems] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    getProduct()
    
  getLoading('open')
  
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
  const getProduct = async () => {
    Axios.get(`${backend_url}/api/user/get-products/${image}`).then(async (response) => {
      setProducts(response.data)
      getLoading()
    })
  }

const getLoading=(loading)=>{
if(loading==='open'){
  Swal.showLoading()
}else{
  Swal.close()
}

}



  const handleSearch = (e) => {
    const key = e.target.value
    if (key) {
      Axios.get(`${backend_url}/api/user/search/${key}/${image}`).then((response) => {
        if(response.data.length>0){
          setProducts(response.data)
        }else{
          setProducts(response.data)
          setNoItems(true)
        }
      })
    } else {
      getProduct()
      setNoItems(false)
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
{noItems && <h3 >No items found...</h3>}
      </div>
    </>
  )
}

export default Tour