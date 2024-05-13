import { AppBar, IconButton, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const MenuBar = () => {
  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <IconButton>
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
export default MenuBar;
