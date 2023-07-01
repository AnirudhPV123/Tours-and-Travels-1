import React from 'react'
import './Add_Product.css'

function Add_Product() {
  return (
    <div className='add-product'>
      <div className="add-product-box">
        <h1>Add Product</h1>
        <input type="text" placeholder='Place' className='ap-place' />
        <input type="text" placeholder='Country' className='ap-country' />
        <input type="text" placeholder='Feature' className='ap-feature' />
        <input type="number" placeholder='Price per person' className='ap-price' /><br />
        <input type="file" className='ap-choose-file'/><br />
        <button className='ap-upload'>Upload</button>
      </div>
    </div>
  )
}

export default Add_Product