import { useEffect, useState } from "react";
import ReactMapGL, {
  GeolocateControl,
  Marker,
  NavigationControl,
} from "react-map-gl";

export interface locationProps {
  latitude: number;
  longitude: number;
}

const Map: React.FC = () => {
  const [location, setLocation] = useState<locationProps>({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  }, []);

  const token: string =
    process.env.MAPBOX_TOKEN ||
    "pk.eyJ1IjoibGVvZXhlZSIsImEiOiJjbHczbDM2YWUxMG1yMmlvY2FpajZmNnBuIn0.sgGHEC6thAy1yS1ExR58Hw";
    
  return (
    <div className="h-screen w-full">
      <ReactMapGL
        mapboxAccessToken={token}
        initialViewState={{
          latitude: location.latitude,
          longitude: location.longitude,
          zoom: 18,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <NavigationControl />
        <GeolocateControl position="top-right" />
      </ReactMapGL>
    </div>
  );
};

export default Map;
