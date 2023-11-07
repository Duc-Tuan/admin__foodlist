import React from 'react';
import { useTranslation } from 'react-i18next';
import { Option } from '../../types/general';

import './notification.scss';
import Icon from '../../assets/icon';
import { Button } from '../../components';

type Props = {};

const dataNotificationTitle: Option[] = [
  {
    value: 1,
    label: 'Tất cả',
  },
  {
    value: 2,
    label: 'Đơn hàng',
  },
  {
    value: 3,
    label: 'Sản phẩm',
  },
];

const dataNotification: Option[] = [
  {
    value: 1,
    label: 'Chưa đọc',
  },
  {
    value: 2,
    label: 'Đã đọc',
  },
];

const MenuNotifition = (props: Props) => {
  const { t } = useTranslation();
  const [selected, setSelected] = React.useState<Option>(dataNotification[0]);
  const [selectedTitle, setSelectedTitle] = React.useState<Option>(dataNotificationTitle[0]);
  return (
    <div className="menu wrapper__notification d-flex justify-content-start align-items-start flex-column">
      <div className="header__notifi d-flex justify-content-between align-items-center gap-10 w-100">
        <div className="title">{t('Thông báo')}</div>
        <div className="document__all d-flex justify-content-end align-items-center gap-6">
          <Icon name="checked" />
          <div className="">{t('Đã đọc tất cả')}</div>
        </div>
      </div>

      <div className="main__notifi d-flex justify-content-between align-items-start gap-10 flex-column w-100 flex-fill">
        <div className="main__notifi--content w-100 d-flex justify-content-start align-items-start gap-10 flex-column flex-fill">
          <div className="d-flex justify-content-start align-items-center w-100">
            {dataNotificationTitle?.map((i: Option, idx: number) => (
              <div
                className={`main__notifi--item ${
                  selectedTitle?.value === i?.value ? 'active' : ''
                } d-flex justify-content-start align-items-center gap-4`}
                key={idx}
                onClick={() => setSelectedTitle(i)}
              >
                {t(String(i?.label))}
                <div className="sub__title">(09)</div>
              </div>
            ))}
          </div>
          <div className="d-flex justify-content-start align-items-center gap-10">
            {dataNotification?.map((i: Option, idx: number) => (
              <Button
                key={idx}
                color={selected?.value === i?.value ? 'primary' : 'primaryOpacity'}
                onClick={() => setSelected(i)}
                className="button__sub"
              >
                {t(String(i?.label))}
              </Button>
            ))}
          </div>
          <div className="main__notifi--children scroll__foodApp flex-fill d-flex justify-content-center align-items-center w-100">
            {t('Chưa có dữ liệu')}
          </div>
        </div>
        <Button color="primary" className="w-100">
          {t('Xem tất cả')}
        </Button>
      </div>
    </div>
  );
};

export default MenuNotifition;
