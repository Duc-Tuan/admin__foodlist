import React from 'react';
import { DefaultLayout } from '../../../../layouts';

type Props = {};

const ScreenDecentralization = (props: Props) => {
  const handleSearch = (data: string) => {
    
  };
  return (
    <DefaultLayout
      title="Phân quyền nhân viên"
      placeholder="Tìm kiếm theo tên, mã nhân viên..."
      onChange={handleSearch}
    >
      <div>ScreenDecentralization</div>
    </DefaultLayout>
  );
};

export default ScreenDecentralization;
