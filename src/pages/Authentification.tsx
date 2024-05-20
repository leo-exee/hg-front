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

  const [authType, setAuthType] = useState<AuthentificationType>(
    AuthentificationType.REGISTER
  );

  return (
    <Box className="mt-20">
      <Container>
        <Box className="flex items-center">
          <Box className="my-4 mr-2 cursor-pointer">
            <ArrowBackIcon onClick={() => navigate("/")} color="primary" />
          </Box>
          <Typography variant="h5" className="mt-4">
            {authType === AuthentificationType.LOGIN
              ? t("pages.authentification.login")
              : t("pages.authentification.register")}
          </Typography>
        </Box>
      </Container>
      <Box>
        {authType === AuthentificationType.LOGIN ? (
          <LoginForm />
        ) : (
          <RegisterForm />
        )}
      </Box>
      <Container component="main" className="mt-4 space-y-4">
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
    </Box>
  );
};

export default Authentification;
