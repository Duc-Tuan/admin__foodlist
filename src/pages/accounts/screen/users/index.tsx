import React from 'react';
import { DefaultLayout } from '../../../../layouts';

type Props = {};

const ScreenUsers = (props: Props) => {
  const handleSearch = (data: string) => {
    console.log(data);
  };
  return (
    <DefaultLayout title="Khách hàng" placeholder="Tìm kiếm theo tên, mã, sđt khách hàng..." onChange={handleSearch}>
      <div>ScreenUsers</div>
    </DefaultLayout>
  );
};

export default ScreenUsers;
