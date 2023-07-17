import React, { useEffect, useState } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "primereact/resources/themes/lara-light-indigo/theme.css";     //coloum
import 'primereact/resources/primereact.css';
import Axios from 'axios';
import { backend_url } from '../../../Url';
import { useNavigate } from 'react-router-dom';
function Users() {
    const [users, setUsers] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const admin = localStorage.getItem('admin')
        if (!admin) {
            navigate('/admin/login')
        } else {
            getUserDetails()
        }
    }, [])

    const getUserDetails = () => {
        Axios.get(`${backend_url}/api/admin/getUserDetails`, {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('adminToken'))}`
            }
        }).then((response) => {
            if (response.data.result) {
                alert("Something went wrong")
            } else {
                setUsers(response.data)
            }
        })
    }

    return (
        <div style={{ width: '80%', margin: 'auto' }} >
            <DataTable value={users} tableStyle={{ width: "fitcontent", marginTop: 20 }}>
                <Column header="No." body={(data, options) => options.rowIndex + 1}></Column>
                <Column field="name" header="Name"></Column>
                <Column field="email" header="Email"></Column>
            </DataTable>
        </div>
    )
}

export default Users