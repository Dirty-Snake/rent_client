import React from 'react';
import PageLayout from "../../layouts/PageLayout/index";
import LocationContent from "../../features/location/LocationContent/index";

const LocationPage = () => {
  return (
    <PageLayout title={'Методы анализа'}>
      <LocationContent />
    </PageLayout>
  );
};

export default LocationPage;
