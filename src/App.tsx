import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "mapbox-gl/dist/mapbox-gl.css";
import { useTranslation } from "react-i18next";
import "./translations/i18n";
import Layout from "./Layout";
import Home from "./pages/Home";
import NoMatch from "./pages/NoMatch";
import Add from "./pages/Add";
import Authentification from "./pages/Authentification";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";

function App() {
  const { i18n } = useTranslation();
  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  const theme = createTheme({
    typography: {
      fontFamily: "quicksand",
    },
    palette: {
      primary: {
        main: "#125C73",
      },
      secondary: {
        main: "#308eab",
      },
      info: {
        main: "#eee",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index path="/" element={<Home />} />
            <Route path="/add" element={<Add />} />
            <Route path="/authentification" element={<Authentification />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
