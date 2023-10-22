import React from 'react';
import { useSelector } from 'react-redux';
import Images from '../../../../components/image';
import { WrapTooltip } from '../../../../components/wrapTooltip/WrapTooltip';
import { useAppDispatch } from '../../../../hooks';
import { tabs as reducerTabs } from '../../store/select';
import { handlerAddProductSales } from '../components/handlerAddProductSales';
import { IProducts } from '../products/const';
import { Loading, NoData } from '../../../../components';

type Props = {
  data: IProducts[];
  isLoading?: boolean;
};

const ResultSearch = (props: Props) => {
  const { data, isLoading } = props;
  const [dataShow, setDataShow] = React.useState<IProducts[]>([]);
  const tabs = useSelector(reducerTabs);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    setDataShow(data);
  }, [data]);

  const handleProduct = (data: IProducts) => {
    handlerAddProductSales(dispatch, tabs, data);
  };

  return (
    <div className="menu scroll__foodApp">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {dataShow?.length === 0 ? (
            <NoData text="Không tìm thấy sản phẩm nào." isImage />
          ) : (
            <div className="menu__searchSales d-flex justify-content-start align-items-start flex-column">
              {dataShow?.map((i: IProducts, idx: number) => (
                <Item data={i} onClick={handleProduct} clasName="item" key={idx} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

interface IProps {
  data: IProducts;
  onClick: (data: IProducts) => void;
  clasName?: string;
}

const Item = React.memo((props: IProps) => {
  const { data, onClick, clasName } = props;
  return (
    <div
      onClick={() => onClick(data)}
      className={`${clasName} d-flex justify-content-start align-items-center gap-8 w-100`}
    >
      <Images url={data?.productImage} alt="Sản phẩm" className="image" />
      <div className="info  d-flex justify-content-start align-items-start flex-column gap-6">
        <h3 className="name">
          <WrapTooltip data={data?.productName} length={100} className="config-truncate" />
        </h3>
        <h3 className="d-flex justify-content-between align-items-center gap-8 w-100">
          <div className="price">{data?.productPrice}</div>
          <div className="qty">
            SL: <span>{data?.productQty}</span>
          </div>
        </h3>
      </div>
    </div>
  );
});

export default React.memo(ResultSearch);
