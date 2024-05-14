import { useNavigate } from "react-router-dom";
import { Button, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import LoginForm from "../components/Forms/LoginForm";
import RegisterForm from "../components/Forms/RegisterForm";

enum AuthentificationType {
  LOGIN = "login",
  REGISTER = "register",
}

const Authentification: React.FC<{ redirection?: string }> = ({
  redirection = "/dashboard",
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`/authentification`);
  }, []);
  const [authType, setAuthType] = useState<AuthentificationType>(
    AuthentificationType.REGISTER
  );

  return (
    <>
      {authType === AuthentificationType.LOGIN ? (
        <LoginForm />
      ) : (
        <RegisterForm />
      )}
      <Container component="main" maxWidth="xs" className="mt-4">
        <Typography className="mb-2" align="center">
          {authType === AuthentificationType.LOGIN
            ? "Don't have an account?"
            : "Already have an account?"}
        </Typography>
        <Button
          className="w-full"
          variant="outlined"
          onClick={() =>
            setAuthType(
              authType === AuthentificationType.LOGIN
                ? AuthentificationType.REGISTER
                : AuthentificationType.LOGIN
            )
          }
        >
          {authType === AuthentificationType.LOGIN ? "Register" : "Login"}
        </Button>
      </Container>
    </>
  );
};

export default Authentification;
