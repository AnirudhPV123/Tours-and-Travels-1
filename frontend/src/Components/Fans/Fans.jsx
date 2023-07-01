import React ,{useEffect} from 'react'
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
  
      breakpoints:{
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
<div class="slide-container swiper">
            <div class="slide-content">
                <div class="card-wrapper swiper-wrapper">
                    <div class="card swiper-slide">
                      <div className="card-box">
                    <div class="user">
                    <div class="icon">
                        <img src="../../../images/profile3.jpg" alt=""/>
                    </div>
                    <div class="user-info">
                        <p>KEN NORMAN</p>
                        <small>Customer</small>
                    </div>
                </div>
                <p className='testimonital-review'>When it comes to uninvited guests, we all have different reactions.Some may feel annoyed orfrustrated
                </p>
                </div>
                    </div>
                    <div class="card swiper-slide">
                      <div className="card-box">
                    <div class="user">
                    <div class="icon">
                        <img src="../../../images/profile8.jpg" alt=""/>
                    </div>
                    <div class="user-info">
                        <p>LARA<i class="fa fa-twitter" aria-hidden="true"></i></p>
                        <small>Customer</small>
                    </div>
                </div>
                <p className='testimonital-review'>When it comes to uninvited guests, we all have different reactions.Some may feel annoyed orfrustrated
                </p>
                </div>
                    </div>
                    <div class="card swiper-slide">
                      <div className="card-box">
                    <div class="user">
                    <div class="icon">
                        <img src="../../../images/profile2.jpg" alt=""/>
                    </div>
                    <div class="user-info">
                        <p>SALENA<i class="fa fa-twitter" aria-hidden="true"></i></p>
                        <small>Customer</small>
                    </div>
                </div>
                <p className='testimonital-review'>When it comes to uninvited guests, we all have different reactions.Some may feel annoyed orfrustrated
                </p>
                </div>
                    </div>
                    <div class="card swiper-slide">
                      <div className="card-box">
                    <div class="user">
                    <div class="icon">
                        <img src="../../../images/gallery-1.jpg" alt=""/>
                    </div>
                    <div class="user-info">
                        <p>KEN NORMAN<i class="fa fa-twitter" aria-hidden="true"></i></p>
                        <small>Customer</small>
                    </div>
                </div>
                <p className='testimonital-review'>When it comes to uninvited guests, we all have different reactions.Some may feel annoyed orfrustrated
                </p>
                </div>
                    </div>
                    <div class="card swiper-slide">
                      <div className="card-box">
                    <div class="user">
                    <div class="icon">
                        <img src="../../../images/gallery-1.jpg" alt=""/>
                    </div>
                    <div class="user-info">
                        <p>KEN NORMAN<i class="fa fa-twitter" aria-hidden="true"></i></p>
                        <small>Customer</small>
                    </div>
                </div>
                <p className='testimonital-review'>When it comes to uninvited guests, we all have different reactions.Some may feel annoyed orfrustrated
                </p>
                </div>
                    </div>
                    <div class="card swiper-slide">
                      <div className="card-box">
                    <div class="user">
                    <div class="icon">
                        <img src="../../../images/gallery-1.jpg" alt=""/>
                    </div>
                    <div class="user-info">
                        <p>KEN NORMAN<i class="fa fa-twitter" aria-hidden="true"></i></p>
                        <small>Customer</small>
                    </div>
                </div>
                <p className='testimonital-review'>When it comes to uninvited guests, we all have different reactions.Some may feel annoyed orfrustrated
                </p>
                </div>
                    </div>
                    <div class="card swiper-slide">
                      <div className="card-box">
                    <div class="user">
                    <div class="icon">
                        <img src="../../../images/gallery-1.jpg" alt=""/>
                    </div>
                    <div class="user-info">
                        <p>KEN NORMAN<i class="fa fa-twitter" aria-hidden="true"></i></p>
                        <small>Customer</small>
                    </div>
                </div>
                <p className='testimonital-review'>When it comes to uninvited guests, we all have different reactions.Some may feel annoyed orfrustrated
                </p>
                </div>
                    </div>

                </div>
            </div>

{window.innerWidth>900 &&  
<>
<div class="swiper-button-next swiper-navBtn"></div>
<div class="swiper-button-prev swiper-navBtn"></div>
</>         
}
            <div class="swiper-pagination swiper-bullet"></div>
        </div>
        </div>
  )
}

export default Fan