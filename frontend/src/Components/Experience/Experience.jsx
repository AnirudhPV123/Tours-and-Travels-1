import React from 'react'
import './Experience.css'

function Experience() {
  return (
    <div className='experience'>
      <div className="experience-box">
        <div className="experience-desc">
          <div className="desc-wrap">
          <h4>Experience</h4>
          <h1>With our all experience we will serve you</h1>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry hello how are you industry.  </p>
          <div className="rate-row">
            <div className="rate-col">
             <h3>12k+</h3>
              <h6>Successful trip</h6>
            </div>
            <div className="rate-col">
             <h3>2k+</h3>
              <h6>Regular trip</h6>
            </div>
            <div className="rate-col">
             <h3>15+</h3>
              <h6>Years experience</h6>
            </div>
          </div>
          </div>
        </div>
        <div className="experience-image">
          {/* <img src="../../../images/experience-2.png" alt="" /> */}
          <img src="../../../images/agency-1.png" alt=""/>

        </div>
      </div>
    </div>
  )
}

export default Experience