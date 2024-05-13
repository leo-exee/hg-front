import ReactMapGL, { GeolocateControl, NavigationControl } from "react-map-gl";
import { useUserLocationContext } from "../contexts/LocationProvider";
import { MarkerDTO, useMarkerContext } from "../contexts/MarkerProvider";
import ClassicMarker from "./Markers/ClassicMarker";
import { MAPBOX_TOKEN } from "../constants/api.constant";

const Map: React.FC = () => {
  const { userLocation } = useUserLocationContext();
  const { markers } = useMarkerContext();

  return (
    <div className="h-screen w-full">
      <ReactMapGL
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={{
          latitude: userLocation.lat,
          longitude: userLocation.long,
          zoom: 18,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <NavigationControl />
        <GeolocateControl position="top-right" />
        {markers.map(({ id, location }: MarkerDTO) => (
          <ClassicMarker key={id} id={id} location={location} />
        ))}
      </ReactMapGL>
    </div>
  );
};

export default Map;
