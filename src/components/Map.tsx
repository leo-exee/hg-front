import ReactMapGL, { GeolocateControl, NavigationControl } from "react-map-gl";
import { useUserLocationContext } from "../contexts/LocationProvider";
import { useMarkerContext } from "../contexts/MarkerProvider";
import ClassicMarker from "./Markers/ClassicMarker";
import { MAPBOX_TOKEN } from "../constants/api.constant";
import { ToiletDTO } from "../types/toilets.type";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Map: React.FC = () => {
  const { userLocation } = useUserLocationContext();
  const { markers } = useMarkerContext();

  const geoControlRef =
    useRef<mapboxgl.GeolocateControl>() as React.MutableRefObject<mapboxgl.GeolocateControl>;

  useEffect(() => {
    geoControlRef.current?.trigger();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geoControlRef.current]);

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
