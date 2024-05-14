import { AppBar, IconButton, Toolbar } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoginIcon from "@mui/icons-material/Login";
import { getUserToken } from "../constants/api.constant";

const MenuBar = () => {
  return (
    <AppBar position="static">
      <Toolbar variant="dense" className="flex justify-between items-center">
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
