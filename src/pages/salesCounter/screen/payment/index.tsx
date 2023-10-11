import React from 'react';
import { useSelector } from 'react-redux';
import { tabs as reducerTabs } from '../../store/select';
import { IProduct, ITabs } from '../../const';
import { formatCurrency } from '../../../../utils';

const PaymentSales = () => {
  const tabs = useSelector(reducerTabs);
  const [data, setData] = React.useState<IProduct[]>([]);

  React.useEffect(() => {
    tabs.map((i: ITabs) => {
      if (i?.status) {
        return setData(i?.contentTab);
      }
    });
  }, [JSON.stringify(tabs)]);

  const total: number = React.useMemo(() => {
    const result: number = data?.reduce((total: number, curr: IProduct) => {
      return (total += curr?.price * curr.qty);
    }, 0);
    return result;
  }, [JSON.stringify(data)]);

  return <div>PaymentSales: {formatCurrency(total, ' vnđ')}</div>;
};

export default PaymentSales;
