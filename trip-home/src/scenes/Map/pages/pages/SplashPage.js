import '../styles/SplashPage.css';
import Navbar from '.../components/fragments/Navbar.js';
import Searchbar from '.../components/fragments/Searchbar.js';
import React from 'react';
import * as ReactDOM from 'react-dom';
import MapPage from './mapPage.js';

function SplashPage() {

    const root = require('../index.js');

    const onSelect = item => {
        console.log("clicked food");
        root.render(<MapPage/>);
    }

    return (
        <body>

            <Navbar />

            <h1 className="text-center text-white display-5 font-weight-bold mt-5 pt-5 fw-bold"> TR!P </h1>

            <Searchbar />

            <div class="container text-center mt-4">
                <div className="row">
                    <div className="col-md-4">
                        <a onClick = {() => onSelect()} className="btn rounded-3 bg-white fw-bold px-4 node-choices-font my-2" role="button"> Food </a>
                    </div>
                    <div class="col-md-4">
                        <a href="https://stackoverflow.com/questions/32974967/how-to-change-shape-of-bootstrap-button" className="btn rounded-3 bg-white fw-bold px-4 node-choices-font my-2" role="button"> Activities </a>
                    </div>
                    <div class="col-md-4">
                        <a href="https://stackoverflow.com/questions/32974967/how-to-change-shape-of-bootstrap-button" className="btn rounded-3 bg-white fw-bold px-4 node-choices-font my-2" role="button"> Stay </a>
                    </div>
                </div>
            </div>

        </body>
    );
}

export default SplashPage;
