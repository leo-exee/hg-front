import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginDTO } from "../../types/user.type";
import { login } from "../../services/api.user";
import { useTranslation } from "react-i18next";

const LoginForm: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [form, setForm] = useState<LoginDTO>({
    email: "",
    password: "",
  });
  const [isFormLoading, setIsFormLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    try {
      setIsFormLoading(true);
      e.preventDefault();
      const response = login(form);
      response.then((res) => {
        if (res) {
          navigate("/");
        }
      });
    } catch (error) {
      setIsFormLoading(false);
      console.error(error);
    }
  };

  const isFormValid = useMemo(() => {
    return form.email.length > 0 && form.password.length > 0;
  }, [form]);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        className="space-y-4"
      >
        <TextField
          autoFocus
          margin="normal"
          required
          fullWidth
          id="email"
          label={t("pages.authentification.email")}
          name="email"
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="password"
          label={t("pages.authentification.password")}
          name="password"
          type="password"
          onChange={handleChange}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={!isFormValid || isFormLoading}
        >
          {t("pages.authentification.login")}
        </Button>
      </Box>
    </Container>
  );
};

export default LoginForm;
