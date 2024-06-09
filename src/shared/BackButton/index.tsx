import React, { FC, PropsWithChildren } from 'react';

interface Props {
  onPress?: () => {}
}

const BackButton: FC<PropsWithChildren<Props>> = ({
                                                    onPress
                                                  }) => {

  return (
    <div onClick={onPress}>
      Назад
    </div>
  );
};

export default BackButton;
