import { useMemo, useState } from "react";
import { RegisterDTO } from "../../types/user.type";
import { useNavigate } from "react-router-dom";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { register } from "../../services/api.user";
import { useTranslation } from "react-i18next";

interface RegisterFormProps {
  destination?: string;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ destination }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [form, setForm] = useState<RegisterDTO>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isFormLoading, setIsFormLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    try {
      setIsFormLoading(true);
      if (form.password !== form.confirmPassword) {
        throw new Error("Passwords do not match");
      }
      e.preventDefault();
      const response = register(form);
      response.then(() => {
        navigate(destination || "/");
      });
    } catch (error) {
      setIsFormLoading(false);
      console.error(error);
    }
  };

  const isFormValid = useMemo(() => {
    return (
      form.email.length > 0 &&
      form.password.length > 0 &&
      form.username.length > 0 &&
      form.confirmPassword.length > 0 &&
      form.password === form.confirmPassword
    );
  }, [form]);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        className="space-y-4"
      >
        <Typography variant="h5" className="mt-4 mb-2">
          {t("pages.authentification.register")}
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label={t("pages.authentification.name")}
          name="username"
          autoFocus
          onChange={handleChange}
        />
        <TextField
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
        <TextField
          margin="normal"
          required
          fullWidth
          id="confirmPassword"
          label={t("pages.authentification.confirm-password")}
          name="confirmPassword"
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
          {t("pages.authentification.register")}
        </Button>
      </Box>
    </Container>
  );
};

export default RegisterForm;
