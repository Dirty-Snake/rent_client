import React, { FC } from 'react';
import EquipmentsContent from "../../features/equipments/EquipmentsContent/index";
import PageLayout from "../../layouts/PageLayout/index";

const EquipmentsPage: FC = () => {

  return (
    <PageLayout title={'Инвентарь'}>
      <EquipmentsContent />
    </PageLayout>
  );
};

export default EquipmentsPage;
