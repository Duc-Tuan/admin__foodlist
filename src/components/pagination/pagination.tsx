import React, { useState, useEffect, useRef } from 'react';
import './pagination.scss';
import { PaginationModel } from '../table/const';
import Function from '../../utils/function';
import Icon from '../../assets/icon';
import Button from '../button';
import { useTranslation } from 'react-i18next';

const listSizeLimit: number[] = [10, 20, 50, 100];

export function Pagination(props: PaginationModel) {
  const { name, displayNumber, page, sizeLimit = 20, totalPage, totalItem, setPage, chooseSizeLimit, styles } = props;
  const isEven = (n: any) => n % 2 === 0;
  const { t } = useTranslation();

  const [listPage, setListPage] = useState<number[]>([]);
  const caculateDisplayListPage = () => {
    const arrPage: number[] = [];
    let numberSub = 1;
    let numberPlus = 0;
    if (isEven(displayNumber)) {
      numberSub = 2;
      numberPlus = 1;
    }
    let startPage = 1;
    let endPage = totalPage;
    if (totalPage > displayNumber) {
      startPage = page - (displayNumber - numberSub) / 2 > 0 ? page - (displayNumber - numberSub) / 2 : 1;
      endPage = page + displayNumber / 2 <= displayNumber ? displayNumber : page + displayNumber / 2;
      startPage =
        page + (displayNumber - numberSub) / 2 >= totalPage
          ? totalPage - (displayNumber - numberSub + numberPlus)
          : startPage;
      endPage = endPage >= totalPage ? totalPage : endPage;
    }
    for (let i = startPage; i <= endPage; i++) {
      if (i > 1 && i < totalPage) {
        arrPage.push(i);
      }
    }
    setListPage(arrPage);
  };

  useEffect(() => {
    caculateDisplayListPage();
  }, [props]);

  const refSizeLimit = useRef<any>();
  const [showSizeLimit, setShowSizeLimit] = useState<boolean>(false);
  Function.useOnClickOutside(refSizeLimit, () => setShowSizeLimit(false), 'display-item__button');
  return (
    <div className="pagination d-flex align-items-center justify-content-between flex-wrap" style={styles}>
      <div className="count-item">
        {t('Hiển thị')} {page > 1 ? (page - 1) * sizeLimit + 1 : 1} -{' '}
        {page * sizeLimit < totalItem ? page * sizeLimit : totalItem} {t('Trên')} {totalItem} {t(name)}
      </div>
      <div className="pager d-flex align-items-center justify-content-center">
        <ul className="d-flex align-items-center flex-wrap">
          {totalPage > displayNumber ? (
            <li
              className={`page-prev ${page === 1 ? 'disabled' : ''}`}
              onClick={page > 1 ? () => setPage(page - 1) : undefined}
            >
              <Icon name="chevron-left" />
            </li>
          ) : null}
          <li className={`page-item${page === 1 ? ' active' : ''}`} onClick={() => setPage(1)}>
            1
          </li>
          {page > displayNumber ? (
            <li className="page-dot">
              <Icon name="three-dot-horizontal" />
            </li>
          ) : null}
          {totalPage > 1 &&
            listPage.map((number) => (
              <li
                key={number}
                className={`page-item${page === number ? ' active' : ''}`}
                onClick={() => setPage(number)}
              >
                {number}
              </li>
            ))}
          {totalPage - displayNumber + 1 > page ? (
            <li className="page-dot">
              <Icon name="three-dot-horizontal" />
            </li>
          ) : null}
          {totalPage > 1 && (
            <li className={`page-item${page === totalPage ? ' active' : ''}`} onClick={() => setPage(totalPage)}>
              {totalPage}
            </li>
          )}
          {totalPage > displayNumber ? (
            <li
              className={`page-next ${page === totalPage ? 'disabled' : ''}`}
              onClick={page < totalPage ? () => setPage(page + 1) : undefined}
            >
              <Icon name="chevron-right" />
            </li>
          ) : null}
        </ul>
      </div>
      <div className="display-item d-flex align-items-center justify-content-end">
        {chooseSizeLimit && (
          <>
            {t('Hiển thị')}
            <div className="display-item__button">
              <Button
                type="button"
                color="transparent"
                variant="outline"
                onClick={() => setShowSizeLimit(!showSizeLimit)}
              >
                {sizeLimit} / <span>{t('Trang')}</span> <Icon name="chevron-down" />
              </Button>
              {showSizeLimit && (
                <div className="menu__size" ref={refSizeLimit}>
                  <ul>
                    {listSizeLimit.map((size, index) => (
                      <li
                        key={index}
                        onClick={() => {
                          chooseSizeLimit(size);
                          setShowSizeLimit(!showSizeLimit);
                          setPage(1);
                        }}
                        className={`${size === sizeLimit ? 'active' : ''}`}
                      >
                        {size}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
