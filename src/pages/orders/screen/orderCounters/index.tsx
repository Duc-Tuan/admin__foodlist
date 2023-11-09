import React from 'react';
import { DefaultLayout } from '../../../../layouts';

type Props = {};

const ScreenOrderCounters = (props: Props) => {
  const handleSearch = (data: string) => {};

  return (
    <DefaultLayout
      title="Đơn hàng bán tại quầy"
      placeholder="Tìm kiếm theo tên, mã đơn hàng..."
      onChange={handleSearch}
    >
      <div>ScreenOrderCounters</div>
    </DefaultLayout>
  );
};

export default ScreenOrderCounters;
