import ReactMapGL, { GeolocateControl, NavigationControl } from "react-map-gl";
import { useUserLocationContext } from "../contexts/LocationProvider";
import ClassicMarker from "./Markers/ClassicMarker";
import { MAPBOX_TOKEN } from "../constants/api.constant";
import { ToiletDTO } from "../types/toilets.type";
import { useEffect, useRef, useState } from "react";
import { getToilets } from "../services/api.toilets";

const Map: React.FC = () => {
  const { userLocation } = useUserLocationContext();
  const [markers, setMarkers] = useState<ToiletDTO[]>([]);

  const geoControlRef =
    useRef<mapboxgl.GeolocateControl>() as React.MutableRefObject<mapboxgl.GeolocateControl>;

  useEffect(() => {
    geoControlRef.current?.trigger();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geoControlRef.current]);

  useEffect(() => {
    getToilets().then((toilets) => setMarkers(toilets));
  }, []);

  return markers ? (
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
        <GeolocateControl position="top-right" ref={geoControlRef} />
        {markers.map(({ id, ...props }: ToiletDTO) => (
          <ClassicMarker key={id} id={id} {...props} />
        ))}
      </ReactMapGL>
    </div>
  ) : null;
};

export default Map;
