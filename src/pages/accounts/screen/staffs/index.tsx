import React from 'react';
import { DefaultLayout } from '../../../../layouts';

type Props = {};

const ScreenStaff = (props: Props) => {
  const handleSearch = (data: string) => {
    console.log(data);
  };
  return (
    <DefaultLayout title="Nhân viên" placeholder="Tìm kiếm theo tên, mã, sđt nhân viên..." onChange={handleSearch}>
      <div>ScreenStaff</div>
    </DefaultLayout>
  );
};

export default ScreenStaff;
