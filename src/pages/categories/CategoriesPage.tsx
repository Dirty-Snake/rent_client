import React from 'react';
import BrendsContent from "../../features/categories/CategoriesContent/index";
import PageLayout from "../../layouts/PageLayout/index";

const CategoriesPage = () => {
  return (
    <PageLayout title={'Категории'}>
      <BrendsContent />
    </PageLayout>
  );
};

export default CategoriesPage;
