import React from 'react';
import { DefaultLayout } from '../../../../../layouts';
import { Button } from '../../../../../components';
import Icon from '../../../../../assets/icon';
import { useNavigate } from 'react-router-dom';
import { PATHNAME } from '../../../../../configs/pathname';
import './index.scss';
import { useTranslation } from 'react-i18next';

type Props = {};

const ScreenCreateRole = (props: Props) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const reactNodeRight = [
    <Button color="primary">
      <Icon name="document" /> {t('Lưu')}
    </Button>,
  ];
  return (
    <DefaultLayout
      title="Thêm mới vai trò"
      isBack
      isSearch
      reactNodeRight={reactNodeRight}
      onClickBack={() => navigate(PATHNAME.SCREENROLE)}
    >
      <div className="wrapper__createRoles mt-2">ScreenCreateRole</div>
    </DefaultLayout>
  );
};

export default ScreenCreateRole;
