import React from 'react';
import '../styles/splash_page.css';
import Navbar from '../../../Splash/components/fragments/navbar';
import TravelSection from '../../../Splash/components/fragments/travel_section';


function SplashPage() {
    return (
        <>
            <Navbar />
            <div className="container text-center mt-5">
                <img class = "homescreen_logo" src="logo.png"/>
                <div className="row">
                    <TravelSection />
                </div>
            </div>
        </>
    );
}

export default SplashPage;
