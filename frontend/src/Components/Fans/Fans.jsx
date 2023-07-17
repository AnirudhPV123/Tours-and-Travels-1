import React, { useEffect } from 'react'
import './Fans.css'

import Swiper from 'swiper/bundle';

// import styles bundle
import 'swiper/css/bundle';


function Fan() {


  useEffect(() => {

    var swiper = new Swiper(".slide-content", {
      slidesPerView: 3,
      spaceBetween: 25,
      loop: true,
      centerSlide: 'true',
      fade: 'true',
      grabCursor: 'true',
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },

      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        520: {
          slidesPerView: 2,
        },
        950: {
          slidesPerView: 3,
        },
      },
    });

  }, [])




  return (
    <div className="testimony">
      <div className="testimony-box">
        <h5>Fans love</h5>
        <h2>What our fans saying about us</h2>
      </div>
      <div className="slide-container swiper">
        <div className="slide-content">
          <div className="card-wrapper swiper-wrapper">
            <div className="card swiper-slide">
              <div className="card-box">
                <div className="user">
                  <div className="icon">
                    <img src="../../../images/profile3.jpg" alt="" />
                  </div>
                  <div className="user-info">
                    <p>KEN NORMAN</p>
                    <small>Customer</small>
                  </div>
                </div>
                <p className='testimonital-review'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                </p>
              </div>
            </div>
            <div className="card swiper-slide">
              <div className="card-box">
                <div className="user">
                  <div className="icon">
                    <img src="../../../images/profile8.jpg" alt="" />
                  </div>
                  <div className="user-info">
                    <p>LARA</p>
                    <small>Customer</small>
                  </div>
                </div>
                <p className='testimonital-review'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                </p>
              </div>
            </div>
            <div className="card swiper-slide">
              <div className="card-box">
                <div className="user">
                  <div className="icon">
                    <img src="../../../images/profile2.jpg" alt="" />
                  </div>
                  <div className="user-info">
                    <p>SALENA</p>
                    <small>Customer</small>
                  </div>
                </div>
                <p className='testimonital-review'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                </p>
              </div>
            </div>
            <div className="card swiper-slide">
              <div className="card-box">
                <div className="user">
                  <div className="icon">
                    <img src="../../../images/gallery-1.jpg" alt="" />
                  </div>
                  <div className="user-info">
                    <p>Riya</p>
                    <small>Customer</small>
                  </div>
                </div>
                <p className='testimonital-review'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
              </div>
            </div>




          </div>
        </div>

        {window.innerWidth > 900 &&
          <>
            <div className="swiper-button-next swiper-navBtn" style={{ height: 160, top: 27 }} ></div>
            <div className="swiper-button-prev swiper-navBtn" style={{ height: 160, top: 27 }} ></div>
          </>
        }
        <div className="swiper-pagination swiper-bullet"></div>
      </div>
    </div>
  )
}

export default Fan