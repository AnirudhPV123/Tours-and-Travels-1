import React from 'react'
import './Banner.css'

function Banner() {
  return (
    
    <div className='banner'>
      <div className="banner-box">
      <div className="text">
        <div className="text-wrap">
          <h1>Traveling opens the door to creating <span>memories</span></h1>
          <p>Travelling is an amazing way to learn a lot of things in life. A lot of people around the world travel every year to many places. Moreover, it is important to travel to humans. Some travel to learn more while some travel to take a break from their life. No matter the reason, travelling opens a big door for us to explore the world beyond our imagination and indulge in many things</p>
        </div>
      </div>
      <div className="banner-img">
      <div className="banner-row">
        <img src="../../../images/banner-img-6.jpg" alt="" />
        <img src="../../../images/banner-img-7.jpg" alt="" />
      </div>
      <img src="../../../images/banner-img-8.jpg" alt="" className='banner-bottom-img'/>
      </div>
    </div>
    </div>
  )
}

export default Banner



