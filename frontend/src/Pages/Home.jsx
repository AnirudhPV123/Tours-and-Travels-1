import React from 'react'
import Banner from '../Components/Banner/Banner'
import Serve from '../Components/Serve/Serve'
import Featured from '../Components/Featured/Featured'
import Experience from '../Components/Experience/Experience'
import Gallery from '../Components/Gallery/Gallery'
import Fans from '../Components/Fans/Fans'


function Home() {
  return (
    <div>
       <div className="home">
        <Banner/>
        <Serve/>
        <Featured/>
        <Experience/>
        <Gallery/>
        <Fans/>
        </div>
    </div>
  )
}

export default Home