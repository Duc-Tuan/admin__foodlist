import React from 'react';
import { useSelector } from 'react-redux';
import { tabs as reducerTabs } from '../../store/select';
import { IProductSales, ITabs } from '../../const';
import { formatCurrency } from '../../../../utils';
import './index.scss';
import { Loading } from '../../../../components';

const PaymentSales = () => {
  const tabs = useSelector(reducerTabs);
  const [data, setData] = React.useState<IProductSales[]>([]);

  React.useEffect(() => {
    tabs.map((i: ITabs) => {
      if (i?.status) {
        return setData(i?.contentTab);
      }
    });
  }, [JSON.stringify(tabs)]);

  const total: number = React.useMemo(() => {
    const result: number = data?.reduce((total: number, curr: IProductSales) => {
      return (total += curr?.price * curr.qty);
    }, 0);
    return result;
  }, [JSON.stringify(data)]);

  return (
    <div className="wrapper__payments">
      {data?.length === 0 ? <Loading /> : <>PaymentSales: {formatCurrency(total, ' vnđ')}</>}{' '}
    </div>
  );
};

export default PaymentSales;
