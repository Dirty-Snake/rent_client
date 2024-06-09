import React, { FC } from 'react';
import Header from "../../shared/Header/index";
import MaxWithLayout from "../MaxWithLayout/index";
import IntrinsicAttributes = React.JSX.IntrinsicAttributes;

const PageLayout: FC<{children: IntrinsicAttributes, title: string}> = ({ children, title }) => {
  return (
    <>
      <Header title={title}/>
      <MaxWithLayout>
        {children}
      </MaxWithLayout>
    </>
  );
};

export default PageLayout;
