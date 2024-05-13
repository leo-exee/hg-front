import ButtonAdd from '../components/ButtonAdd';
import Map from '../components/Map';

const Home: React.FC = () => {
  //const { t } = useTranslation();
  return (
    <div>
      <Map />
      <ButtonAdd />
    </div>
  );
};

export default Home;
