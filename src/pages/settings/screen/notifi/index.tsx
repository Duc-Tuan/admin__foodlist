import React from 'react';
import { DefaultLayout } from '../../../../layouts';
import './index.scss';
import { useNavigate } from 'react-router-dom';
import { PATHNAME } from '../../../../configs/pathname';
import { useTranslation } from 'react-i18next';

type Props = {};

const ScreenNotifi = (props: Props) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <DefaultLayout
      title="Thiết lập thông báo hệ thống"
      isSearch
      isBack
      onClickBack={() => navigate(PATHNAME.SCREENSETTINGS)}
    >
      <div className="wrapper__settingNotifi compont mt-2 d-flex justify-content-start align-items-center">
        <div className="describe p-10">
          <div className="title">{t('Thông báo')}</div>
          <div className="sub">{t('Thiết lập chức năng thông báo của hệ thống')}</div>
        </div>
        <div className="detail p-10">Thông tin chi tiết</div>
      </div>
    </DefaultLayout>
  );
};

export default ScreenNotifi;
