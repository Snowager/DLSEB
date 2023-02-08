import React from 'react';
import Zac from '../../images/Zac.jpg';
import "../styles/about.css";

export function About() {
    return (
        <div class= "app">
            <div class= "header"> 
                <h1 class= "font-weight-light">What is TR!P?</h1>
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
                <h1>Meet the TR!P Team</h1>
            </div>

        <div class='outside-parent'>
            <div class='outside-child'>
                <div class='inside-parent'>
                    <div class='child'>
                        <img src = {Zac} alt="Zac" />
                    </div>
                </div>
                <div class='inside-parent'>
                    <div class='child'>
                        <img src = {Zac} alt="Zac" />
                    </div>
                </div>
                <div class='inside-parent'>
                    <div class='child'>
                        <img src = {Zac} alt="Zac" />
                    </div>
                </div>
            </div>

            <div class='outside-child'>
                <div class='inside-parent'>
                    <div class='child'>
                        <img src = {Zac} alt="Zac" />
                    </div>
                </div>
                <div class='inside-parent'>
                    <div class='child'>
                        <img src = {Zac} alt="Zac" />
                    </div>
                </div>
                <div class='inside-parent'>
                    <div class='child'>
                        <img src = {Zac} alt="Zac" />
                    </div>
                </div>
            </div>
        </div>

        </div>              
    )
}
export default About;
