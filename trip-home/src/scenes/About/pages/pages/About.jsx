import React from 'react';
import Zac from '../../images/Zac.jpg';
import "../styles/about.css";

export function About() {
    return (
        <div class= "app">
            <div class= "header"> 
                What is TR!P?
            </div>

        <div class= "headPara">
            <p> 
            TR!P offers a solution for the influx of people who want to travel and experience the world but don’t want to be bogged down 
            with all the planning that comes with going out. TR!P will allow a user to designate specific conditions 
            (location, budget, interests, timeline), and our algorithm will then provide them with the perfect trip. 
            In addition to serving the immense customer base already available in this sector, our app’s “hands-free” solution 
            will help encourage others to get out and support entertainment businesses more, through its ease-of-use interface. 
            Our algorithm will serve as a bridge between travel packages and the modern young customer base that prefers an 
            all-encompassing solution at their fingers. For older customers, our app provides a hassle-free system with a clear 
            UI to help book that dream vacation or just that needed night out.  
            </p>
        </div>

        <div class= "header"> 
            Meet the TR!P Team
        </div>

        <div class='outside-parent'>
            <div class='outside-child'>
                <div class='inside-parent'>
                    <div class='inside-child'>
                        <img src = {Zac} alt="Zac" />
                    </div>
                    <div class='inside-child'>
                        <p className = 'nameHeader'>Cole Robinson</p>
                        <p>Database Architect, Software Developer, Security Engineer</p>
                    </div>
                </div>
                <div class='inside-parent'>
                    <div class='inside-child'>
                        <img src = {Zac} alt="Zac" />
                    </div>
                    <div class='inside-child'>
                        <p className = 'nameHeader'>Tiffany Kouakou</p>
                        <p>Business Analyst, UI / UX Designer, Database Architect</p>
                    </div>
                </div>
                <div class='inside-parent'>
                    <div class='inside-child'>
                        <img src = {Zac} alt="Zac" />
                    </div>
                    <div class='inside-child'>
                        <p className = 'nameHeader'>Niko Antuna</p>
                        <p>Coordinator, Web Developer, UI / UX Designer</p>
                    </div>
                </div>
            </div>

            <div class='outside-child'>
                <div class='inside-parent'>
                    <div class='inside-child'>
                        <img src = {Zac} alt="Zac" />
                    </div>
                    <div class='inside-child'>
                        <p className = 'nameHeader'>Alex Bradberry</p>
                        <p>Software Developer, Web Developer, Network Architect</p>
                    </div>
                </div>
                <div class='inside-parent'>
                    <div class='inside-child'>
                        <img src = {Zac} alt="Zac" />
                    </div>
                    <div class='inside-child'>
                        <p className = 'nameHeader'>Rachel Godina</p>
                        <p>Business Analyst, UI / UX Designer, Security Engineer</p>
                    </div>
                </div>
                <div class='inside-parent'>
                    <div class='inside-child'>
                        <img src = {Zac} alt="Zac" />
                    </div>
                    <div class='inside-child'>
                        <p className = 'nameHeader'>Nate Burdick</p>
                        <p>Software Developer, Web Developer, UI / UX Designer</p>
                    </div>
                </div>
            </div>
        </div>

        </div>              
    )
}
export default About;
