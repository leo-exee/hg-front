import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LoginIcon from "@mui/icons-material/Login";
import { getUserToken } from "../constants/api.constant";
import favicon from "../assets/favicon.png";
import fr from "../assets/fr.png";
import us from "../assets/us.png";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const MenuBar = () => {
  console.log(getUserToken());
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!getUserToken()) {
      navigate("/authentification");
      return;
    }
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguage = () => {
    i18n.changeLanguage(i18n.language === "en" ? "fr" : "en");
    localStorage.setItem("language", i18n.language);
    handleClose();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    navigate("/authentification");
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
        <Box className="flex items-center space-x-2">
          <Box onClick={handleLanguage} className="cursor-pointer">
            {i18n.language === "en" ? (
              <img src={fr} alt="fr" className="w-6" />
            ) : (
              <img src={us} alt="us" className="w-6" />
            )}
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
            {getUserToken() ? <MenuIcon /> : <LoginIcon />}
          </IconButton>
        </Box>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleLogout}>{t("menu.logout")}</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};
export default MenuBar;
