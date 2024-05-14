import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router-dom";
import { getUserToken } from "../constants/api.constant";

const MenuBar = () => {
  const navigate = useNavigate();
  const handleHome = () => {
    navigate("/");
  };
  return (
    <AppBar position="static">
      <Toolbar variant="dense" className="flex justify-between items-center">
        <Typography variant="h6" onClick={handleHome}>
          My Trone
        </Typography>
        <IconButton
          edge="end"
          color="inherit"
          aria-label="account of current user"
          aria-haspopup="true"
          aria-controls="menu-appbar"
          aria-expanded={false}
          size="large"
          href="/dashboard"
        >
          {getUserToken() ? <AccountCircleIcon /> : <LoginIcon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
export default MenuBar;
