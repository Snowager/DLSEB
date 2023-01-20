import './SplashPage.css';
import Navbar from './Navbar.js';
import Searchbar from './Searchbar.js';


function SplashPage() {
    return (
        <body>

            <Navbar />

            <h1 class="text-center text-white display-5 font-weight-bold mt-5 pt-5 fw-bold"> TR!P </h1>

            <Searchbar />

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
