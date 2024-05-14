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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/map/:id" element={<Detail />} />
          <Route
            path="/dashboard"
            element={getUserToken() ? <Dashboard /> : <Authentification />}
          />
          <Route
            path="dashboard/add"
            element={
              getUserToken() ? (
                <Add />
              ) : (
                <Authentification redirection="/dashboard/add" />
              )
            }
          />
          <Route path="/authentification" element={<Authentification />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
