import { Box, IconButton, Typography } from "@mui/material";
import MarkerForm from "../components/Forms/MarkerForm";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const Add: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <Box className="mt-20">
      <Box className="flex items-center">
        <IconButton
          size="large"
          onClick={() => navigate("/")}
          aria-label={t("back")}
          color="primary"
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5">{t("pages.add.title")}</Typography>
      </Box>
      <MarkerForm />
    </Box>
  );
};

export default Add;
