import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import '../../../Home/pages/styles/Map.css';

import '../styles/Map.css';

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

export default function Home() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCqZGpZi8NbIqDp7jvaKZKCWDqMT3-_kr4",
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading...</div>
  return <MapPage />;
}


function MapPage() {
  const location = useLocation()
  const [selected, setSelected] = useState([]);


  if (location.state) {
    const center = ({ lat: parseFloat(location.state.lat), lng: parseFloat(location.state.lng) });
    console.log(location.state)
    return (
      <>
        <h2>{location.state.lat}, nate WHO? {location.state.lng}</h2>
        {/*<MapContainer lat={lat} lng={lng} status={map} zoom={10} /> */}
        <GoogleMap zoom={10} center={center} mapContainerClassName="map-container">
          {selected && <Marker position={selected} />}
        </GoogleMap>
      </>
    );
  }
  return (
    <p>
      loading...
    </p>
  );


};
