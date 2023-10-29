import React from 'react';
import { useSelector } from 'react-redux';
import { tabs as reducerTabs } from '../../store/select';
import { IProductSales, ITabs } from '../../const';
import { formatCurrency } from '../../../../utils';
import './index.scss';
import { Button, Loading, Selector } from '../../../../components';
import { useTranslation } from 'react-i18next';
import { dataOptionPayments } from './const';
import { useToast } from '../../../../hooks';
import useDebounce from '../../../../hooks/components/useDebounce';

const PaymentSales = () => {
  const { t } = useTranslation();
  const toast = useToast();
  const tabs = useSelector(reducerTabs);
  const [data, setData] = React.useState<IProductSales[]>([]);
  const [shipping, setShipping] = React.useState<string>('0');

  React.useEffect(() => {
    tabs.map((i: ITabs) => {
      if (i?.status) {
        return setData(i?.contentTab);
      }
    });
  }, [JSON.stringify(tabs)]);

  const debounceShipping = useDebounce(shipping, 300);

  const total: number = React.useMemo(() => {
    const result: number = data?.reduce((total: number, curr: IProductSales) => {
      const pricePrommtotion = curr?.prommotion ? curr?.price * ((100 - curr?.prommotion) / 100) : curr?.price;
      return (total += pricePrommtotion * curr.qty);
    }, 0);
    return result;
  }, [JSON.stringify(data)]);

  const handlePayment = () => {
    data?.length === 0 && toast('Đơn hàng trống không thể thực hiện thao tác này.', 'error');
  };

  return (
    <div className="wrapper__payments d-flex justify-content-between align-items-start flex-column gap-10">
      {/* {data?.length === 0 ? <Loading /> : <>PaymentSales: {formatCurrency(total, ' vnđ')}</>}{' '} */}
      <div className="info w-100  d-flex justify-content-between align-items-start flex-column gap-10">
        <div className="w-100">
          <div className="group d-flex justify-content-between align-items-center gap-10 mt-10">
            <div className="value">
              {t('Tổng tiền hàng')} ( {data?.length} {t('sản phẩm')} )
            </div>
            <div className="label actice">{formatCurrency(total, '')}</div>
          </div>
          <div className="group d-flex justify-content-between align-items-center gap-10 mt-10">
            <div className="value">{t('Phí vận chuyển')}</div>
            <div className="label">
              <input
                type="number"
                value={shipping}
                onChange={(e) => setShipping(String(Math.abs(Number(e?.target?.value))))}
                min={1}
              />
            </div>
          </div>

          <div className="mt-20">
            <h4>{t('Hình thức thanh toán')}</h4>
            <div className="group d-flex justify-content-between align-items-center gap-10 mt-10">
              <div className="value">
                <Selector options={dataOptionPayments} placeholder={String(dataOptionPayments[0]?.label)} />
              </div>
              <div className="label actice">{formatCurrency(total + Number(debounceShipping), '')}</div>
            </div>
          </div>
        </div>

        <div className="group d-flex justify-content-between align-items-center gap-10 w-100">
          <div className="value actice">{t('Thành tiền')}</div>
          <div className="label actice">{formatCurrency(total + Number(debounceShipping), '')}</div>
        </div>
      </div>
      <footer className="w-100">
        <div className="note w-100">
          <textarea name="note" className="scroll__fodo w-100" placeholder="Ghi chú" />
        </div>
        <Button
          color={data?.length === 0 ? 'destroy' : 'primary'}
          className={`button_payment ${data?.length === 0 ? '' : 'active'}`}
          onClick={() => data?.length !== 0 && handlePayment()}
        >
          Thanh toán
        </Button>
      </footer>
    </div>
  );
};

export default PaymentSales;
