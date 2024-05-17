import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Fab } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ButtonInfo: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/info");
  };
  return (
    <div className="absolute bottom-4 right-4">
      <Fab color="primary" aria-label="info" size="large" onClick={handleClick}>
        <InfoOutlinedIcon />
      </Fab>
    </div>
  );
};

export default ButtonInfo;
