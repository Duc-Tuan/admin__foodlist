import React from 'react';
import './index.scss';
import Icon from '../../../../assets/icon';
import { useTranslation } from 'react-i18next';
import { useClickOutSide } from '../../../../hooks';
import { Button } from '../../../../components';

type Props = {
  isOpen: boolean;
  hidden: () => void;
  title: string;
  children: React.ReactNode;
  isFooter?: boolean;
  isHeader?: boolean;
  w60?: 'w-60';
};

const MenuSubSales = (props: Props) => {
  const { isOpen, hidden, title, children, isFooter = true, isHeader = true, w60 } = props;
  const { t } = useTranslation();
  return (
    <div className={`wrapper__menuSub ${isOpen ? 'active' : ''} ${w60}`}>
      {isHeader && (
        <div className="header__menuSub d-flex justify-content-between align-items-center gap-10">
          <h2>{t(title)}</h2>
          <div className="icon" onClick={hidden}>
            <Icon name="times-circle" />
          </div>
        </div>
      )}

      <div className="main__menuSub mt-10 d-flex justify-content-between align-items-start flex-column gap-10">
        <div className="main" style={{ height: isFooter ? 'calc(100% - 52px)' : '100%' }}>
          {children}
        </div>
        {isFooter && (
          <footer className="d-flex justify-content-between align-items-center gap-10">
            <Button color="grey" className="flex-fill">
              {t('Thiết lập lại')}
            </Button>
            <Button color="primary" className="flex-fill">
              {t('Lọc ngay')}
            </Button>
          </footer>
        )}
      </div>

      <div className={`purdah ${isOpen ? 'active' : ''} ${w60}`} onClick={hidden}></div>
    </div>
  );
};

export default MenuSubSales;
