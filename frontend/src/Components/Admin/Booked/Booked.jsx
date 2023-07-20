import React, { useEffect, useState } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "primereact/resources/themes/lara-light-indigo/theme.css";     //coloum
import 'primereact/resources/primereact.css';
import Axios from 'axios';
import { backend_url } from '../../../Url';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Booked() {
    const [bookedDetails, setBookedDetails] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const admin = localStorage.getItem('admin')
        if (!admin) {
            navigate('/admin/login')
        } else {
            getLoading('open')
            getBookedDetails()
        }
    }, [])

    const getBookedDetails = () => {
        Axios.get(`${backend_url}/api/admin/get-booked-details`, {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('adminToken'))}`
            }
        }).then((response) => {
            if (response.data.result) {
                alert("Something went wrong")
            } else {
                setBookedDetails(response.data)
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

    return (
        <div style={{ width: '80%', margin: 'auto'}} >
            <DataTable value={bookedDetails} scrollHeight="100vh" tableStyle={{ minWidth: '100rem', marginTop: 20 }}>
                <Column header="No." body={(data, options) => options.rowIndex + 1}></Column>
                <Column field="name" header="Name"></Column>
                <Column field="mobile" header="Mobile No."></Column>
                <Column field="noOfPersons" header="No. of Persons"></Column>
                <Column field="tourDate" header="Tour Date"></Column>
                <Column field="payment" header="Payment"></Column>
                <Column field="orderStatus" header="Order Status"></Column>
                <Column field="totalAmount" header="Amount"></Column>
                <Column field="product.place" header="Place"></Column>
                <Column field="product.country" header="Country"></Column>
                <Column field="product.feature" header="Feature"></Column>


            </DataTable>
        </div>
    )
}

export default Booked