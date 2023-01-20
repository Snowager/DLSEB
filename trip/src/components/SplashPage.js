import './SplashPage.css';
import { ArrowRight } from "react-bootstrap-icons";
import Navbar from './Navbar.js';



function SplashPage() {
    return (
        <body>

            <Navbar />

            <h1 class="text-center text-white display-5 font-weight-bold mt-5 pt-5 fw-bold"> TR!P </h1>

            <div class="container text-center mt-5">
                <div class="row">
                    <div class="col-md-1"> </div>
                    <div class="col-md-10">
                        <div class="input-group">
                            <input type="search" class="form-control py-3" placeholder="tacos, cheap dinner, Max's" aria-label="Search" aria-describedby="search-addon" />
                            <input type="search" class="form-control" placeholder="Greeley, CO" aria-label="Search" aria-describedby="search-addon" />
                            <span class="input-group-text border-0" id="search-addon">
                                <ArrowRight class="arrow-icon-font" />
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="container text-center mt-4">
                <div class="row">
                    <div class="col-md-4">
                        <a href="https://stackoverflow.com/questions/32974967/how-to-change-shape-of-bootstrap-button" class="btn rounded-0 bg-white fw-bold px-4 node-choices-font my-2" role="button"> Food </a>
                    </div>
                    <div class="col-md-4">
                        <a href="https://stackoverflow.com/questions/32974967/how-to-change-shape-of-bootstrap-button" class="btn rounded-0 bg-white fw-bold px-4 node-choices-font my-2" role="button"> Activities </a>
                    </div>
                    <div class="col-md-4">
                        <a href="https://stackoverflow.com/questions/32974967/how-to-change-shape-of-bootstrap-button" class="btn rounded-0 bg-white fw-bold px-4 node-choices-font my-2" role="button"> Stay </a>
                    </div>
                </div>
            </div>

        </body>
    );
}

export default SplashPage;
