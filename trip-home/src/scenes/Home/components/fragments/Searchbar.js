import React from 'react';
import SearchBar from "../../../MapCole/components/fragments/searchBar"

const searchbar = (props) => {
    return (
        <div class="container text-center mt-5">
            <div class="row">
                <div class="col-md-1"> </div>
                <div class="col-md-10">
                    <SearchBar />
                </div>
            </div>
        </div>
    );
};

export default searchbar;
