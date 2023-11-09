import React from 'react';
import './index.scss';
import { Button } from '../../../../components';
import Icon from '../../../../assets/icon';
import { useTranslation } from 'react-i18next';
import { DefaultLayout } from '../../../../layouts';

const Index = () => {
  const { t } = useTranslation();
  const handleSearch = (data: string) => {
    
  };

  const reactNodeRight = [
    <Button color="primary">
      <Icon name="v2_save" /> {t('Thêm mới')}
    </Button>,
  ];

  return (
    <DefaultLayout
      title="Quảng cáo"
      placeholder="Tìm kiếm theo tên, mã quảng cáo..."
      onChange={handleSearch}
      isBack
      reactNodeRight={reactNodeRight}
    >
      <div>Quảng cáo</div>
    </DefaultLayout>
  );
};

export default Index;
