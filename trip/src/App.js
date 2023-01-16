import './App.css';
import { ArrowRight } from "react-bootstrap-icons";

<head>
  <title>Splash Page</title>
</head>

function App() {
  return (
    <body>

      <div>
        <nav class="navbar navbar-expand-sm">
          <button class="navbar-toggler ms-auto mx-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav ms-auto">
              <a href="https://stackoverflow.com/questions/36003670/how-to-put-a-link-on-a-button-with-bootstrap" class="btn text-white navbar-font-size mx-3 fw-bold" role="button"> Login </a>
              <a href="https://stackoverflow.com/questions/36003670/how-to-put-a-link-on-a-button-with-bootstrap" class="btn text-white navbar-font-size mx-3 fw-bold" role="button"> Sign up </a>
            </div>
          </div>
        </nav>
      </div>

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

export default App;

