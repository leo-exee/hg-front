import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import "mapbox-gl/dist/mapbox-gl.css";

//import { useTranslation } from 'react-i18next';
// import "./i18n";
import Layout from "./Layout";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Dashboard from "./pages/Dashboard";
import NoMatch from "./pages/NoMatch";
import Add from "./pages/Add";
import { getUserToken } from "./constants/api.constant";
import Authentification from "./pages/Authentification";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";

function App() {
  const [token, setToken] = React.useState<string | null>(getUserToken());
  useEffect(() => {
    setToken(getUserToken());
  }, []);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#125C73",
      },
      secondary: {
        main: "#308eab",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/map/:id" element={<Detail />} />
            <Route
              path="/dashboard"
              element={token ? <Dashboard /> : <Authentification />}
            />
            <Route
              path="/add"
              element={token ? <Add /> : <Authentification />}
            />
            <Route
              path="/authentification"
              element={token ? <Dashboard /> : <Authentification />}
            />
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
