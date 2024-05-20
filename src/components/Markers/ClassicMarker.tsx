import { Marker, useMap } from "react-map-gl";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import { useState } from "react";
import { ToiletDTO } from "../../types/toilets.type";
import {
  Box,
  Button,
  Chip,
  IconButton,
  Modal,
  Paper,
  Rating,
  Typography,
} from "@mui/material";
import AccessibleIcon from "@mui/icons-material/Accessible";
import BabyChangingStationIcon from "@mui/icons-material/BabyChangingStation";
import GoogleIcon from "@mui/icons-material/Google";
import { useTranslation } from "react-i18next";
import CloseIcon from "@mui/icons-material/Close";

interface MarkerProps extends ToiletDTO {
  key: string;
}

const ClassicMarker: React.FC<MarkerProps> = ({ id, location, ...props }) => {
  const { t } = useTranslation();
  const [showPopup, setShowPopup] = useState<boolean>(false);

  const handleClick = () => {
    setShowPopup(true);
  };
  return (
    <>
      <Marker key={id} latitude={location.lat} longitude={location.long}>
        <Box onClick={handleClick}>
          <FmdGoodIcon
            className="cursor-pointer"
            fontSize="large"
            color="primary"
          />
        </Box>
      </Marker>
      <Modal
        open={showPopup}
        onClose={() => setShowPopup(false)}
        className="m-4"
      >
        <Box className="space-y-4 p-4 flex flex-col max-h-full overflow-y-auto bg-white rounded-lg">
          <Box className="flex justify-between items-center">
            <Typography variant="h6" color="primary">
              {t("pages.marker.information")}
            </Typography>
            <IconButton
              aria-label="close"
              className="self-end"
              onClick={() => setShowPopup(false)}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Typography gutterBottom variant="h5">
            {props.name}
          </Typography>
          <div className="flex flex-wrap">
            {props.information.handicapFriendly && (
              <Chip
                avatar={<AccessibleIcon />}
                label={t("pages.marker.handicap-friendly")}
                color="primary"
                size="small"
                className="mb-1 ml-1"
              />
            )}
            {props.information.babyFriendly && (
              <Chip
                avatar={<BabyChangingStationIcon />}
                label={t("pages.marker.baby-changing")}
                color="primary"
                size="small"
                className="mb-1 ml-1"
              />
            )}
          </div>
          <Typography component="text" variant="body1">
            {props.address}
          </Typography>
          <Typography gutterBottom variant="body2">
            {props.description}
          </Typography>
          <Box className="space-y-2">
            <Box>
              <Typography component="legend" variant="body2">
                {t("pages.marker.cleanliness")}
              </Typography>
              <div className="flex items-center">
                <Rating
                  value={props.information.cleanliness}
                  readOnly
                  precision={0.5}
                  size="small"
                />
              </div>
            </Box>
            <Box>
              <Typography component="legend" variant="body2">
                {t("pages.marker.accessibility")}
              </Typography>
              <div className="flex items-center">
                <Rating
                  value={props.information.accessbility}
                  readOnly
                  precision={0.5}
                  size="small"
                />
              </div>
            </Box>
            <Box>
              <Typography component="legend" variant="body2">
                {t("pages.marker.state")}
              </Typography>
              <div className="flex items-center">
                <Rating
                  value={props.information.state}
                  readOnly
                  precision={0.5}
                  size="small"
                />
              </div>
            </Box>
            <Box>
              <Typography component="legend">
                {t("pages.marker.total-rate")}
              </Typography>
              <div className="flex items-center">
                <Rating
                  value={props.information.rating}
                  readOnly
                  precision={0.5}
                  size="small"
                />
              </div>
            </Box>
          </Box>
          <Box className="flex align-center justify-center">
            <Button
              startIcon={<GoogleIcon />}
              href={`https://www.google.com/maps/search/?api=1&query=${location.lat},${location.long}`}
              target="_blank"
              variant="contained"
              className="mt-2 text-xs w-full max-w-xs"
            >
              Google Maps
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ClassicMarker;
