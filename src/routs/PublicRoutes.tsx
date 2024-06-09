import React, { FC } from 'react';
import {Routes, Route, Navigate} from "react-router-dom";
import LoginPage from "../pages/login/LoginPage";
import AppLayout from "../layouts/AppLayout/index";

const PublicRoutes: FC  = () => {

  return (
    <Routes>
      <Route path={"/"} element={<AppLayout />}>
        <Route path="" element={<LoginPage/>}/>
        <Route path="*" element={<Navigate to={"/"}/>}/>
      </Route>
      <Route path="*" element={<Navigate to={"/"}/>}/>
    </Routes>
  );
};

export default PublicRoutes;
