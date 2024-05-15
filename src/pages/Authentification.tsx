import { useNavigate } from "react-router-dom";
import { Box, Button, Container, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import LoginForm from "../components/Forms/LoginForm";
import RegisterForm from "../components/Forms/RegisterForm";
import { useTranslation } from "react-i18next";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

enum AuthentificationType {
  LOGIN = "login",
  REGISTER = "register",
}

const Authentification: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    navigate(`/authentification`);
  }, []);

  const [authType, setAuthType] = useState<AuthentificationType>(
    AuthentificationType.REGISTER
  );

  return (
    <>
      <Box className="flex items-center mt-16">
        <IconButton
          size="large"
          onClick={() => navigate("/")}
          aria-label={t("back")}
          color="primary"
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" className="mt-4">
          {authType === AuthentificationType.LOGIN
            ? t("pages.authentification.login")
            : t("pages.authentification.register")}
        </Typography>
      </Box>
      <Box>
        {authType === AuthentificationType.LOGIN ? (
          <LoginForm />
        ) : (
          <RegisterForm />
        )}
      </Box>
      <Container component="main" maxWidth="xs" className="mt-4 space-y-4">
        <Typography className="mt-2" align="center">
          {authType === AuthentificationType.LOGIN
            ? t("pages.authentification.not-registered")
            : t("pages.authentification.already-registered")}
        </Typography>
        <Button
          className="w-full"
          variant="contained"
          color="secondary"
          onClick={() =>
            setAuthType(
              authType === AuthentificationType.LOGIN
                ? AuthentificationType.REGISTER
                : AuthentificationType.LOGIN
            )
          }
        >
          {authType === AuthentificationType.LOGIN
            ? t("pages.authentification.register")
            : t("pages.authentification.login")}
        </Button>
      </Container>
    </>
  );
};

export default Authentification;
