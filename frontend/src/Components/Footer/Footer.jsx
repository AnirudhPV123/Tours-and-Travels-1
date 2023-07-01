import React from 'react'
import './Footer.css'
function Footer() {
    return (
        <div>
            <footer id="footer">
                <div class="title-text">
                    <p>CONTACT</p>
                    <h1>Anirudh's Travel</h1>
                </div>
                <div class="footer-row">
                    <img src="../../../images/logo-2.jpg" alt="" class="footer-img" />
                    <div class="footer-col-left">
                        <h2>Opening Hours</h2>
                        <p><i class="fa fa-clock-o" aria-hidden="true"></i>
                            Monday to Friday-9am to 9pm</p>
                        <p><i class="fa fa-clock-o" aria-hidden="true"></i>
                            Saturday and Sunday-8am to 7pm</p>
                    </div>
                    <div class="footer-col-right">
                        <h2>Get In Touch</h2>
                        <p>#21abc Colony.xyz City IN
                            <i class="fa fa-map-marker" aria-hidden="true"></i>
                        </p>
                        <p>testing@website.com
                            <i class="fa fa-paper-plane" aria-hidden="true"></i>
                        </p>
                        <p>+91 789310920
                            <i class="fa fa-phone" aria-hidden="true"></i>
                        </p>
                    </div>
                </div>
                <div class="social-media">
                    <i class="fa-brands fa-facebook-f"></i>
                    <i class="fa-brands fa-instagram" aria-hidden="true"></i>
                    <i class="fa-brands fa-twitter" aria-hidden="true"></i>
                    <i class="fa-brands fa-github" aria-hidden="true"></i>
                    <p>Copyright 2023 , design and developed by Anirudh P V . All rights reserved</p>
                </div>
            </footer>
        </div>
    )
}

export default Footer