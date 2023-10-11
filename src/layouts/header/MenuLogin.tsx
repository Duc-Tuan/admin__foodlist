import React from 'react';
import Icon from '../../assets/icon';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { PATHNAME } from '../../configs/pathname';

const MenuLogin = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className="menu d-flex justify-content-center align-items-start flex-column ">
      <div
        className="menu__info d-flex justify-content-start align-items-center gap-10"
        onClick={() => navigate(PATHNAME.SCREENINFOUSER)}
      >
        <img src="https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014_1280.jpg" alt="user name" />
        <h3 className="config-truncate-one">Phạm Đức Tuấn</h3>
      </div>

      <div
        className="menu__logout d-flex justify-content-start align-items-center gap-10"
        onClick={() => navigate(PATHNAME.SCREENLOGIN)}
      >
        <div className="icon">
          <Icon name="icon-logout" />
        </div>
        <h3>{t('Đăng xuất')}</h3>
      </div>
    </div>
  );
};

export default MenuLogin;
