import React from 'react';
import { useSelector } from 'react-redux';
import { tabs as reducerTabs } from '../../store/select';
import { IProductSales, ITabs } from '../../const';
import './index.scss';
import { NoData } from '../../../../components';
import Images from '../../../../components/image';
import Icon from '../../../../assets/icon';
import { useAppDispatch } from '../../../../hooks';
import { actions as actionsSales } from '../../store';
import { useTranslation } from 'react-i18next';
import Item from './Item';

const ProductsBuysSales = () => {
  const { t } = useTranslation();
  const tabs = useSelector(reducerTabs);
  const dispatch = useAppDispatch();
  const [data, setData] = React.useState<IProductSales[]>([]);

  React.useEffect(() => {
    tabs.map((i: ITabs) => {
      if (i?.status) {
        return setData(i?.contentTab);
      }
    });
  }, [JSON.stringify(tabs)]);

  return (
    <div className="wrapper__productsBuy">
      {data?.length === 0 ? (
        <NoData />
      ) : (
        <div className="d-flex justify-content-start align-items-start flex-column gap-10">
          <div className="header__productsBuy d-flex justify-content-start align-items-center gap-10">
            <h3 className="image">{t('Ảnh')}</h3>
            <h3 className="name">{t('Tên sản phẩm')}</h3>
            <div className="d-flex justify-content-start align-items-center gap-8 flex-fill">
              <h3 className="qty flex-fill">{t('Số lượng')}</h3>
              <h3 className="price flex-fill">{t('Đơn giá')}</h3>
              <h3 className="money flex-fill">{t('Thành tiền')}</h3>
            </div>
          </div>
          {data?.map((i: IProductSales, idx: number) => <Item data={i} key={idx} />)}
        </div>
      )}
    </div>
  );
};

export default ProductsBuysSales;
