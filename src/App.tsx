import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//import { useTranslation } from 'react-i18next';
// import "./i18n";
import Layout from "./Layout";
import Map from "./pages/Map";
import Detail from "./pages/Detail";
import Dashboard from "./pages/Dashboard";
import NoMatch from "./pages/NoMatch";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Map />} />
          <Route path="/map/:id" element={<Detail />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
