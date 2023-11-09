import React from 'react';
import './index.scss';
import { useTranslation } from 'react-i18next';
import { Button } from '../../../../components';
import Icon from '../../../../assets/icon';
import { DefaultLayout } from '../../../../layouts';

type Props = {};

const Index = (props: Props) => {
  const { t } = useTranslation();
  const handleSearch = (data: string) => {
    
  };

  const reactNodeRight = [
    <Button color="primary">
      <Icon name="plus-circle" /> {t('Thêm mới')}
    </Button>,
  ];

  return (
    <DefaultLayout
      title="Khuyến mãi"
      placeholder="Tìm kiếm theo tên, mã khuyến mãi..."
      onChange={handleSearch}
      isBack
      reactNodeRight={reactNodeRight}
      noBack
    >
      <div>Khuyến mãi</div>
    </DefaultLayout>
  );
};

export default Index;
