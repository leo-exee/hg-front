import {
  Box,
  Button,
  Chip,
  Container,
  IconButton,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useTranslation } from "react-i18next";
import { getUserToken } from "../constants/api.constant";
import InstagramIcon from "@mui/icons-material/Instagram";

const Info: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <Box className="mt-20">
      <Container>
        <Box className="flex items-center">
          <Box className="my-2 mr-2 cursor-pointer">
            <ArrowBackIcon onClick={() => navigate("/")} color="primary" />
          </Box>
          <Typography variant="h5">{t("pages.info.title")}</Typography>
        </Box>
      </Container>
      <Container component="main">
        <Typography
          variant="h6"
          color="primary"
          className="pt-4 pb-2"
          textAlign="center"
        >
          {t("pages.info.why")}
        </Typography>
        <Typography
          className="whitespace-pre-line"
          variant="body1"
          textAlign="justify"
        >
          {t("pages.info.why-text1")}
        </Typography>
        <Box className="flex flex-wrap justify-center my-4">
          <Chip
            color="secondary"
            className="mb-1 ml-1"
            label={t("pages.info.hashtag.1")}
            size="medium"
          />
          <Chip
            color="secondary"
            className="mb-1 ml-1"
            label={t("pages.info.hashtag.2")}
            size="medium"
          />
          <Chip
            color="secondary"
            className="mb-1 ml-1"
            label={t("pages.info.hashtag.3")}
            size="medium"
          />
          <Chip
            color="secondary"
            className="mb-1 ml-1"
            label={t("pages.info.hashtag.4")}
            size="medium"
          />
        </Box>
        <Typography
          className="whitespace-pre-line"
          variant="body1"
          textAlign="justify"
        >
          {t("pages.info.why-text2")}
        </Typography>
        <Typography
          variant="h6"
          color="primary"
          className="pt-4 pb-2"
          textAlign="center"
        >
          {t("pages.info.how")}
        </Typography>
        <Typography
          className="whitespace-pre-line"
          variant="body1"
          textAlign="justify"
        >
          {t("pages.info.how-text")}
        </Typography>
        <Typography
          variant="h6"
          color="primary"
          className="pt-4 pb-2"
          textAlign="center"
        >
          {t("pages.info.join")}
        </Typography>
        <Typography
          className="whitespace-pre-line"
          variant="body1"
          textAlign="justify"
        >
          {t("pages.info.join-text")}
        </Typography>
        <Box className="flex justify-center flex-col	items-center my-4 space-y-4">
          {getUserToken() ? (
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/add")}
            >
              {t("pages.add.title")}
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              className="mt-4"
              onClick={() => navigate("/authentification")}
            >
              {t("menu.authentification")}
            </Button>
          )}
          <Button
            variant="contained"
            color="secondary"
            startIcon={<InstagramIcon />}
            href="https://www.instagram.com/my_trone_official/"
            target="_blank"
          >
            {t("pages.info.instagram")}
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Info;
