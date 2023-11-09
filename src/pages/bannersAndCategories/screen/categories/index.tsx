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
      <Icon name="v2_save" /> {t('Thêm mới')}
    </Button>,
  ];

  return (
    <DefaultLayout
      title="Thể loại"
      placeholder="Tìm kiếm theo tên, mã thể loại..."
      onChange={handleSearch}
      isBack
      reactNodeRight={reactNodeRight}
    >
      <div>Thể loại</div>
    </DefaultLayout>
  );
};

export default Index;
