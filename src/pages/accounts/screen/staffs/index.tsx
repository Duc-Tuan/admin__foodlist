import React from 'react';
import { DefaultLayout } from '../../../../layouts';
import { Button } from '../../../../components';
import Icon from '../../../../assets/icon';

type Props = {};

const ScreenStaff = (props: Props) => {
  const handleSearch = (data: string) => {
    console.log(data);
  };

  const reactNodeRight = [<Button color="primary"><Icon name="v2_save"/> Lưu</Button>];

  return (
    <DefaultLayout
      title="Nhân viên"
      placeholder="Tìm kiếm theo tên, mã, sđt nhân viên..."
      onChange={handleSearch}
      isBack
      reactNodeRight={reactNodeRight}
    >
      <div>ScreenStaff</div>
    </DefaultLayout>
  );
};

export default ScreenStaff;
