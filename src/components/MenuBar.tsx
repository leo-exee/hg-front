import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoginIcon from "@mui/icons-material/Login";
import { getUserToken } from "../constants/api.constant";
import favicon from "../assets/favicon.png";
import { useNavigate } from "react-router-dom";

const MenuBar = () => {
  const navigate = useNavigate();
  return (
    <AppBar position="fixed">
      <Toolbar variant="dense" className="flex justify-between items-center">
        <Box
          onClick={() => navigate("/")}
          className="flex items-center cursor-pointer space-x-2"
        >
          <img src={favicon} alt="Logo" className="w-8 h-8" />
          <Typography variant="body1">My Trone</Typography>
        </Box>
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
