// import React from 'react'
// import './Featured.css'


// function Featured() {
//   return (
//     <div className='featured'>
//         <div className="featured-box">
//             <p>Explore</p>
//             <h1>Our Featured Tours</h1>
//         <div className="featured-row">
//             <div className="featured-col">
//                 <div className="image">
//                 <img src="../../../images/tokyo.webp" alt=""/>
//                 <h4>Featured</h4>
//                 </div>
//                 <div className="desc">
//                 <h6>Tokyo , Japan</h6>
//                 <h3>Cherry Blossams Spring</h3>
//                 <h5><span>$999</span>/per person</h5>
//                 <a href="">Book Now</a>
//                 </div>
//             </div>
//             <div className="featured-col">
//                 <div className="image">
//                 <img src="../../../images/alappuzha-1.jpg" alt=""/>
//                 <h4>Featured</h4>
//                 </div>
//                 <div className="desc">
//                 <h6>Alappuzha , India</h6>
//                 <h3>Houseboat cruises</h3>
//                 <h5><span>$499</span>/per person</h5>
//                 <a href="">Book Now</a>
//                 </div>
//             </div>
//             <div className="featured-col">
//                 <div className="image">
//                 <img src="../../../images/varanasi-1.jpg" alt=""/>
//                 <h4>Featured</h4>
//                 </div>
//                 <div className="desc">
//                 <h6>Varanasi , India</h6>
//                 <h3>Spiritual capital of India</h3>
//                 <h5><span>$599</span>/per person</h5>
//                 <a href="">Book Now</a>
//                 </div>
//             </div>
//             <div className="featured-col">
//                 <div className="image">
//                 <img src="../../../images/london-1.jpg" alt=""/>
//                 <h4>Featured</h4>
//                 </div>
//                 <div className="desc">
//                 <h6>London , UK</h6>
//                 <h3>Westminster Bridge</h3>
//                 <h5><span>$1299</span>/per person</h5>
//                 <a href="">Book Now</a>
//                 </div>
//             </div>
           
//         </div>


//         <div className="featured-row" id='featured-row'>
//             <div className="featured-col">
//                 <div className="image">
//                 <img src="../../../images/bali-1.jpg" alt=""/>
//                 <h4>Featured</h4>
//                 </div>
//                 <div className="desc">
//                 <h6>Bali , Indonesia</h6>
//                 <h3>Nusa Penida Island</h3>
//                 <h5><span>$1399</span>/per person</h5>
//                 <a href="">Book Now</a>
//                 </div>
//             </div>
//             <div className="featured-col">
//                 <div className="image">
//                 <img src="../../../images/tajmahal.webp" alt=""/>
//                 <h4>Featured</h4>
//                 </div>
//                 <div className="desc">
//                 <h6> Agra , India</h6>
//                 <h3>Taj Mahal</h3>
//                 <h5><span>$499</span>/per person</h5>
//                 <a href="">Book Now</a>
//                 </div>
//             </div>
//             <div className="featured-col">
//                 <div className="image">
//                 <img src="../../../images/phuket-thailand-1.jpg" alt=""/>
//                 <h4>Featured</h4>
//                 </div>
//                 <div className="desc">
//                 <h6>Phuket , Thailand</h6>
//                 <h3>Most popular beaches</h3>
//                 <h5><span>$1299</span>/per person</h5>
//                 <a href="">Book Now</a>
//                 </div>
//             </div>
//             <div className="featured-col">
//                 <div className="image">
//                 <img src="../../../images/paris.jpg" alt=""/>
//                 <h4>Featured</h4>
//                 </div>
//                 <div className="desc">
//                 <h6>Paris , France</h6>
//                 <h3>Eiffel Tower</h3>
//                 <h5><span>$1199</span>/per person</h5>
//                 <a href="">Book Now</a>
//                 </div>
//             </div>
           
//         </div>


//         </div>
//     </div>
//   )
// }

// export default Featured


import React from 'react'
import './Featured.css'


