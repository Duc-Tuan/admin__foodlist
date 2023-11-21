import React from 'react';
import { DefaultLayout } from '../../../../layouts';
import './index.scss';
import { useNavigate } from 'react-router-dom';
import { PATHNAME } from '../../../../configs/pathname';
import { useTranslation } from 'react-i18next';

type Props = {};

const ScreenInfoStore = (props: Props) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <DefaultLayout
      title="Thiết lập thông tin cửa hàng"
      isSearch
      isBack
      onClickBack={() => navigate(PATHNAME.SCREENSETTINGS)}
    >
      <div className="wrapper__settingStore compont d-flex justify-content-start align-items-center">
        <div className="describe p-10">
          <div className="title">{t('Thông tin cửa hàng')}</div>
          <div className="sub">{t('Quản lý thông tin liên hệ và địa chỉ của cửa hàng')}</div>
        </div>
        <div className="detail p-10">Thông tin chi tiết</div>
      </div>
    </DefaultLayout>
  );
};

export default ScreenInfoStore;
