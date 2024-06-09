import React, { FC } from 'react';
import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "../layouts/AppLayout/index";
import EquipmentsPage from "../pages/equipments/EquipmentsPage";
import LocationPage from "../pages/location/LocationPage";
import BrendsPage from "../pages/brends/BrendsPage";

const SecureRoutes: FC = () => {

  return (
    <Routes>
      <Route path="/" element={<Navigate to={'/equipments'} />} />

      <Route path={"/"} element={<AppLayout />}>
        <Route path="equipments" element={<EquipmentsPage />} />
        <Route path="categories" element={<BrendsPage />} />
        <Route path="tags" element={<LocationPage />} />
        <Route path="users" element={<LocationPage />} />
        <Route path="history" element={<LocationPage />} />

      </Route>

      <Route path="*" element={<Navigate to={'/equipments'} />} />
    </Routes>
  );
};

export default SecureRoutes;
