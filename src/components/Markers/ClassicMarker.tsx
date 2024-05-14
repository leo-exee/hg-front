import { Marker, Popup } from "react-map-gl";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import { useState } from "react";
import { ToiletDTO } from "../../types/toilets.type";
import { Button, IconButton, Paper, Rating, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AccessibleIcon from "@mui/icons-material/Accessible";
import BabyChangingStationIcon from "@mui/icons-material/BabyChangingStation";
import GoogleIcon from "@mui/icons-material/Google";
import VisibilityIcon from "@mui/icons-material/Visibility";

interface MarkerProps extends ToiletDTO {
  key: string;
}

const ClassicMarker: React.FC<MarkerProps> = ({ id, location, ...props }) => {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  return (
    <>
      <Marker key={id} latitude={location.lat} longitude={location.long}>
        <FmdGoodIcon
          className="text-blue-500 text-3xl cursor-pointer"
          onClick={(e) => {
            setShowPopup(true);
          }}
        />
      </Marker>
      {showPopup && (
        <Popup
          latitude={location.lat}
          longitude={location.long}
          closeOnMove={true}
          closeButton={false}
          closeOnClick={false}
          onClose={() => setShowPopup(false)}
          anchor="bottom"
        >
          <IconButton
            size="small"
            onClick={() => setShowPopup(false)}
            className="absolute top-0 right-0"
          >
            <CloseIcon />
          </IconButton>
          <Paper className="p-4" elevation={3}>
            <Typography
              gutterBottom
              variant="h6"
              className="overflow-hidden overflow-ellipsis whitespace-nowrap"
            >
              {props.name}
            </Typography>
            <div className="flex items-center mb-2">
              <Rating
                value={props.information.rating}
                readOnly
                precision={0.5}
                size="small"
              />
              <Typography variant="body2" className="ml-2">
                {props.information.rating.toFixed()}/5
              </Typography>
            </div>
            <Typography
              gutterBottom
              variant="body1"
              className="overflow-hidden overflow-ellipsis whitespace-nowrap"
            >
              {props.address}
            </Typography>
            <Typography
              gutterBottom
              variant="body2"
              className="overflow-hidden overflow-ellipsis whitespace-nowrap"
            >
              {props.description}
            </Typography>
            <div className="flex items-center my-2">
              {props.information.handicapFriendly && (
                <AccessibleIcon fontSize="small" />
              )}
              {props.information.babyFriendly && (
                <BabyChangingStationIcon fontSize="small" />
              )}
            </div>
            <Button
              startIcon={<VisibilityIcon />}
              href={`/map/${id}`}
              variant="contained"
              size="small"
              className="text-xs capitalize"
            >
              View Details
            </Button>

            <Button
              startIcon={<GoogleIcon />}
              href={`https://www.google.com/maps/search/?api=1&query=${location.lat},${location.long}`}
              target="_blank"
              variant="contained"
              size="small"
              className="mt-2 text-xs capitalize"
            >
              Google Maps
            </Button>
          </Paper>
        </Popup>
      )}
    </>
  );
};

export default ClassicMarker;
