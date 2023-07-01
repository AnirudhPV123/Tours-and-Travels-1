import React from 'react'
import './App.css';
import Home from './Pages/Home';
import Header from './Components/Header/Header';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Tour from './Pages/Tour';
import BookNow from './Pages/BookNow';
import Footer from './Components/Footer/Footer';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import Add_Product from './Components/Add_Product/Add_Product';


function App() {
  return (

    <div className='full-body'>
      <BrowserRouter>
      <Header/>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route path='/tour' element={<Tour/>}/>
        <Route path='/book-now' element={<BookNow/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/add-product' element={<Add_Product/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
    
  )
}

export default App
