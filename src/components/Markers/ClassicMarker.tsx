import { Marker } from "react-map-gl";
import { MarkerDTO } from "../../contexts/MarkerProvider";
import FmdGoodIcon from "@mui/icons-material/FmdGood";

interface MarkerProps extends MarkerDTO {
  key: string;
}

const ClassicMarker: React.FC<MarkerProps> = ({ id, latitude, longitude }) => {
  return (
    <Marker key={id} latitude={latitude} longitude={longitude}>
      <FmdGoodIcon className="text-blue-500 text-3xl" />
    </Marker>
  );
};

export default ClassicMarker;
