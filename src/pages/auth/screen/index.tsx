import React from 'react';
import { DefaultLayout } from '../../../layouts';

type Props = {};

const ScreenInfoAccount = (props: Props) => {
  const handleSearch = (data: string) => {
    console.log(data);
  };
  return (
    <DefaultLayout isHeader={false}>
      <div>ScreenInfoAccount</div>
    </DefaultLayout>
  );
};

export default ScreenInfoAccount;
