import React, { useEffect, useState } from 'react'
import './AdminHome.css'

// data table
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "primereact/resources/themes/lara-light-indigo/theme.css";     //coloum
import 'primereact/resources/primereact.css';                       //fill

import Swal from 'sweetalert2'


import Axios from 'axios';
import { backend_url } from '../../../Url';
import { useNavigate } from 'react-router-dom';

function AdminHome() {

  const [products, setProducts] = useState('')

  const navigate = useNavigate()

  useEffect(() => {

    const admin = localStorage.getItem('admin')
    if (admin) {
      getProducts()
    } else {
      navigate('/admin/login')
    }
  }, [])

  const getProducts = () => {
    Axios.get(`${backend_url}/api/admin/get-products`, {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem('adminToken'))}`
      }
    }).then((response) => {
      setProducts(response.data)
    })
  }




  const handleDelete = (tourId) => {

    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`${backend_url}/api/admin/delete-product/${tourId}`, {
          headers: {
            authorization: `bearer ${JSON.parse(localStorage.getItem('adminToken'))}`
          }
        }).then((response) => {
          if (response.data.result) {
            Swal.fire('Something went wrong , try again later...')
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Tour deleted successfully...',
              showConfirmButton: false,
              timer: 1500
            })
            getProducts()
          }
        })
      }


    })

  }


  const imageBodyTemplate = (rowData) => {
    return <img src={rowData.postImage} style={{ aspectRatio: '3/2' }} className='admin-home-image' alt="" />
  };

  const buttonTour = (rowData) => {
    return (
      <>
        <button className='edit-button' onClick={() => { navigate('/admin/edit-tour', { state: { id: rowData._id } }) }}>Edit</button>
        <button className='delete-button' onClick={() => handleDelete(rowData._id)} >Delete</button>
      </>
    )
  }

  return (
    <div className='admin-home' >
      <div className="admin-home-box">
        <DataTable value={products} tableStyle={{ width: "fitcontent", marginTop: 20 }}>
          <Column header="No." body={(data, options) => options.rowIndex + 1}></Column>
          <Column field="place" header="Place"></Column>
          <Column field="country" header="Country"></Column>
          <Column field="feature" header="Feature"></Column>
          <Column field="price" header="Price/person"></Column>

          <Column header="Image" body={imageBodyTemplate}></Column>
          <Column header='Button' body={buttonTour}></Column>
        </DataTable>

      </div>
    </div>


  )
}

export default AdminHome