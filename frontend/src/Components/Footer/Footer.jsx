import React, { useEffect, useState } from 'react'
import './Footer.css'
import { useLocation } from 'react-router-dom'
function Footer() {

    const location = useLocation()

    const [admin, setAdmin] = useState(false)
    useEffect(() => {
        getAdmin()
    }, [])


    const getAdmin = () => {
        const auth = localStorage.getItem('admin')
        const path = location.pathname.split('/')
        if (auth && path[1] == 'admin') {
            setAdmin(true)
        } else {
            setAdmin(false)
        }
    }


    return (

        <div>
            {!admin &&
                <footer id="footer">
                    <div className="title-text">
                        <p>CONTACT</p>
                        <h1>KVA Travels</h1>
                    </div>
                    <div className="footer-row">
                        <img src="../../../images/logo-2.jpg" alt="" className="footer-img" />
                        <div className="footer-col-left">
                            <h2>Opening Hours</h2>
                            <p><i className="fa fa-clock-o" aria-hidden="true" style={{ marginRight: 5 }} ></i>
                                Monday to Friday-9am to 9pm</p>
                            <p><i className="fa fa-clock-o" aria-hidden="true" style={{ marginRight: 5 }}></i>
                                Saturday and Sunday-8am to 7pm</p>
                        </div>
                        <div className="footer-col-right">
                            <h2>Get In Touch</h2>
                            <p>#21abc Colony.xyz City IN
                                {window.innerWidth > 450 && <i className="fa fa-map-marker" aria-hidden="true"></i>}
                            </p>
                            <p>testing@website.com
                                {window.innerWidth > 450 && <i className="fa fa-paper-plane" aria-hidden="true"></i>}
                            </p>
                            <p>+91 789310920
                                {window.innerWidth > 450 && <i className="fa fa-phone" aria-hidden="true"></i>}
                            </p>
                        </div>
                    </div>
                    <div className="social-media">
                        <i className="fa-brands fa-facebook-f"></i>
                        <i className="fa-brands fa-instagram" aria-hidden="true"></i>
                        <i className="fa-brands fa-twitter" aria-hidden="true"></i>
                        <i className="fa-brands fa-github" aria-hidden="true"></i>
                        <p>Copyright 2023 , design and developed by Anirudh P V . All rights reserved</p>
                    </div>
                </footer>
            }
        </div>

    )
}

export default Footer