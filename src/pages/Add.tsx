import { Box, Container, IconButton, Typography } from "@mui/material";
import MarkerForm from "../components/Forms/MarkerForm";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const Add: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <Box className="mt-20">
      <Container>
        <Box className="flex items-center">
          <Box className="my-2 mr-2 cursor-pointer">
            <ArrowBackIcon onClick={() => navigate("/")} color="primary" />
          </Box>
          <Typography variant="h5">{t("pages.add.title")}</Typography>
        </Box>
      </Container>
      <MarkerForm />
    </Box>
  );
};

export default Add;
