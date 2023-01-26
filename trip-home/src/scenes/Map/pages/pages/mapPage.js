import SearchBar from '.../components/fragments/Searchbar.js';
import React, {useState, useEffect, useRef} from 'react';

const MapPage = (props) => {
    
    return(
        <>
            <div className='MapPage'>
                <SearchBar/>
            </div>
                        
            <script
                src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg&callback=initMap&v=weekly"
                defer> 
            </script>
        </>
    )

}

export default MapPage;