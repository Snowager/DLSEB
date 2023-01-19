import React from 'react';

const navbar = (props) => {
    return <div>
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
};

export default navbar;