import ReactMapGL, { GeolocateControl, NavigationControl } from "react-map-gl";
import { useUserLocationContext } from "../contexts/LocationProvider";
import { MarkerDTO, useMarkerContext } from "../contexts/MarkerProvider";
import ClassicMarker from "./Markers/ClassicMarker";

const Map: React.FC = () => {
  const { userLocation } = useUserLocationContext();
  const { markers } = useMarkerContext();

  const token: string =
    process.env.MAPBOX_TOKEN ||
    "pk.eyJ1IjoibGVvZXhlZSIsImEiOiJjbHczbDM2YWUxMG1yMmlvY2FpajZmNnBuIn0.sgGHEC6thAy1yS1ExR58Hw";

  return (
    <div className="h-screen w-full">
      <ReactMapGL
        mapboxAccessToken={token}
        initialViewState={{
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          zoom: 18,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <NavigationControl />
        <GeolocateControl position="top-right" />
        {markers.map(({ id, latitude, longitude }: MarkerDTO) => (
          <ClassicMarker
            key={id}
            id={id}
            latitude={latitude}
            longitude={longitude}
          />
        ))}
      </ReactMapGL>
    </div>
  );
};

export default Map;
