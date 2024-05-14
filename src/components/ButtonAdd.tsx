import { Add } from "@mui/icons-material";
import { Fab } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ButtonAdd: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/add");
  };
  return (
    <div className="absolute bottom-4 right-4">
      <Fab color="primary" aria-label="add" size="large" onClick={handleClick}>
        <Add />
      </Fab>
    </div>
  );
};

export default ButtonAdd;
