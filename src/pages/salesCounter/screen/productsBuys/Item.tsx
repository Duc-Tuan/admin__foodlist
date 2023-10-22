import React from 'react';
import { IProductSales } from '../../const';
import Icon from '../../../../assets/icon';
import Images from '../../../../components/image';
import { WrapTooltip } from '../../../../components/wrapTooltip/WrapTooltip';
import { checkNullish, formatCurrency } from '../../../../utils';
import useDebounce from '../../../../hooks/components/useDebounce';
import { useAppDispatch, useBoolean } from '../../../../hooks';
import { actions as actionsSales } from '../../store';
import MenuSubSales from '../menuSub';
import ApiProducts from '../../../../assets/apis/ApiProducts';
import { Loading, ViewImageProduct } from '../../../../components';
import { IProduct } from '../../../../types/producrts_type';
import { useTranslation } from 'react-i18next';

type Props = {
  data: IProductSales;
  index: number;
};

const Item = (props: Props) => {
  const { data, index } = props;
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
      <div className={`item d-flex justify-content-start align-items-center gap-8 ${index === 0 ? 'active' : ''}`}>
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
            <div className="price flex-fill">
              {checkNullish(data?.prommotion) ? (
                <>
                  <del className="price__after">{formatCurrency(data?.price, '')}</del>
                  <div className="price__before">
                    {formatCurrency(data?.price * ((100 - Number(data?.prommotion)) / 100), '')}
                  </div>
                </>
              ) : (
                formatCurrency(data?.price, '')
              )}
            </div>
            <h3 className="money flex-fill">
              {checkNullish(data?.prommotion) ? (
                <>
                  <del className="price__after">{formatCurrency(data?.price * Number(qty), '')}</del>
                  <div className="price__before">
                    {formatCurrency(data?.price * ((100 - Number(data?.prommotion)) / 100) * Number(qty), '')}
                  </div>
                </>
              ) : (
                formatCurrency(data?.price * Number(qty), '')
              )}
            </h3>
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
  const { t } = useTranslation();
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
        <div className="d-flex justify-start align-items-start gap-10">
          <div className="detailProduct__images">
            <ViewImageProduct
              url={data?.productImage}
              alt="Sản phẩm"
              dataUrl={data && [data?.productImage, data?.productImage, data?.productImage, data?.productImage]}
            />
          </div>
          <div className="detailProduct__info scroll__foodApp">
            <h3 className="name">
              <WrapTooltip data={data?.productName ?? ''} length={200} classNameChildren="config-truncate" />
            </h3>

            <div className="group d-flex justify-start align-items-start gap-10 mt-10">
              <div className="value">{t('Giá')}:</div>
              <div className="lable active">
                {data?.productPromotion ? (
                  <div className=" d-flex justify-start align-items-start gap-10">
                    <del className="price-after">{formatCurrency(Number(data?.productPrice), ' vnđ')}</del>
                    <span>-</span>
                    <span className="price-before">
                      {formatCurrency(data?.productPrice - data?.productPrice * (data?.productPromotion / 100), ' vnđ')}
                    </span>
                  </div>
                ) : (
                  formatCurrency(Number(data?.productPrice), ' vnđ')
                )}
              </div>
            </div>

            <div className="info__detail scroll__foodApp">
              <div className="group d-flex justify-start align-items-start gap-10 mt-10">
                <div className="value">{t('Khuyến mãi')}:</div>
                <div className={`lable ${checkNullish(data?.productPromotion) ? 'active' : ''}`}>
                  {checkNullish(data?.productPromotion) ? (
                    `${data?.productPromotion}%`
                  ) : (
                    <span>{t('Sản phẩm chưa được áp dụng chương trình khuyến mãi.')}</span>
                  )}
                </div>
              </div>

              <div className="group d-flex justify-start align-items-start gap-10 mt-10">
                <div className="value">{t('Mã sản phẩm')}:</div>
                <div className="lable">{data?.code}</div>
              </div>

              <div className="group d-flex justify-start align-items-start gap-10 mt-10">
                <div className="value">{t('Đơn vị')}:</div>
                <div className="lable">{checkNullish(data?.productUnit) ?? '---'}</div>
              </div>

              <div className="group d-flex justify-start align-items-start gap-10 mt-10">
                <div className="value">{t('Số lượng')}:</div>
                <div className="lable">{formatCurrency(Number(data?.productQty), ` ${t('sản phẩm có sẵn')}`)}</div>
              </div>

              <div className="group d-flex justify-start align-items-start gap-10 mt-10">
                <div className="value">{t('Nguồn hàng')}:</div>
                <div className="lable">{checkNullish(data?.productSource) ?? '--'}</div>
              </div>

              <div className="group d-flex justify-start align-items-start gap-10 mt-10">
                <div className="value">{t('Thể loại')}:</div>
                <div className="lable">{checkNullish(data?.productCategory) ?? '---'}</div>
              </div>

              <div className="group d-flex justify-start align-items-start gap-10 mt-10">
                <div className="value">{t('Mô tả ngắn')}:</div>
                <div className="lable">{checkNullish(data?.productDesc) ?? '---'}</div>
              </div>

              <div className="group d-flex justify-start align-items-start gap-10 mt-10">
                <div className="value">{t('Mô tả chi tiết')}:</div>
                <div className="lable scroll__foodApp">{data?.productDescribes}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Item;
