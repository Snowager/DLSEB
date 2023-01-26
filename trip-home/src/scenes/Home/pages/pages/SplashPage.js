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
            <div class="container text-center mt-4">
                <div class="row">
                    <div class="col-md-4">
                        <a href="https://stackoverflow.com/questions/32974967/how-to-change-shape-of-bootstrap-button" class="btn rounded-3 bg-white fw-bold px-4 node-choices-font my-2" role="button"> Food </a>
                    </div>
                    <div class="col-md-4">
                        <a href="https://stackoverflow.com/questions/32974967/how-to-change-shape-of-bootstrap-button" class="btn rounded-3 bg-white fw-bold px-4 node-choices-font my-2" role="button"> Activities </a>
                    </div>
                    <div class="col-md-4">
                        <a href="https://stackoverflow.com/questions/32974967/how-to-change-shape-of-bootstrap-button" class="btn rounded-3 bg-white fw-bold px-4 node-choices-font my-2" role="button"> Stay </a>
                    </div>
                </div>
            </div>

            

        </body>
    );
}

export default SplashPage;
