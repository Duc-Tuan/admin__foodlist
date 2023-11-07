import React from 'react';
import { DefaultLayout } from '../../../../layouts';
import { Button } from '../../../../components';
import Icon from '../../../../assets/icon';
import { useNavigate } from 'react-router-dom';
import { PATHNAME } from '../../../../configs/pathname';
import { useTranslation } from 'react-i18next';

type Props = {};

const ScreenRoles = (props: Props) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleSearch = (data: string) => {
    console.log(data);
  };

  const reactNodeRight = [
    <Button color="primary" onClick={() => navigate(PATHNAME.SCREENDCREATEROLE)}>
      <Icon name="plus-circle" /> {t('Thêm mới vai trò')}
    </Button>,
  ];

  return (
    <DefaultLayout
      title="Vai trò"
      placeholder="Tìm kiếm theo tên, mã vai trò..."
      onChange={handleSearch}
      isBack
      reactNodeRight={reactNodeRight}
      noBack
    >
      <div>ScreenRoles</div>
    </DefaultLayout>
  );
};

export default ScreenRoles;
