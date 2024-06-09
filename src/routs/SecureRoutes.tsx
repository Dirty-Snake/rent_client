import React, { FC } from 'react';
import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "../layouts/AppLayout/index";
import EquipmentsPage from "../pages/equipments/EquipmentsPage";
import TagsPage from "../pages/tags/TagsPage";
import CategoriesPage from "../pages/categories/CategoriesPage";
import UsersPage from "../pages/users/UsersPage";
import HistoryPage from "../pages/history/HistoryPage";

const SecureRoutes: FC = () => {

  return (
    <Routes>
      <Route path="/" element={<Navigate to={'/equipments'} />} />

      <Route path={"/"} element={<AppLayout />}>
        <Route path="equipments" element={<EquipmentsPage />} />
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="tags" element={<TagsPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="history" element={<HistoryPage />} />
      </Route>

      <Route path="*" element={<Navigate to={'/equipments'} />} />
    </Routes>
  );
};

export default SecureRoutes;
