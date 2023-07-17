import React, { useEffect, useState } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "primereact/resources/themes/lara-light-indigo/theme.css";     //coloum
import 'primereact/resources/primereact.css';
import Axios from 'axios';
import { backend_url } from '../../../Url';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function AdminDetails() {
    const [admins, setAdmins] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const admin = localStorage.getItem('admin')
        if (!admin) {
            navigate('/admin/login')
        } else {
            getAdminDetails()
        }
    }, [])

    const getAdminDetails = () => {
        Axios.get(`${backend_url}/api/admin/getAdminDetails`, {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('adminToken'))}`
            }
        }).then((response) => {
            if (response.data.result) {
                alert("Something went wrong")
            } else {
                setAdmins(response.data)
            }
        })
    }

    const handleAdminDelete = (adminId) => {
        Axios.delete(`${backend_url}/api/admin/admin-delete/${adminId}`, {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('adminToken'))}`
            }
        }).then((response) => {
            if (response.data.result) {
                Swal.fire('Err , Admin account not deleted...')
            } else {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Admin account deleted successfully...',
                    showConfirmButton: false,
                    timer: 1500
                })
                getAdminDetails()
            }
        })
    }

    const DeleteBodyTemplate = (admins) => {
        return <button onClick={() => handleAdminDelete(admins._id)} style={{ width: 100, height: 35, backgroundColor: '#C63834', outline: 'none', border: 'none', borderRadius: 7, color: '#fff' }} >Delete</button>
    }

    return (
        <div style={{ width: '80%', margin: 'auto' }} >
            <DataTable value={admins} tableStyle={{ width: "fitcontent", marginTop: 20 }}>
                <Column header="No." body={(data, options) => options.rowIndex + 1}></Column>
                <Column field="name" header="Name"></Column>
                <Column field="email" header="Email"></Column>
                <Column field="masterAdmin" header="Master Admin"></Column>
                <Column body={DeleteBodyTemplate} header="Email"></Column>

            </DataTable>
        </div>
    )
}

export default AdminDetails