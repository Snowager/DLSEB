import React from 'react';
import '../styles/SplashPage.css';
import Navbar from '../../../Splash/components/fragments/Navbar';
import Searchbar from "../../../MapCole/components/fragments/searchBar"
import TravelSection from '../../../Splash/components/fragments/TravelSection';


function SplashPage() {
    // comment blah
    return (
        <>  
            <Navbar/>
            <div className="container text-center mt-5">
            <div className="row">
                <div className="col-md-1"> </div>
                <div className="col-md-10"></div>
                <TravelSection />
            </div>
            </div>
        </>
    );
}

export default SplashPage;
