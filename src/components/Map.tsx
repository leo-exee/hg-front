import ReactMapGL, { GeolocateControl, NavigationControl } from "react-map-gl";
import { useUserLocationContext } from "../contexts/LocationProvider";
import ClassicMarker from "./Markers/ClassicMarker";
import { MAPBOX_TOKEN } from "../constants/api.constant";
import { ToiletDTO } from "../types/toilets.type";
import { useEffect, useState } from "react";
import { getToilets } from "../services/api.toilets";

const Map: React.FC = () => {
  const { userLocation } = useUserLocationContext();
  const [markers, setMarkers] = useState<ToiletDTO[]>([]);

  useEffect(() => {
    getToilets().then((toilets) => setMarkers(toilets));
  }, []);

  return markers ? (
    <div className="h-screen w-full">
      <ReactMapGL
        id="WorldMap"
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={{
          latitude: userLocation.lat,
          longitude: userLocation.long,
          zoom: 18,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <NavigationControl />
        <GeolocateControl
          position="top-right"
          trackUserLocation={true}
          showAccuracyCircle={false}
        />
        {markers.map(({ id, ...props }: ToiletDTO) => (
          <ClassicMarker key={id} id={id} {...props} />
        ))}
      </ReactMapGL>
    </div>
  ) : null;
};

export default Map;
