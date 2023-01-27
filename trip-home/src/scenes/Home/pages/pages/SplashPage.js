import React from 'react';
import '../styles/SplashPage.css';
import Searchbar from "../../../MapCole/components/fragments/searchBar"
import TravelSection from '../../../Splash/components/fragments/TravelSection';


function SplashPage() {
    return (
        <body>
            <div class="container text-center mt-5">
            <div class="row">
                <div class="col-md-1"> </div>
                <div class="col-md-10"></div>
                <TravelSection />
            </div>
            </div>
        </body>
    );
}

export default SplashPage;
