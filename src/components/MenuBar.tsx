import {
  AppBar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoginIcon from "@mui/icons-material/Login";
import { getUserToken } from "../constants/api.constant";
import favicon from "../assets/favicon.png";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const MenuBar = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!getUserToken()) navigate("/dashboard");
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguage = () => {
    i18n.changeLanguage(i18n.language === "en" ? "fr" : "en");
    handleClose();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    navigate("/");
    handleClose();
  };
  return (
    <AppBar position="fixed">
      <Toolbar variant="dense" className="flex justify-between items-center">
        <Box
          onClick={() => navigate("/")}
          className="flex items-center cursor-pointer space-x-2"
        >
          <img src={favicon} alt="Logo" className="w-8 h-8" />
          <Typography variant="body1">{t("name")}</Typography>
        </Box>
        <IconButton
          edge="end"
          color="inherit"
          aria-label="account of current user"
          aria-haspopup="true"
          aria-controls="menu-appbar"
          aria-expanded={false}
          size="large"
          onClick={handleClick}
        >
          {getUserToken() ? <AccountCircleIcon /> : <LoginIcon />}
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleLanguage}>{t("menu.language")}</MenuItem>
          <MenuItem onClick={handleLogout}>{t("menu.logout")}</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};
export default MenuBar;
