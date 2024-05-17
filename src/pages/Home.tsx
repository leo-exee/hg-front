import { useEffect, useState } from "react";
import ButtonAdd from "../components/ButtonAdd";
import Map from "../components/Map";
import { getUserToken } from "../constants/api.constant";
import ButtonInfo from "../components/ButtonInfo";

const Home: React.FC = () => {
  const [token, setToken] = useState<string | null>(getUserToken());
  useEffect(() => {
    setToken(getUserToken());
  }, []);
  return (
    <>
      <Map />
      {token ? <ButtonAdd /> : <ButtonInfo />}
    </>
  );
};

export default Home;
