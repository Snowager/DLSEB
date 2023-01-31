import { useState, useCallback } from "react";
import { GoogleMapsProvider } from "@ubilabs/google-maps-react-hooks";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import SuperClusterAlgorithm from "../../components/fragments/Super_Cluster_Algorithm.js";
import restaurant from "../../data/restaurant";

const mapOptions = {
    zoom: 10,
    center: {
        lat: 40.4152,
        lng: -104.7706,
    },
};

export default function Test() {
    const [mapContainer, setMapContainer] = useState(null);
    const onLoad = useCallback((map) => addMarkers(map), []);

    return (
        <GoogleMapsProvider
            mapContainerClassName="map-container"
            googleMapsAPIKey="AIzaSyCqZGpZi8NbIqDp7jvaKZKCWDqMT3-_kr4"
            options={mapOptions}
            mapContainer={mapContainer}
            onLoad={onLoad}
        >
            <div ref={(node) => setMapContainer(node)} style={{ height: "100vh" }} />
        </GoogleMapsProvider>
    );
}

function addMarkers(map) {
    const infoWindow = new window.google.maps.InfoWindow();

    const markers = restaurant.map(([name, lat, lng]) => {
        const marker = new window.google.maps.Marker({ position: { lat, lng } });

        marker.addListener("click", () => {
            infoWindow.setPosition({ lat, lng });
            infoWindow.setContent(`
        <div class="info-window">
          <h2>${name}</h2>
        </div>
      `);
            infoWindow.open({ map });
        });

        return marker;
    });

    new MarkerClusterer({
        markers,
        map,
        algorithm: new SuperClusterAlgorithm({ radius: 200 }),
    });
}
