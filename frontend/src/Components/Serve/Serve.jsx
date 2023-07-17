import React from 'react'
import './Serve.css'


function Serve() {
  return (

    <div className='serve'>
      <div className="serve-box">
        <div className="serve-header">
          <p>What we serve</p>
          <h2>We offer our best Services</h2>
        </div>
        <div className="weather">
          <img src="../../../images/weather-icon-1.svg" alt="" className="service-img" />
          <h1 className='service-h1'>Calculate Weather</h1>
          <p className='service-p'>Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
        </div>
        <div className="guide">
          <img src="../../../images/tour-guide.svg" alt="" className="service-img" />
          <h1 className='service-h1'>Best tour guide</h1>
          <p className='service-p'>Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
        </div>
        <div className="customization">
          <img src="../../../images/customization.svg" alt="" className="service-img" />
          <h1 className='service-h1'>Customization</h1>
          <p className='service-p'>Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
        </div>

      </div>
    </div>

  )
}

export default Serve