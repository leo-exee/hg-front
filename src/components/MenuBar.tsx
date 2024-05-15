import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  Paper,
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
import SyncIcon from "@mui/icons-material/Sync";

const MenuBar = () => {
  console.log(getUserToken());
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [modalOpen, setModalOpen] = useState(false);
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
    setModalOpen(false);
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
        <Box className="flex items-center">
          <Box
            onClick={handleLanguage}
            className="cursor-pointer flex items-center"
          >
            {i18n.language === "en" ? (
              <>
                <img src={fr} alt="fr" className="w-6" />
                <SyncIcon className="transform rotate-90 ml-1" />
              </>
            ) : (
              <>
                <img src={us} alt="us" className="w-6" />
                <SyncIcon className="transform rotate-90 ml-1" />
              </>
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
          <MenuItem
            onClick={() => {
              handleClose();
              setModalOpen(true);
            }}
          >
            {t("menu.logout")}
          </MenuItem>
        </Menu>
      </Toolbar>
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        className="flex justify-center items-center w-full h-full"
      >
        <Paper className="bg-white p-4 w-80 h-min">
          <Typography variant="h6">{t("menu.logout")}</Typography>
          <Typography>{t("menu.logout-confirm")}</Typography>
          <Box className="flex justify-end space-x-4 mt-4">
            <Button variant="outlined" onClick={() => setModalOpen(false)}>
              {t("cancel")}
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                handleLogout();
              }}
            >
              {t("confirm")}
            </Button>
          </Box>
        </Paper>
      </Modal>
    </AppBar>
  );
};
export default MenuBar;
