import { useState } from "react";
import { RegisterDTO } from "../../types/user.type";
import { useNavigate } from "react-router-dom";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { register } from "../../services/api.user";

interface RegisterFormProps {
  destination?: string;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ destination }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState<RegisterDTO>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    try {
      if (form.password !== form.confirmPassword) {
        throw new Error("Passwords do not match");
      }
      e.preventDefault();
      const response = register(form);
      response.then(() => {
        navigate(destination || "/");
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        className="space-y-4"
      >
        <Typography variant="h5" align="center" className="text-2xl mt-4 mb-2">
          Register
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoFocus
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="password"
          label="Password"
          name="password"
          type="password"
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="confirmPassword"
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          onChange={handleChange}
        />

        <Button type="submit" fullWidth variant="contained" color="primary">
          Register
        </Button>
      </Box>
    </Container>
  );
};

export default RegisterForm;
