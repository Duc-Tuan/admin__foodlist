import React from 'react';
import { IProductSales } from '../../const';
import Icon from '../../../../assets/icon';
import Images from '../../../../components/image';
import { WrapTooltip } from '../../../../components/wrapTooltip/WrapTooltip';
import { formatCurrency } from '../../../../utils';
import useDebounce from '../../../../hooks/components/useDebounce';
import { useAppDispatch, useBoolean } from '../../../../hooks';
import { actions as actionsSales } from '../../store';
import MenuSubSales from '../menuSub';
import ApiProducts from '../../../../assets/apis/ApiProducts';
import { Loading, ViewImageProduct } from '../../../../components';
import { IProduct } from '../../../../types/producrts_type';

type Props = {
  data: IProductSales;
};

const Item = (props: Props) => {
  const { data } = props;
  const dispatch = useAppDispatch();
  const [isOpen, { on, off, toggle }] = useBoolean();
  const [qty, setQty] = React.useState<string>(String(data?.qty));

  React.useEffect(() => {
    setQty(String(data?.qty));
  }, [data]);

  const value = useDebounce(qty, 300);

  React.useEffect(() => {
    const dataNew: IProductSales = {
      ...data,
      qty: Number(value),
    };
    dispatch(actionsSales.setUpdateSales({ data: dataNew }));
  }, [value]);

  const handleDelete = () => {
    dispatch(actionsSales.setDeleteSales({ data }));
  };

  return (
    <>
      <div className="item d-flex justify-content-start align-items-center gap-8">
        <div className="d-flex justify-content-start align-items-center gap-8 w-100">
          <div className="icon d-flex justify-content-center align-items-center" onClick={handleDelete}>
            <Icon name="trash" />
          </div>
          <Images url={data?.image} alt="Sản phẩm" className="image" />

          <div className="name d-flex justify-content-between align-items-start gap-6 flex-column">
            <WrapTooltip data={data?.name} length={100} classNameChildren="config-truncate" />

            <div className="d-flex justify-content-start align-items-center gap-8">
              <div className="code">{data?.code}</div>
              <div className="menu__hover" onClick={toggle}>
                Xem chi tiết
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-start align-items-center gap-8 flex-fill">
            <h3 className="qty flex-fill">
              <input
                type="number"
                value={qty}
                onChange={(e) => setQty(String(Math.abs(Number(e?.target?.value))))}
                min={1}
              />
            </h3>
            <h3 className="price flex-fill">{formatCurrency(data?.price, '')}</h3>
            <h3 className="money flex-fill">{formatCurrency(data?.price * Number(qty), '')}</h3>
          </div>
        </div>
      </div>
      <MenuSubSales isOpen={isOpen} hidden={off} title="Bộ lọc" isFooter={false} isHeader={false} w60="w-60">
        <DataDetail id={isOpen ? data?.id : undefined} />
      </MenuSubSales>
    </>
  );
};

interface IDataProp {
  id?: string | number;
}

const DataDetail = (props: IDataProp) => {
  const { id } = props;
  const [data, setData] = React.useState<IProduct>();
  const [loading, setLoading] = React.useState<any>();

  const getDetail = async () => {
    try {
      setLoading(true);
      const res = await ApiProducts.getDetailProduct(id);
      setData(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    id && getDetail();
  }, [id]);

  return (
    <div className="wrapper__detailProduct">
      {loading ? (
        <Loading />
      ) : (
        <div className="d-flex justify-start align-items-center gap-10">
          <div className="detailProduct__images">
            <ViewImageProduct
              url={data?.productImage}
              alt="Sản phẩm"
              dataUrl={data && [data?.productImage, data?.productImage, data?.productImage, data?.productImage]}
            />
          </div>
          <div className="detailProduct__info">sdfs</div>
        </div>
      )}
    </div>
  );
};

export default Item;
