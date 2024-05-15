import { Marker } from "react-map-gl";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import { useState } from "react";
import { ToiletDTO } from "../../types/toilets.type";
import {
  Box,
  Button,
  Chip,
  Modal,
  Paper,
  Rating,
  Typography,
} from "@mui/material";
import AccessibleIcon from "@mui/icons-material/Accessible";
import BabyChangingStationIcon from "@mui/icons-material/BabyChangingStation";
import GoogleIcon from "@mui/icons-material/Google";
import { useTranslation } from "react-i18next";

interface MarkerProps extends ToiletDTO {
  key: string;
}

const ClassicMarker: React.FC<MarkerProps> = ({ id, location, ...props }) => {
  const { t } = useTranslation();
  const [showPopup, setShowPopup] = useState<boolean>(false);
  return (
    <>
      <Marker key={id} latitude={location.lat} longitude={location.long}>
        <Box
          onClick={(e) => {
            setShowPopup(true);
          }}
        >
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
        className="m-4 flex justify-center items-center"
      >
        <Paper className="p-4 space-y-4 flex flex-col" elevation={3}>
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
          <Typography
            gutterBottom
            variant="body2"
            className="max-h-40 overflow-y-auto"
          >
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
                <Typography variant="body2" className="ml-2">
                  {props.information.cleanliness.toFixed()}/5
                </Typography>
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
                <Typography variant="body2" className="ml-2">
                  {props.information.accessbility.toFixed()}/5
                </Typography>
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
                <Typography variant="body2" className="ml-2">
                  {props.information.state.toFixed()}/5
                </Typography>
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
                <Typography variant="body2" className="ml-2">
                  {props.information.rating.toFixed()}/5
                </Typography>
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
        </Paper>
      </Modal>
    </>
  );
};

export default ClassicMarker;
