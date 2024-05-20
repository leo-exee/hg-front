import { Box, Button, Typography } from "@mui/material";
import noMatch from "../assets/noMatch.png";
import { useTranslation } from "react-i18next";

const NoMatch: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Box className="flex justify-center items-center h-screen p-8 flex-col space-y-4">
      <img src={noMatch} alt="404" className="h-80 object-contain" />
      <Typography>{t("pages.404.text")}</Typography>
      <Button variant="contained" color="primary" href="/">
        {t("pages.404.home")}
      </Button>
    </Box>
  );
};

export default NoMatch;
