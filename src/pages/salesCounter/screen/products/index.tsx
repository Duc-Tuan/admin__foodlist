import React from 'react';
import { Loading } from '../../../../components';
import './index.scss';
import { IPaganition } from '../../../../types/general';
import { IProducts } from './const';
import ApiProducts from '../../../../assets/apis/ApiProducts';
import { WrapTooltip } from '../../../../components/wrapTooltip/WrapTooltip';
import { formatCurrency } from '../../../../utils';

type Props = {};

const ProductsSales = (props: Props) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [data, setData] = React.useState<IProducts[]>([]);
  const [paganition, setPaganition] = React.useState<IPaganition>({
    page: 1,
    pageSize: 8,
    currentPage: 1,
    totalElement: 0,
    totalPage: 1,
  });

  const getData = async () => {
    try {
      setLoading(true);
      const res = await ApiProducts.getProducts(paganition?.page, paganition?.pageSize);
      const { data, paganition: pa } = res;
      setPaganition((prev) => ({
        ...prev,
        currentPage: pa?.currentPage,
        totalElement: pa?.totalElement,
        totalPage: pa?.totalPage,
      }));
      setData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getData();
  }, [JSON.stringify(paganition)]);

  return (
    <div className="wrapper__productsSales">
      <div className="wrapper__productsSales--header"></div>
      <div className="wrapper__productsSales--main">
        {loading ? (
          <Loading />
        ) : (
          <div className="list-drug">
            {data?.map((i: IProducts, idx: number) => (
              <div className="product__item d-flex justify-content-start align-items-start gap-10" key={idx}>
                <img src={i?.productImage} alt="Sản phẩm" />
                <div className="info flex-fill">
                  <div className="name trunc-one-line">{i?.productName}</div>
                  <div className="d-flex justify-content-between align-items-center gap-10">
                    <span className="price">{formatCurrency(i?.productPrice)}</span>
                    <span className="price">{i?.productQty}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsSales;
