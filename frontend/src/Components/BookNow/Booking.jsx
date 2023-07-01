import React, { useEffect, useState } from 'react'
import './Booking.css'

function Booking() {

  const [review, setReview] = useState(false)

   const addReview=()=>{
    setReview(true) 
}


  return (
    <div className='booking'> 
    <div className="tour-details"> 

{/* image */}

      <div className="image">
        <img src="../../../images/phuket-thailand-1.jpg" alt="" />
      </div>
      <div className="tour-desc">
        <div className="tour-desc-box">
        <h1>Most popular beaches , Phuket</h1>
      <img src="../../../images/map-1.svg" alt="" /><h5>Thailand</h5>
        <h3>Description</h3>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
      </div>
      </div>

{/* tour review as comments */}

      <div className="tour-review">


{/* review post */}


{review &&

<div className="rate-body">
      <div className="rating-box">
      <header>How was your experience ?</header>
      <div className="stars">
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star" ></i>
        <i className="fa-solid fa-star"></i>
      </div>
      <div className="text-area">
      <textarea name="opinion" className="write-review" placeholder="Your opinion..." cols="30" rows="5"></textarea>
      </div>
      <div className="review-btn-group">
        <button type="submit" className="review-submit">Post</button>
        <button className="review-cancel">Cancel</button>
      </div>
    </div>
    </div>
     
    }



        <div className="tour-review-box">
          <h4>Reviews(2 reviews)</h4>
          <button onClick={addReview}>Add review</button>
          <div className='tour-review-section'>
            <div className="tour-reviews">
              <div className="tour-reviews-header">
                <img src="../../../images/user.svg" alt="" className='guest-logo' />
                <div style={{marginLeft:20}}>
                <h6>Anirudh.P.V</h6>
                <small>June 30 , 2023</small>
                </div>
                <p>5 <img src="../../../images/star-2.png" alt="" style={{width:15,height:15,marginTop:10}}/></p>
                
                </div>
                <div className="tour-reviews-content">
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s   orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                </div>
            </div>

            <div className="tour-reviews">
              <div className="tour-reviews-header">
                <img src="../../../images/user.svg" alt="" className='guest-logo' />
                <div style={{marginLeft:20}}>
                <h6>Ram</h6>
                <small>June 30 , 2023</small>
                </div>
                <p>5 <img src="../../../images/star-2.png" alt="" style={{width:15,height:15,marginTop:10}}/></p>
                
                </div>
                <div className="tour-reviews-content">
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s   orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                </div>
            </div>

            <div className="tour-reviews">
              <div className="tour-reviews-header">
                <img src="../../../images/user.svg" alt="" className='guest-logo' />
                <div style={{marginLeft:20}}>
                <h6>Anirudh.P.V</h6>
                <small>June 30 , 2023</small>
                </div>
                <p>5 <img src="../../../images/star-2.png" alt="" style={{width:15,height:15,marginTop:10}}/></p>
                
                </div>
                <div className="tour-reviews-content">
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s   orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                </div>
            </div>

            <div className="tour-reviews">
              <div className="tour-reviews-header">
                <img src="../../../images/user.svg" alt="" className='guest-logo' />
                <div style={{marginLeft:20}}>
                <h6>Kochu.P.V</h6>
                <small>June 30 , 2023</small>
                </div>
                <p>3 <img src="../../../images/star-2.png" alt="" style={{width:15,height:15,marginTop:10}}/></p>
                
                </div>
                <div className="tour-reviews-content">
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s   orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                </div>
            </div>

          </div>
        </div>
      </div>




      

      </div>

      <div className="booking-details">
        <div className="details-box">
          <div className="booking-price">
            <p><span>$99</span>/per person</p>
          </div>
          <div className="booking-part">
          <h2>Personal Details</h2>
          <div className="booking-content">
          <form action="" className='content-box'>
            <input type="text" placeholder='Full name' className='name' />
            <input type="number" placeholder='Mobile' className='mobile' />
            <input type="date" className='date' />
          </form>
          </div>

          <h2>Booking Details</h2>
          <div className="booking-content">
          <form action="" className='content-box'>
            <input type="number" placeholder='No. of persons' className='adults' />
            <input type="date" className='date-travel' />
          </form>
          </div>

          <div className="booking-footer">
            <div className="total-price">
            <p>$99 x 1 person</p>
            <p>$99</p>
            </div>
            <div className="service-charge">
              <p>Service charge</p>
              <p>$10</p>
            </div>
            <div className="total">
              <p>Total</p>
              <p>$109</p>
            </div>

            <a href="">Book Now</a>
          </div>
          

          </div>
        </div>
      </div>


    </div>
  )
}

export default Booking