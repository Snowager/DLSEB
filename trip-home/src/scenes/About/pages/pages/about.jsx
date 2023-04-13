import React from 'react';
import Zac from '../../images/Zac.jpg';
import Nate from '../../images/Nate.png';
import Cole from '../../images/Cole.png';
import Niko from '../../images/Niko.png';
import Tiffany from '../../images/Tiffany.png';
import Rachel from '../../images/Rachel.png';
import Alex from '../../images/Alex.png';
import "../styles/about.css";

export function About() {
    return (
        <div class= "app">
            <div class= "header"> 
                What is TR!P?
            </div>

        <div class= "headPara">
            <p> 
            Welcome to TR!P, where we make trip planning easy and stress-free!
            At TR!P, we understand that planning a trip can be overwhelming and time-consuming. 
            That's why we're here to help you plan the perfect getaway, whether it's a night on the town or an adventure overseas.
            On our website, you can search for destinations and plan your itinerary all in one place. 
            We believe that travel has the power to transform and enrich our lives, and we're dedicated to 
            helping you make the most of your trip. Whether you're a seasoned traveler or a first-time adventurer, 
            we're here to help you plan your next unforgettable journey.
            </p>
        </div>

        <div class= "header"> 
            Meet the TR!P Team
        </div>

        <div class='outside-parent'>
            <div class='outside-child'>
                <div class='inside-parent'>
                    <div class='inside-child'>
                        <img src = {Cole} alt="Cole" />
                    </div>
                    <div class='inside-child'>
                        <p className = 'nameHeader'>Cole Robinson</p>
                        <p>Coordinator, Software Developer</p>
                    </div>
                </div>
                <div class='inside-parent'>
                    <div class='inside-child'>
                        <img src = {Tiffany} alt="Tiffany" />
                    </div>
                    <div class='inside-child'>
                        <p className = 'nameHeader'>Tiffany Kouakou</p>
                        <p>Business Analyst, Database Architect, Secuirty Engineer</p>
                    </div>
                </div>
                <div class='inside-parent'>
                    <div class='inside-child'>
                        <img src = {Niko} alt="Niko" />
                    </div>
                    <div class='inside-child'>
                        <p className = 'nameHeader'>Niko Antuna</p>
                        <p>Web Developer, UI / UX Designer</p>
                    </div>
                </div>
            </div>

            <div class='outside-child'>
                <div class='inside-parent'>
                    <div class='inside-child'>
                        <img src = {Alex} alt="Alex" />
                    </div>
                    <div class='inside-child'>
                        <p className = 'nameHeader'>Alex Bradberry</p>
                        <p>Software Developer, Network Architect, Database Architect</p>
                    </div>
                </div>
                <div class='inside-parent'>
                    <div class='inside-child'>
                        <img src = {Rachel} alt="Rachel" />
                    </div>
                    <div class='inside-child'>
                        <p className = 'nameHeader'>Rachel Godina</p>
                        <p>Business Analyst, Security Engineer, Database Architect</p>
                    </div>
                </div>
                <div class='inside-parent'>
                    <div class='inside-child'>
                        <img src = {Nate} alt="1" />
                    </div>
                    <div class='inside-child'>
                        <p className = 'nameHeader'>Nate Burdick</p>
                        <p> Web Developer, UI / UX Designer</p>
                    </div>
                </div>
            </div>
        </div>

        </div>              
    )
}
export default About;
