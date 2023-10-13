import React from 'react';
import { Loading } from '../../../../components';
import './index.scss';
import { IPaganition } from '../../../../types/general';
import { IProducts } from './const';
import ApiProducts from '../../../../assets/apis/ApiProducts';
import { WrapTooltip } from '../../../../components/wrapTooltip/WrapTooltip';
import { formatCurrency } from '../../../../utils';
import Icon from '../../../../assets/icon';
import Tippy from '@tippyjs/react';
import Images from '../../../../components/image';
import { useBoolean, useClickOutSide } from '../../../../hooks';
import MenuSubSales from '../menuSub';
import { useTranslation } from 'react-i18next';

const ProductsSales = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [data, setData] = React.useState<IProducts[]>([]);
  const [isOpen, { on, off, toggle }] = useBoolean();
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

  const handlePrev = () => {
    if (paganition?.currentPage > 1) {
      setPaganition((prev) => ({
        ...prev,
        page: prev?.currentPage - 1,
      }));
    }
  };
  const handleNext = () => {
    if (paganition?.currentPage < paganition?.totalPage) {
      setPaganition((prev) => ({
        ...prev,
        page: prev?.currentPage + 1,
      }));
    }
  };

  React.useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      event?.keyCode == 115 && toggle();
    };

    window.addEventListener('keydown', handleKey);

    return () => {
      window.removeEventListener('keydown', handleKey);
    };
  }, []);

  return (
    <>
      <div className="wrapper__productsSales  d-flex justify-content-start align-items-start flex-column gap-10">
        <div className="wrapper__productsSales--header d-flex justify-content-between align-items-start gap-10 w-100">
          <Tippy content={t('Nhấn F4 để đóng/mở bộ lọc')}>
            <div className="search__Advanced d-flex justify-content-center align-items-center" onClick={toggle}>
              <Icon name="icon-hambuger-filter" />
            </div>
          </Tippy>

          <div className="paganition d-flex justify-content-center align-items-center gap-10">
            <div
              className={`prev d-flex justify-content-center align-items-center ${
                paganition?.page === 1 ? '' : 'active'
              }`}
              onClick={handlePrev}
            >
              <Icon name="chevron-down" />
            </div>
            <div className="text">
              <span>{loading ? '...' : paganition?.currentPage}</span>
              <span> / </span>
              <span>{paganition?.totalPage}</span>
            </div>
            <div
              className={`next d-flex justify-content-center align-items-center ${
                paganition?.page === paganition?.totalPage ? '' : 'active'
              }`}
              onClick={handleNext}
            >
              <Icon name="chevron-down" />
            </div>
          </div>
        </div>
        <div className="wrapper__productsSales--main w-100">
          {loading ? (
            <Loading />
          ) : (
            <div className="list-drug">
              {data?.map((i: IProducts, idx: number) => (
                <React.Fragment key={idx}>
                  <Tippy
                    content={tippyRender(i)}
                    appendTo={document.body}
                    theme="light"
                    className="wrapprer__hoverProductsSales"
                  >
                    <div className="product__item d-flex justify-content-start align-items-start gap-10">
                      <Images className="image" alt="Sản phẩm" url={i?.productImage} />
                      <div className="info d-flex justify-content-between align-items-start flex-column">
                        <div className="name trunc-one-line">{i?.productName}</div>
                        <div className="d-flex justify-content-between align-items-center gap-10 w-100">
                          <span className="price">{formatCurrency(i?.productPrice, '')}</span>
                          <span className="qty">
                            SL: <span className="price">{i?.productQty}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </Tippy>
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      </div>

      <MenuSubSales isOpen={isOpen} hidden={off} title="Bộ lọc">
        Lọc cái gì mà lọc
      </MenuSubSales>
    </>
  );
};

const tippyRender = (data: IProducts) => {
  return (
    <div className="product__sales">
      <div className="product__item d-flex justify-content-start align-items-start gap-10">
        <Images className="image" alt="Sản phẩm" url={data?.productImage} />
        <div className="info d-flex justify-content-between align-items-start flex-column gap-10">
          <div className="name trunc-one-line name w-100">{data?.productName}</div>
          <div className="d-flex justify-content-between align-items-center gap-10 w-100">
            <span className="price">{formatCurrency(data?.productPrice, '')}</span>
            <span className="qty">
              SL: <span className="price">{data?.productQty}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsSales;