function Featured() {
  return (
    <>
    <div className="cards-main-body">
        <div className="cards-mb-header">
    <p>Explore</p>
            <h1>Our Featured Tours</h1>
            </div>
      <div class="cards">
        <div className="card">
          <div className="image">
            <img src="../../../images/alappuzha-1.jpg" alt="" />
            <h4>Featured</h4>
          </div>
          <div className="desc">
            <h6>Alappuzha , India</h6>
            <h3>Houseboat cruises</h3>
            <h5><span>$499</span>/per person</h5>
            <a href="">Book Now</a>
          </div>
        </div>
        <div className="card">
          <div className="image">
            <img src="../../../images/tokyo.webp" alt="" />
            <h4>Featured</h4>
          </div>
          <div className="desc">
            <h6>Tokyo , Japan</h6>
            <h3>Cherry Blossams Spring</h3>
            <h5><span>$999</span>/per person</h5>
            <a href="">Book Now</a>
          </div>
        </div>
        <div className="card">
          <div className="image">
            <img src="../../../images/varanasi-1.jpg" alt="" />
            <h4>Featured</h4>
          </div>
          <div className="desc">
            <h6>Varanasi , India</h6>
            <h3>Spiritual capital of India</h3>
            <h5><span>$599</span>/per person</h5>
            <a href="">Book Now</a>
          </div>
        </div>
        <div className="card">
          <div className="image">
            <img src="../../../images/london-1.jpg" alt="" />
            <h4>Featured</h4>
          </div>
          <div className="desc">
            <h6>London , UK</h6>
            <h3>Westminster Bridge</h3>
            <h5><span>$1299</span>/per person</h5>
            <a href="">Book Now</a>
          </div>
        </div>
        <div className="card">
          <div className="image">
            <img src="../../../images/bali-1.jpg" alt="" />
            <h4>Featured</h4>
          </div>
          <div className="desc">
            <h6>Bali , Indonesia</h6>
            <h3>Nusa Penida Island</h3>
            <h5><span>$1399</span>/per person</h5>
            <a href="">Book Now</a>
          </div>
        </div>
        <div className="card">
          <div className="image">
            <img src="../../../images/tajmahal.webp" alt="" />
            <h4>Featured</h4>
          </div>
          <div className="desc">
            <h6> Agra , India</h6>
            <h3>Taj Mahal</h3>
            <h5><span>$499</span>/per person</h5>
            <a href="">Book Now</a>
          </div>
        </div>
        <div className="card">
          <div className="image">
            <img src="../../../images/phuket-thailand-1.jpg" alt="" />
            <h4>Featured</h4>
          </div>
          <div className="desc">
            <h6>Phuket , Thailand</h6>
            <h3>Most popular beaches</h3>
            <h5><span>$1299</span>/per person</h5>
            <a href="">Book Now</a>
          </div>
        </div>
        <div className="card">
          <div className="image">
            <img src="../../../images/paris.jpg" alt="" />
            <h4>Featured</h4>
          </div>
          <div className="desc">
            <h6>Paris , France</h6>
            <h3>Eiffel Tower</h3>
            <h5><span>$1199</span>/per person</h5>
            <a href="">Book Now</a>
          </div>
        </div>

        <div className="card">
          <div className="image">
            <img src="../../../images/alappuzha-1.jpg" alt="" />
            <h4>Featured</h4>
          </div>
          <div className="desc">
            <h6>Alappuzha , India</h6>
            <h3>Houseboat cruises</h3>
            <h5><span>$499</span>/per person</h5>
            <a href="">Book Now</a>
          </div>
        </div>
        <div className="card">
          <div className="image">
            <img src="../../../images/tokyo.webp" alt="" />
            <h4>Featured</h4>
          </div>
          <div className="desc">
            <h6>Tokyo , Japan</h6>
            <h3>Cherry Blossams Spring</h3>
            <h5><span>$999</span>/per person</h5>
            <a href="">Book Now</a>
          </div>
        </div>
        <div className="card">
          <div className="image">
            <img src="../../../images/varanasi-1.jpg" alt="" />
            <h4>Featured</h4>
          </div>
          <div className="desc">
            <h6>Varanasi , India</h6>
            <h3>Spiritual capital of India</h3>
            <h5><span>$599</span>/per person</h5>
            <a href="">Book Now</a>
          </div>
        </div>
        <div className="card">
          <div className="image">
            <img src="../../../images/london-1.jpg" alt="" />
            <h4>Featured</h4>
          </div>
          <div className="desc">
            <h6>London , UK</h6>
            <h3>Westminster Bridge</h3>
            <h5><span>$1299</span>/per person</h5>
            <a href="">Book Now</a>
          </div>
        </div>
        <div className="card">
          <div className="image">
            <img src="../../../images/bali-1.jpg" alt="" />
            <h4>Featured</h4>
          </div>
          <div className="desc">
            <h6>Bali , Indonesia</h6>
            <h3>Nusa Penida Island</h3>
            <h5><span>$1399</span>/per person</h5>
            <a href="">Book Now</a>
          </div>
        </div>
        <div className="card">
          <div className="image">
            <img src="../../../images/tajmahal.webp" alt="" />
            <h4>Featured</h4>
          </div>
          <div className="desc">
            <h6> Agra , India</h6>
            <h3>Taj Mahal</h3>
            <h5><span>$499</span>/per person</h5>
            <a href="">Book Now</a>
          </div>
        </div>
        <div className="card">
          <div className="image">
            <img src="../../../images/phuket-thailand-1.jpg" alt="" />
            <h4>Featured</h4>
          </div>
          <div className="desc">
            <h6>Phuket , Thailand</h6>
            <h3>Most popular beaches</h3>
            <h5><span>$1299</span>/per person</h5>
            <a href="">Book Now</a>
          </div>
        </div>
        <div className="card">
          <div className="image">
            <img src="../../../images/paris.jpg" alt="" />
            <h4>Featured</h4>
          </div>
          <div className="desc">
            <h6>Paris , France</h6>
            <h3>Eiffel Tower</h3>
            <h5><span>$1199</span>/per person</h5>
            <a href="">Book Now</a>
          </div>
        </div>

        <div className="card">
          <div className="image">
            <img src="../../../images/alappuzha-1.jpg" alt="" />
            <h4>Featured</h4>
          </div>
          <div className="desc">
            <h6>Alappuzha , India</h6>
            <h3>Houseboat cruises</h3>
            <h5><span>$499</span>/per person</h5>
            <a href="">Book Now</a>
          </div>
        </div>
        <div className="card">
          <div className="image">
            <img src="../../../images/tokyo.webp" alt="" />
            <h4>Featured</h4>
          </div>
          <div className="desc">
            <h6>Tokyo , Japan</h6>
            <h3>Cherry Blossams Spring</h3>
            <h5><span>$999</span>/per person</h5>
            <a href="">Book Now</a>
          </div>
        </div>
        <div className="card">
          <div className="image">
            <img src="../../../images/varanasi-1.jpg" alt="" />
            <h4>Featured</h4>
          </div>
          <div className="desc">
            <h6>Varanasi , India</h6>
            <h3>Spiritual capital of India</h3>
            <h5><span>$599</span>/per person</h5>
            <a href="">Book Now</a>
          </div>
        </div>
        <div className="card">
          <div className="image">
            <img src="../../../images/london-1.jpg" alt="" />
            <h4>Featured</h4>
          </div>
          <div className="desc">
            <h6>London , UK</h6>
            <h3>Westminster Bridge</h3>
            <h5><span>$1299</span>/per person</h5>
            <a href="">Book Now</a>
          </div>
        </div>
        <div className="card">
          <div className="image">
            <img src="../../../images/bali-1.jpg" alt="" />
            <h4>Featured</h4>
          </div>
          <div className="desc">
            <h6>Bali , Indonesia</h6>
            <h3>Nusa Penida Island</h3>
            <h5><span>$1399</span>/per person</h5>
            <a href="">Book Now</a>
          </div>
        </div>
        <div className="card">
          <div className="image">
            <img src="../../../images/tajmahal.webp" alt="" />
            <h4>Featured</h4>
          </div>
          <div className="desc">
            <h6> Agra , India</h6>
            <h3>Taj Mahal</h3>
            <h5><span>$499</span>/per person</h5>
            <a href="">Book Now</a>
          </div>
        </div>
        <div className="card">
          <div className="image">
            <img src="../../../images/phuket-thailand-1.jpg" alt="" />
            <h4>Featured</h4>
          </div>
          <div className="desc">
            <h6>Phuket , Thailand</h6>
            <h3>Most popular beaches</h3>
            <h5><span>$1299</span>/per person</h5>
            <a href="">Book Now</a>
          </div>
        </div>
        <div className="card">
          <div className="image">
            <img src="../../../images/paris.jpg" alt="" />
            <h4>Featured</h4>
          </div>
          <div className="desc">
            <h6>Paris , France</h6>
            <h3>Eiffel Tower</h3>
            <h5><span>$1199</span>/per person</h5>
            <a href="">Book Now</a>
          </div>
        </div>
        
      </div>
      </div>
    </>
  )
}

export default Featured