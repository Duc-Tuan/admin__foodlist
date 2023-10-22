import React from 'react';
import './index.scss';
import { useTranslation } from 'react-i18next';
import NoOrder from '../../assets/images/no_order.png';
import Images from '../image';

type Props = {
  text?: string;
  isImage?: boolean;
};

const NoData = (props: Props) => {
  const { t } = useTranslation();
  const { text, isImage } = props;
  return (
    <div className="wrapprt__noData d-flex justify-content-center align-items-center flex-column gap-10">
      {!isImage && <Images alt="" url={NoOrder} className="image" />}
      <div className="text">{t(text ?? 'Đơn hàng hiện chưa có sản phẩm nào.')}</div>
    </div>
  );
};

export default NoData;
