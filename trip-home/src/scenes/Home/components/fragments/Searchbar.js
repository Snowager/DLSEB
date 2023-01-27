import React from 'react';

const searchbar = (props) => {
    return (
        <div class="container text-center mt-5">
            <div class="row">
                <div class="col-md-1"> </div>
                <div class="col-md-10">
                    <div class="input-group">
                        <input type="search" class="form-control py-3" placeholder="Greeley, CO" aria-label="Search" aria-describedby="search-addon" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default searchbar;
