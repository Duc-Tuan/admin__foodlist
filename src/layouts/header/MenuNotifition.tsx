import React from 'react';
import { useTranslation } from 'react-i18next';

type Props = {};

const MenuNotifition = (props: Props) => {
  const { t } = useTranslation();
  return <div className="menu">{t('Thông báo')}</div>;
};

export default MenuNotifition;
