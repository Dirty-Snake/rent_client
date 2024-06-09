import React from 'react';
import PageLayout from "../../layouts/PageLayout/index";
import TagsContent from "../../features/tags/TagsContent/index";

const TagsPage = () => {
  return (
    <PageLayout title={'Теги'}>
      <TagsContent />
    </PageLayout>
  );
};

export default TagsPage;
