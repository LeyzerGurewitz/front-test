import React, { useState, useCallback, useEffect } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { blackAndWhiteStyle } from "./worldMapStyle";
import {
  CasualtyRegion,
  GroupData,
  TheBigGestGroup,
} from "../../types/attackType";

interface GoogleMapComponentProps {
  attack: CasualtyRegion[] | GroupData[] | TheBigGestGroup[] | null;
}
const containerStyle = { width: "100%", height: "100%" };
const defaultCenter = { lat: 31.986659, lng: 34.855367 };

const GoogleMapComponent: React.FC<GoogleMapComponentProps> = ({ attack }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY,
  });
  const [markers, setMarkers] = useState<any[]>([]);
  const [selectedMarker, setSelectedMarker] = useState<any | null>(null);
  const [_, setMap] = useState<google.maps.Map | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds();
    bounds.extend({ lat: 33.3, lng: 34.3 });
    bounds.extend({ lat: 29.5, lng: 35.9 });
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  useEffect(() => {
    if (attack) {
      const newMarkers = attack.map((attack: any) => {
        const lat = attack.latitude;
        const lng = attack.longitude;
        console.log("attack loc", lat, lng);
        return { lat, lng };
      });

      setMarkers(newMarkers);
    }
  }, [attack]);

  const onUnmount = useCallback(() => setMap(null), []);

  if (!isLoaded) {
    return <div>Loading Google Map...</div>;
  }

  const center =
    markers.length > 0
      ? { lat: markers[0].lat, lng: markers[0].lng }
      : defaultCenter;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{ styles: blackAndWhiteStyle }}
    >
      {markers.map((marker, index) => (
        <Marker
          key={index}
          position={{ lat: marker.lat, lng: marker.lng }}
          icon={"http://maps.google.com/mapfiles/ms/icons/blue-dot.png"}
          onClick={() => {
            if (
              selectedMarker &&
              selectedMarker.lat === marker.lat &&
              selectedMarker.lng === marker.lng
            ) {
              setSelectedMarker(null);
            } else {
              setSelectedMarker(marker);
            }
          }}
        />
      ))}
    </GoogleMap>
  );
};

export default GoogleMapComponent;
