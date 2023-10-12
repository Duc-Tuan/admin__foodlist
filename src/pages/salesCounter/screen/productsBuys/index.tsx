import React from 'react';
import { useSelector } from 'react-redux';
import { tabs as reducerTabs } from '../../store/select';
import { IProduct, ITabs } from '../../const';
import './index.scss';
import { Loading } from '../../../../components';

const ProductsBuysSales = () => {
  const tabs = useSelector(reducerTabs);
  const [data, setData] = React.useState<IProduct[]>([]);

  React.useEffect(() => {
    tabs.map((i: ITabs) => {
      if (i?.status) {
        return setData(i?.contentTab);
      }
    });
  }, [JSON.stringify(tabs)]);

  return (
    <div className="wrapper__productsBuy">
      {data?.length === 0 && <Loading />}
      {data?.map((i: IProduct, idx: number) => (
        <div className="item" key={idx}>
          {i?.name}
        </div>
      ))}
    </div>
  );
};

export default ProductsBuysSales;
