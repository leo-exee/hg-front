import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginDTO } from "../../types/user.type";
import { login } from "../../services/api.user";

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<LoginDTO>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = login(form);
    response.then((res) => {
      if (res) {
        navigate("/");
      }
    });
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
          Login
        </Typography>
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

        <Button type="submit" fullWidth variant="contained" color="primary">
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default LoginForm;
