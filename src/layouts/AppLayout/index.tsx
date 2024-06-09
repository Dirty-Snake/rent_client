import React, { FC } from 'react';
import Header from "../../shared/Header/index";
import { Outlet } from "react-router-dom";
import { useUnit } from "effector-react";
import { $user } from "../../entities/user/model/index";
import SideBarNav from "../../shared/SideBarNav/index";

const AppLayout: FC = () => {

  const [user] = useUnit([$user])

  const isUserExist = user?.accessToken

  return (
    <div
      style={{
        display: "flex",
        height: '100%',
        minHeight: '100vh',
        width: '100%'
      }}
    >
      {
        !isUserExist &&
        <Header />
      }
      {
        isUserExist &&
        <SideBarNav />
      }
      <div style={{marginTop: 120, width: '100%'}}>
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
