import { Marker } from "react-map-gl";
import { MarkerDTO } from "../../contexts/MarkerProvider";
import FmdGoodIcon from "@mui/icons-material/FmdGood";

interface MarkerProps extends MarkerDTO {
  key: string;
}

const ClassicMarker: React.FC<MarkerProps> = ({ id, location }) => {
  return (
    <Marker key={id} latitude={location.lat} longitude={location.long}>
      <FmdGoodIcon className="text-blue-500 text-3xl" />
    </Marker>
  );
};

export default ClassicMarker;
