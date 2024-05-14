import ButtonAdd from "../components/ButtonAdd";
import Map from "../components/Map";
import { getUserToken } from "../constants/api.constant";

const Home: React.FC = () => {
  //const { t } = useTranslation();
  return (
    <>
      <Map />
      {getUserToken() && <ButtonAdd />}
    </>
  );
};

export default Home;
