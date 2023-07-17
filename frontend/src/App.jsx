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
import AddProduct from './Components/Admin/Add_Product/Add_Product';
import Cart from './Pages/Cart';
import AdminHome from './Components/Admin/AdminHome/AdminHome';
import EditTour from './Components/Admin/EditTour/EditTour';
import AddAdmin from './Components/Admin/AddAdmin/AddAdmin';
import AdminLogin from './Components/Admin/AdminLogin/AdminLogin';
import Users from './Components/Admin/Users/Users';
import Booked from './Components/Admin/Booked/Booked';
import AdminDetails from './Components/Admin/AdminsDetails/AdminDetails';


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
        <Route path='/cart' element={<Cart/>}/>

{/* admin */}

<Route exact path='/admin' element={<AdminHome/>} />
<Route path='/admin/edit-tour' element={<EditTour/>}/>
<Route path='/admin/add-product' element={<AddProduct/>}/>
<Route path='/admin/add-admin' element={<AddAdmin/>}/>
<Route path='/admin/login' element={<AdminLogin/>}/>
<Route path='/admin/users' element={<Users/>}/>
<Route path='/admin/booked' element={<Booked/>}/>
<Route path='/admin/admins' element={<AdminDetails/>}/>

        <Route path="*" element={<Home/>} />
      </Routes>
      <Footer/>
      </BrowserRouter>

    </div>
    
  )
}

export default App
