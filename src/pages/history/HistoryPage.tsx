import React from 'react';
import PageLayout from "../../layouts/PageLayout/index";
import HistoryContent from "../../features/history/HistoryContent/index";

const HistoryPage = () => {

  return (
    <PageLayout title={'История'}>
      <HistoryContent/>
    </PageLayout>
  );
};

export default HistoryPage;
