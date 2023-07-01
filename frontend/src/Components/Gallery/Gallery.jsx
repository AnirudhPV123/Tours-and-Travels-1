import React from 'react'
import './Gallery.css'

function Gallery() {
  return (
    <div className='gallery'>
        <div className="gallery-box">
            <p>Gallery</p>
            <h1>Visit our customer's tour gallery</h1>
            <div class="row">
        <div class="column">
          <img src="../../../images/gallery-1.jpg"/>
          <img src="../../../images/gallery-5.jpg"/>
        </div>
        <div class="column">
          <img src="../../../images/gallery-2.jpeg"/>
          <img src="../../../images/gallery-6.webp"/>

        </div>
        <div class="column">
          <img src="../../../images/gallery-3.png"/>
          <img src="../../../images/gallery-7.jpg"/>
        </div>
        <div class="column">
          <img src="../../../images/gallery-10.jpg"/>
          <img src="../../../images/gallery-9.webp"/>
        </div>
      </div>
        </div>
    </div>
  )
}

export default Gallery