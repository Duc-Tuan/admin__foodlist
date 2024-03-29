import React from 'react';
import { DefaultLayout } from '../../../../layouts';
import { Button } from '../../../../components';
import Icon from '../../../../assets/icon';
import { useTranslation } from 'react-i18next';

type Props = {};

const ScreenStaff = (props: Props) => {
  const { t } = useTranslation();
  const handleSearch = (data: string) => {
    
  };

  const reactNodeRight = [
    <Button color="primary">
      <Icon name="v2_save" /> {t('Lưu')}
    </Button>,
  ];

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
