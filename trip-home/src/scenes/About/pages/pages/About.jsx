import React from 'react';
import Zac from '../../images/Zac.jpg';
import "../styles/about.css";

export function About() {
    return (
        <>
        <div className= "About" > 
            <div class= "container">
                <div class= "row aligin-items-center my-5">
                </div>
            </div>
        </div>

        <div class= "col-lg-5">
            <h1 class= "font-weight-light">About</h1>
    

        <div class= "col-lg-6">
            <h2 class= "font-weight-light">What is TR!P</h2>
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
            <div class= "image">
                <div class= "row align-items-left my-5">
                    <img src = {Zac} alt="Zac" />
                </div>
            </div>
        </div>
        </div>          
    </>       
    )
}
export default About;
