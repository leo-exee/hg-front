import { Outlet } from "react-router-dom";
import MenuBar from "./components/MenuBar";
import { Providers } from "./Providers";

const Layout: React.FC = () => {
  return (
    <Providers>
      <MenuBar />
      <Outlet />
    </Providers>
  );
};

export default Layout;
