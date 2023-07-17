import React from 'react'
import './Gallery.css'

function Gallery() {
  return (
    <div className='gallery'>
      <div className="gallery-box">
        <p>Gallery</p>
        <h1>Visit our customer's tour gallery</h1>
        <div className="row">
          <div className="column">
            <img src="../../../images/gallery-1.jpg" alt='gallery img' />
            <img src="../../../images/gallery-5.jpg" alt='gallery img' />
          </div>
          <div className="column">
            <img src="../../../images/gallery-2.jpeg" alt='gallery img' />
            <img src="../../../images/gallery-6.webp" alt='gallery img' />

          </div>
          <div className="column">
            <img src="../../../images/gallery-3.png" alt='gallery img' />
            <img src="../../../images/gallery-7.jpg" alt='gallery img' />
          </div>
          <div className="column">
            <img src="../../../images/gallery-10.jpg" alt='gallery img' />
            <img src="../../../images/gallery-9.webp" alt='gallery img' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Gallery