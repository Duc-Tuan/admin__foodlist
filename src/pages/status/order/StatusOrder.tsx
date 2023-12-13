import { DefaultLayout } from 'layouts';
import React from 'react';

type Props = {};

const StatusOrder = (props: Props) => {
  return (
    <DefaultLayout title="Trạng thái đơn hàng" isSearch>
      <div>StatusUser</div>
    </DefaultLayout>
  );
};

export default StatusOrder;
