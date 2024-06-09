import React, { FC, PropsWithChildren } from 'react';

const MaxWithLayout: FC<PropsWithChildren<any>> = ({
                                                     children,
                                                     paddingTop = 10,
                                                     paddingBottom = 0
                                                   }) => {

  return (
    <div
      style={{
        margin: '0 auto',
        padding: '0 20px',
        width: '100%',
        maxWidth: 1420,
        paddingTop: paddingTop,
        paddingBottom: paddingBottom,
        position: "relative",
      }}
    >
      {children}
    </div>
  );
};

export default MaxWithLayout;
