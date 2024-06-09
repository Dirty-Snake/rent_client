import React from 'react';
import PageLayout from "../../layouts/PageLayout/index";
import UsersContent from "../../features/users/UsersContent/index";

const UsersPage = () => {

  return (
    <PageLayout title={'Пользователи'}>
      <UsersContent/>
    </PageLayout>
  );
};

export default UsersPage;
