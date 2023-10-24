import React from 'react';
import { DefaultLayout } from '../../../../layouts';

type Props = {};

const ScreenOrderUsers = (props: Props) => {
  const handleSearch = (data: string) => {
    console.log(data);
  };
  return (
    <DefaultLayout title="Đơn hàng bán online" placeholder="Tìm kiếm theo tên, mã đơn hàng..." onChange={handleSearch}>
      <div>ScreenOrderUsers</div>
    </DefaultLayout>
  );
};

export default ScreenOrderUsers;
