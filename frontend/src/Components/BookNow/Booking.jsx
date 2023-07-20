import React, { useEffect, useState } from 'react'
import './Booking.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { backend_url } from '../../Url'
import Axios from 'axios'
import { FaStar } from "react-icons/fa";
import Swal from 'sweetalert2'

function Booking() {
  const [review, setReview] = useState(false)
  const [productDetails, setProductDetails] = useState('')
  const [userId, setUserId] = useState('')
  const [userName, setUserName] = useState('')
  const [reviews, setReviews] = useState([])

  const [name, setName] = useState('')
  const [mobile, setMobile] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [noOfPersons, setNoOfPersons] = useState('')
  const [tourDate, setTourDate] = useState('')

  const [err, setErr] = useState(false)
  const [personLimit, setPersonLimit] = useState(false)
  const [payment, setPayment] = useState('')
  const [mobileErr, setMobileErr] = useState(false)


  const [rate, setRate] = useState(0)
  const [comments, setComments] = useState('')
  const [commentsErr, setCommentsErr] = useState(false)

  const [checkUserBooked, setCheckUserBooked] = useState(false)


  const navigate = useNavigate()
  const location = useLocation()


  useEffect(() => {

    const auth = localStorage.getItem('user')
    if (!auth) {
      navigate('/signup')
    } else {

      setUserId(JSON.parse(auth)._id)
      setUserName(JSON.parse(auth).name)

      
      if (location.state) {
        getLoading('open')

        getProductDetails()
        getPoductReview()
      } else {
        navigate('/tour')
      }

    }

    window.scrollTo({ top: 0, behavior: 'smooth' })


  }, [])

  var image
  if(window.innerWidth<=450){
     image = 'image400'
  }else if((450<window.innerWidth)&&(window.innerWidth<=1200)){
     image = 'image500'
  }else if((1200<window.innerWidth)&&(window.innerWidth<=1500)){
     image = 'image750'
  }else if(window.innerWidth>1500){
     image = 'image1000'
  }

  const getProductDetails = () => {
    Axios.get(`${backend_url}/api/user/book-now-details/${location.state.id}/${image}`, {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    }).then((details) => {
      if (details.data.result) {
        alert(details.data.result)
      }
      else if (details.data) {
        setProductDetails(details.data[0])
        getLoading()
      }
    })
  }

  // loading
  const getLoading=(loading)=>{
    if(loading==='open'){
      Swal.showLoading()
    }else{
      Swal.close()
    }
    
    }
                

  const getPoductReview = () => {
    Axios.get(`${backend_url}/api/user/get-reviews/${location.state.id}`, {
      headers: {
        'Content-Type': 'Application/json',
        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    }).then((response) => {

      if (response.data) {
        setReviews(response.data)
      }
    })

  }


  const addReview = () => {
    setReview(true)
  }

  const checkNoOfPersons = (count) => {
    setNoOfPersons(count);
    if (count <= 20) {
      setPersonLimit(false)
    } else {
      setPersonLimit(true)
    }
  }

  const checkMobile = (number) => {
    if (number.length < 10 || number.length > 10) {
      setMobile(number)
      setMobileErr(true)
    } else {
      setMobile(number)
      setMobileErr(false)
    }
  }

  const bookNow = async () => {
    if (!name || !mobile || !dateOfBirth || !noOfPersons || !tourDate || !payment || mobileErr || personLimit || mobileErr) {
      setErr(true)
    } else {
      setErr(false)

      const data = {
        userId,
        productId: productDetails._id,
        bookingDate: Date.now(),
        orderStatus: 'pending',
        personalDetails: {
          name,
          mobile,
          dateOfBirth,
        },
        bookingDetails: {
          noOfPersons,
          tourDate,
          payment,
          totalAmount: noOfPersons * productDetails.price
        }
      }

      Axios.post(`${backend_url}/api/user/product-booked`, data, {
        headers: {
          'Content-Type': 'Application/json',
          authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      }).then((response) => {
        if (response.data.status === 'placed') {
          thankyouPopup()
        } else {
          if (response.data) {
            razorpayPayment(response.data);
          } else {
            alert("Something went wrong")
          }

        }

      })


    }
  }




  const razorpayPayment = (order) => {
    var options = {
      "key": "rzp_test_XAAAhfxcIqO2ZJ", // Enter the Key ID generated from the Dashboard
      "amount": order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      "currency": "INR",
      "name": "Anirudh's Travels",
      "description": "Test Transaction",
      "image": "../../../images/logo-2.jpg",
      "order_id": order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      "handler": function (response) {

        verifyPayment(response, order);

      },
      "prefill": {
        "name": userName
      },
      "notes": {
        "address": "Razorpay Corporate Office"
      },
      "theme": {
        "color": "#FF9100"
      }
    };
    const razor = new window.Razorpay(options);
    razor.open();
  }

  // verify payment

  const verifyPayment = (payment, order) => {
    const data = {
      payment,
      order
    }
    Axios.post(`${backend_url}/api/user/verify-payment`, data, {
      headers: {
        'Content-Type': 'Application/json',
        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    }).then((response) => {
      if (response.data.status) {
        // navigate('/')
        thankyouPopup()
      } else {
        alert("Payment failed")
      }
    })
  }

  const handleReview = () => {
    if (!rate || !comments) {
      setCommentsErr(true)
    } else {
      setCommentsErr(false)

      const data = {
        userName,
        date: Date.now(),
        userId,
        productId: productDetails._id,
        rate,
        comments
      }

      Axios.post(`${backend_url}/api/user/post-review`, data, {
        headers: {
          'Content-Type': 'Application/json',
          authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      }).then((response) => {
        if (response.data.acknowledged === true) {
          setReview(false)
          getPoductReview()
        } else if (response.data.result) {
          setCheckUserBooked(true)
        } else {
          alert("Something went wrong ?")
        }
      })
    }
  }


  const thankyouPopup = () => {

    window.scrollTo({ top: 0, behavior: 'smooth' })


    let popup = document.getElementById('popup')
    popup.classList.add('open-popup')

    const part1 = document.querySelector('.booking .tour-details')
    part1.style.opacity = "0"

    const part2 = document.querySelector('.booking .booking-details')
    part2.style.opacity = "0"





    // document.body.style.overflow = "hidden"
  }


  const addToCart = () => {
    const data = {
      productId: productDetails._id,
      userId
    }
    Axios.post(`${backend_url}/api/user/add-to-cart`, data, {
      headers: {
        'Content-Type': 'Application/json',
        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    }).then((response) => {
      if (response.data.added) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Tour added to the Cart successfully...',
          showConfirmButton: false,
          timer: 1500
        })
      } else if (response.data.exist) {
        Swal.fire('Tour already exist in Cart...')
      } else {
        alert("Tour not added to Cart...")
      }
    })



  }



  return (
    <div className='booking'>



      <div className="booked-successfully" id="popup">
        <img src="../../images/404-tick.png" alt="" />
        <h2>Thank You !</h2>
        <p>Your tour booked successfully.</p>
        <button onClick={() => navigate('/')} >OK</button>
      </div>



      <div className="tour-details">

        {/* image */}


        <div className="image" >
          <img src={productDetails.postImage} style={{ aspectRatio: '3/2' }} alt="" />
        </div>


        <div className="tour-desc" style={{ marginBottom: 10 }}>
          <div className="tour-desc-box">
            <h1>{productDetails.feature} , {productDetails.place}</h1>
            <img src="../../../images/map-1.svg" alt="" /><h5></h5>
            <h3>Description</h3>
            <p>{productDetails.desc}</p>
          </div>
        </div>

        {/* tour review as comments */}


        {window.innerWidth > 1200 &&

          <div className="tour-review">


            {/* review post */}


            {review &&

              <div className="rate-body">
                <div className="rating-box">
                  <header>How was your experience ?</header>
                  <div className="stars">

                    {[...Array(5)].map((item, index) => {
                      const givenRating = index + 1;
                      return (
                        <label key={index} >
                          <input
                            type="radio"
                            value={givenRating}
                            className='star'
                            onClick={() => {
                              setRate(givenRating);

                            }}
                          />

                          <FaStar
                            fontSize={30}
                            color={
                              givenRating < rate || givenRating === rate
                                ? "#ff9c1a"
                                : "#e6e6e6"
                            }
                          />

                        </label>
                      );
                    })}


                  </div>
                  {commentsErr && (rate === 0 || !comments) && <h4 className='booking-details-err' >Star rating and comments must be required.../</h4>}
                  {checkUserBooked && <h4 className='booking-details-err' >Must required to book tour...</h4>}
                  <div className="text-area">
                    <textarea name="opinion" value={comments} onChange={(e) => setComments(e.target.value)} className="write-review" placeholder="Your opinion..." cols="30" rows="5"></textarea>
                  </div>
                  <div className="review-btn-group">
                    <button type="submit" className="review-submit" onClick={handleReview} >Post</button>
                    <button className="review-cancel" onClick={() => setReview(false)} >Cancel</button>
                  </div>
                </div>
              </div>

            }



            <div className="tour-review-box">
              <h4>Reviews ({reviews.length})</h4>
              <button onClick={addReview}>Add review</button>
              <div className='tour-review-section'>

                {reviews.map((obj, index) => {
                  return (
                    <div className="tour-reviews" key={index} >
                      <div className="tour-reviews-header">
                        <img src="../../../images/user.svg" alt="" className='guest-logo' />
                        <div style={{ marginLeft: 20 }}>
                          <h6>{obj.userName}</h6>
                          <small> {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(obj.date)}</small>
                        </div>
                        <p>{obj.rate} <img src="../../../images/star-2.png" alt="" style={{ width: 15, height: 15, marginTop: 10 }} /></p>

                      </div>
                      <div className="tour-reviews-content">
                        <p>{obj.comments}</p>
                      </div>
                    </div>
                  )
                })}

              </div>
            </div>
          </div>
        }





      </div>

      <div className="booking-details">
        <div className="details-box">
          <div className="booking-price">
            <p><span>${productDetails.price}</span>/per person</p>
          </div>
          <div className="booking-part">
            {err && (!name || !mobile || !dateOfBirth || !noOfPersons || !tourDate || !payment) && <h4 className='booking-details-err' >Every coloumn must be required...</h4>}
            <div className="booking-content">
              <form action="" className='content-box'>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Full name' className='name' />
                <input type="number" value={mobile} onChange={(e) => checkMobile(e.target.value)} placeholder='Mobile' className='mobile' />
                {mobileErr && mobile && <h4 className='booking-details-err' >Invalid mobile number...</h4>}
                <input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} className='date' />
              </form>
            </div>

            <h2>Booking Details</h2>
            <div className="booking-content">
              <form action="" className='content-box'>
                <input type="number" value={noOfPersons} onChange={(e) => checkNoOfPersons(e.target.value)} placeholder='No. of persons' className='adults' />
                {personLimit && <div className="no-of-persons-err"><span className='input-validation' >Maximum of 20 persons...</span></div>}
                <input type="date" value={tourDate} onChange={(e) => setTourDate(e.target.value)} className='date-travel' />

                <p>Payment method</p>

                <div className='radio-box'>
                  <input type="radio" name="payment-method" value="COD" onChange={(e) => setPayment(e.target.value)} className='payment-method' />
                  <label>Offline payment</label><br />

                  <input type="radio" name="payment-method" value="ONLINE" onChange={(e) => setPayment(e.target.value)} className='payment-method' />
                  <label>Online payment</label>
                </div>

              </form>
            </div>

            <div className="booking-footer">
              <div className="total-price">
                <p>${productDetails.price} x {!personLimit && noOfPersons} person</p>
                {!personLimit && <p>${productDetails.price * noOfPersons}</p>}
                {personLimit && <p>$ 0</p>}
              </div>

              <div className="total">
                <p>Total</p>
                {!personLimit && <p>${productDetails.price * noOfPersons + 10}</p>}
                {personLimit && <p>$ 0</p>}
              </div>

              <button className='add-to-cart' onClick={addToCart} >Add to Cart</button>
              <button onClick={bookNow} >Book Now</button>
            </div>


          </div>
        </div>
      </div>



      {window.innerWidth < 900 &&
        <div className="tour-review" style={{ width: '80%', margin: 'auto', marginTop: 20 }}>


          {/* review post */}


          {review &&

            <div className="rate-body">
              <div className="rating-box">
                <header>How was your experience ?</header>
                <div className="stars">

                  {[...Array(5)].map((item, index) => {
                    const givenRating = index + 1;
                    return (
                      <label key={index} >
                        <input
                          type="radio"
                          value={givenRating}
                          className='star'
                          onClick={() => {
                            setRate(givenRating);

                          }}
                        />

                        <FaStar
                          fontSize={30}
                          color={
                            givenRating < rate || givenRating === rate
                              ? "#ff9c1a"
                              : "#e6e6e6"
                          }
                        />

                      </label>
                    );
                  })}


                </div>
                {commentsErr && (rate === 0 || !comments) && <h4 className='booking-details-err' >Star rating and comments must be required.../</h4>}
                {checkUserBooked && <h4 className='booking-details-err' >Must required to book tour...</h4>}
                <div className="text-area">
                  <textarea name="opinion" value={comments} onChange={(e) => setComments(e.target.value)} className="write-review" placeholder="Your opinion..." cols="30" rows="5"></textarea>
                </div>
                <div className="review-btn-group">
                  <button type="submit" className="review-submit" onClick={handleReview} >Post</button>
                  <button className="review-cancel" onClick={() => setReview(false)} >Cancel</button>
                </div>
              </div>
            </div>

          }



          <div className="tour-review-box">
            <h4>Reviews ({reviews.length})</h4>
            <button onClick={addReview}>Add review</button>
            <div className='tour-review-section'>

              {reviews.map((obj, index) => {
                return (
                  <div className="tour-reviews" key={index} >
                    <div className="tour-reviews-header">
                      <img src="../../../images/user.svg" alt="" className='guest-logo' />
                      <div style={{ marginLeft: 20 }}>
                        <h6>{obj.userName}</h6>
                        <small> {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(obj.date)}</small>
                      </div>
                      <p>{obj.rate} <img src="../../../images/star-2.png" alt="" style={{ width: 15, height: 15, marginTop: 10 }} /></p>

                    </div>
                    <div className="tour-reviews-content">
                      <p>{obj.comments}</p>
                    </div>
                  </div>
                )
              })}

            </div>
          </div>
        </div>
      }




    </div>
  )
}

export default Booking