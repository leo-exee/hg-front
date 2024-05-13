import { Add } from "@mui/icons-material";
import { Fab } from "@mui/material";

const ButtonAdd: React.FC = () => {
  return (
    <div className="absolute bottom-4 right-4">
      <Fab color="primary" aria-label="add" size="large">
        <Add />
      </Fab>
    </div>
  );
};

export default ButtonAdd;
