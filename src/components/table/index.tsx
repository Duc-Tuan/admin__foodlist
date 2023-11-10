import Tippy from '@tippyjs/react';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SettingTable } from '..';
import Icon from '../../assets/icon';
import { useBoolean } from '../../hooks';
import { getCookieByName } from '../../utils';
import Function from '../../utils/function';
import BulkAction, { BulkActionItemModel } from '../bulkAction/bulkAction';
import Checkbox from '../checkboxTabel/checkbox';
import { Pagination } from '../pagination/pagination';
import { IAction, PaginationModel } from './const';
import './index.scss';

interface Props {
  name: string;
  titles?: string[] | React.ReactNode[] | { title: string; sort: boolean; nameSort?: string }[];
  formats?: string[];
  sizes?: number[];
  shows?: boolean[];
  isPagination?: boolean;
  isBulkAction?: boolean;
  className?: string;
  dynamicTitles?: string | React.ReactNode[] | { title: string; sort: boolean; nameSort: string; align?: string }[];
  listIdChecked?: (number | string)[];
  bulkActionItems?: BulkActionItemModel[];
  hasBulkActionHeader?: boolean;
  setListIdChecked?: (listId: (number | string)[]) => void;
  items: any[];
  hasActionItems?: boolean;
  isHasActionItems?: boolean;
  setCodeSort?: any;
  hasViewDetail?: boolean;
  actions?: IAction[];
  isSettingColumn?: boolean;
  hasChangeHead?: boolean;
  totalHeader?: any;
  dataMappingArray: (item: any, idx: number, listIdDetail?: any[], listDataDetail?: any[]) => any[];
  striped?: boolean;
  renderEmpty?: boolean;
  textEmpty?: string;
  isControlRenderDetail?: boolean;
  onClickRow?: (id: number) => void;
  listIdDetailShow?: number[];
  renderDetail?: any;
  clickActions?: boolean;
  otherFooter?: any;
  clickCallBackActions?: (id: number) => void;
  dataPagination?: PaginationModel;
  isEditColumns?: boolean;
  hasCachedCookie?: boolean;
}

const Table: FC<Props> = ({
  name,
  titles,
  formats,
  sizes,
  shows,
  isPagination,
  className,
  isBulkAction,
  dynamicTitles,
  listIdChecked,
  bulkActionItems,
  hasBulkActionHeader,
  setListIdChecked,
  dataMappingArray,
  items,
  hasActionItems,
  isHasActionItems,
  setCodeSort,
  hasViewDetail,
  actions,
  isSettingColumn,
  totalHeader,
  hasChangeHead = true,
  striped,
  renderEmpty,
  textEmpty,
  onClickRow,
  isControlRenderDetail,
  listIdDetailShow,
  renderDetail,
  clickActions,
  otherFooter,
  clickCallBackActions,
  dataPagination,
  isEditColumns,
  hasCachedCookie = true,
}) => {
  const { t } = useTranslation();
  const refActions = React.useRef<any>();
  const refViewDetail = React.useRef<any>();
  const clickOut = React.useRef<boolean>(true);
  const reftable = React.useRef<any>();
  const [scrollTable, setScrollTable] = useState<boolean>(false);

  const [toastSort, setToastSort] = useState<boolean>(false);
  const [listItem, setListItem] = useState<any[]>();
  const [showTitles, setShowTitles] = useState<any>([]);
  const [renderTitles, setRenderTitles] = useState<any>([]);
  const [sort, setSort] = useState<string>('');
  const [onSort, setOnSort] = useState<string>('');
  const [titleSort, setTitleSort] = useState<string>('');
  const [idClick, setIdClick] = useState<number | null>(null);
  const [showAction, setShowAction] = useState<number | null>(null);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [expandedDetail, setExpandedDetail] = useState<{ id: number; status: boolean }>({
    id: 0,
    status: false,
  });
  const [openSettingCol, { on: onOpenSettingCol, off: offOpenSettingCol, toggle: toggleOpenSettingCol }] = useBoolean();

  useEffect(() => {
    setShowTitles(shows ?? Array(dynamicTitles?.length || titles?.length).fill(true));
  }, [shows]);

  Function.useOnClickOutside(
    refActions,
    () => {
      handleShowActionRow(0);
      if (clickActions) {
        setIdClick(null);
      }
    },
    'actions',
  );

  useEffect(() => {
    if (hasCachedCookie) {
      let current: any = getCookieByName(name).split(',') || dynamicTitles || titles;
      if (current.length == 1 && current[0] == '') {
        current = dynamicTitles || titles;
      } else {
        const jsonData = JSON.parse(current);
        current = jsonData.map((i: any) => i.title);
      }
      setRenderTitles(current);
    } else {
      setRenderTitles(dynamicTitles || (titles as any[]));
    }
  }, [dynamicTitles]);

  const checkAll = (isChecked: boolean) => {
    const el = document.getElementsByClassName('wrapper-header')[0] as HTMLDivElement;
    if (setListIdChecked) {
      if (isChecked) {
        el.style.overflow = 'initial';
        if (listIdChecked?.length == 0) {
          //@ts-expect-error
          const newList = [...new Set(items.map((i: any) => i.id))];
          setListIdChecked(newList);
        } else {
          setListIdChecked([]);
        }
      } else {
        el.style.overflow = 'auto';
        setListIdChecked([]);
      }
    }

    if (listIdChecked && listIdChecked?.length > 0 && listIdChecked?.length < items.length) {
      el.style.overflow = 'auto';
    }
  };

  const swithSorts = {
    iconSort: (title: any) => {
      switch (sort) {
        case '': {
          return (
            <div className="sort-icon">
              <Icon name="xmlid-up" className="extra-60" />
              <Icon name="xmlid-down" className="extra-60" />
            </div>
          );
        }
        case 'asc': {
          if (titleSort == title) {
            return <Icon name="arrow-up" />;
          } else {
            return (
              <div className="sort-icon">
                <Icon name="xmlid-up" className="extra-60" />
                <Icon name="xmlid-down" className="extra-60" />
              </div>
            );
          }
          break;
        }
        case 'desc': {
          if (titleSort == title) {
            return <Icon name="arrow-down" />;
          } else {
            return (
              <div className="sort-icon">
                <Icon name="xmlid-up" className="extra-60" />
                <Icon name="xmlid-down" className="extra-60" />
              </div>
            );
          }
          break;
        }
      }
    },
    switchSort: (title: any) => {
      setTitleSort(title.title);
      switch (sort) {
        case '': {
          setSort('asc');
          setCodeSort(`${title.nameSort},asc`);
          setOnSort(title.title);
          break;
        }
        case 'asc': {
          setSort('desc');
          setCodeSort(`${title.nameSort},desc`);
          setOnSort(title.title);
          break;
        }
        case 'desc': {
          setSort('');
          setCodeSort('');
          setOnSort('');
          break;
        }
      }
    },
  };

  const renderActions: IAction[] = hasViewDetail
    ? [
        {
          icon: <Icon name="icon-view" />,
          callback: (id, flag) => {
            if (flag) {
              setExpandedDetail((prev: any) => ({ id: id, status: !prev?.status }));
              clickOut.current = true;
            }
            if (!clickOut.current) {
              setExpandedDetail((prev: any) => ({ id: id, status: !prev?.status }));
            }
          },
          title: 'Xem chi tiết',
          type: 'view_detail',
        },
        ...(actions ?? []),
      ]
    : actions ?? [];

  const mapData = (data: any[], listIdDetail?: any[], listDataDetail?: any[]) => {
    return data?.map((item, index) => ({
      id: item?.id,
      data: dataMappingArray(item, index, listIdDetail, listDataDetail),
      raw: item,
      showActionRow: false,
      onShowDetail: false,
    }));
  };

  const handleEditColumns = (e: any) => {
    e.preventDefault();
    if (e.which == 3 || e.button == 2) {
      setShowSettings(true);
    }
  };

  useEffect(() => {
    const el = document.getElementsByTagName('thead')[0];
    if (isEditColumns) {
      el.addEventListener('contextmenu', handleEditColumns);
    }
    return () => el && el.removeEventListener('contextmenu', handleEditColumns);
  }, []);

  useEffect(() => {
    if (!hasChangeHead && typeof titles !== 'string' && titles && titles?.length > 0)
      setRenderTitles(dynamicTitles || titles);

    setListItem(mapData(items));

    return () => {
      setListItem([]);
    };
  }, [items, renderTitles]);

  const checkOne = (id: number | string, isChecked: boolean) => {
    const wrapHeader = document.getElementsByClassName('wrapper-header')[0] as HTMLDivElement;
    if (setListIdChecked && listIdChecked) {
      if (isChecked) {
        setListIdChecked([...listIdChecked, id]);
        wrapHeader.style.overflow = 'initial';
      } else {
        setListIdChecked(listIdChecked.filter((i) => i !== id));
        // wrapHeader.style.overflow = 'auto';
      }
    }
  };

  const handleShowActionRow = (id: number, isShow: boolean = false) => {
    const listItemTemp = listItem?.map((item) => ({
      ...item,
      showActionRow: id === 0 ? false : item.id === id ? isShow : false,
    }));
    setListItem(listItemTemp);
  };

  const onScroll = (e: any) => {
    const isCheck =
      Number((reftable.current?.scrollLeft + reftable.current?.offsetWidth - 2).toFixed()) >
      reftable.current?.scrollWidth - 10;
    if (isCheck) {
      setScrollTable(false);
    } else {
      setScrollTable(true);
    }
  };

  const totalWidth = React.useMemo(() => {
    const data = sizes?.reduce((total: number, current: number) => {
      return (total += current);
    }, 0);

    return data;
  }, [sizes]);

  React.useEffect(() => {
    reftable?.current?.addEventListener('scroll', onScroll);
    return () => reftable?.current?.removeEventListener('scroll', onScroll);
  }, []);

  console.log(reftable?.current?.clientWidth, totalWidth);

  const reportWindowSize = () => {
    console.log(reftable?.current?.clientWidth);
  }

  React.useEffect(() => {
    // if (reftable?.current?.clientWidth > (totalWidth ?? 0)) {
    //   setScrollTable(false);
    // } else {
    //   setScrollTable(true);
    // }
    reftable?.current?.addEventListener("change", reportWindowSize)
    return () => reftable?.current?.removeEventListener('change', reportWindowSize);
  }, []);

  return (
    <div className={`scroll__foodApp wrapper__table`} ref={reftable}>
      {sizes && (
        <>
          <table
            className={`table table__header ${isPagination ? ' has-pagination' : ''}${
              className ? ` ${className}` : ''
            }`}
          >
            {sizes ? (
              <colgroup>
                {isBulkAction && <col style={{ width: 25 }} />}
                {sizes.map(
                  (item, idx) => showTitles[idx] && <col className="col-header" style={{ width: item }} key={idx} />,
                )}
                {renderActions?.length > 0 && <col className="col-header" style={{ width: '150px' }} />}
              </colgroup>
            ) : null}

            <thead
              onMouseMove={(e) => {
                const el = document.getElementsByClassName('custom-tooltip')[0] as HTMLElement;
                if (el) {
                  el.style.display = 'block';
                  el.style.top = e.clientY + 10 + 'px';
                  el.style.left = e.clientX + 10 + 'px';
                }
              }}
              onMouseLeave={(e) => {
                const el = document.getElementsByClassName('custom-tooltip')[0] as HTMLElement;
                if (el) {
                  el.style.display = 'none';
                }
              }}
            >
              <tr className={listIdChecked && listIdChecked.length != 0 ? 'checked' : ''}>
                {isBulkAction &&
                bulkActionItems &&
                bulkActionItems?.length > 0 &&
                listIdChecked &&
                hasBulkActionHeader &&
                setListIdChecked ? (
                  <th className={`checkbox`}>
                    <Checkbox
                      indeterminate={listIdChecked?.length > 0 && listIdChecked?.length < items.length}
                      checked={listIdChecked?.length === items.length && listIdChecked?.length > 0}
                      onChange={(e: any) => checkAll(e.target.checked)}
                    />

                    {!hasActionItems && (
                      <BulkAction
                        className={''}
                        name={name}
                        hasActionItems={isHasActionItems}
                        selectedCount={listIdChecked?.length}
                        bulkActionItems={bulkActionItems}
                      />
                    )}
                  </th>
                ) : null}

                {renderTitles?.map((title: any, idx: number) => {
                  return (
                    showTitles[idx] && (
                      <th key={idx} className={`${formats ? formats[idx] : ''} `} style={{ width: `${sizes[idx]}px` }}>
                        {title.title ? (
                          <div
                            className={`d-flex align-items-center pointer ${title.align}`}
                            onClick={() => {
                              if (title.sort) {
                                setToastSort(true);
                                if (onSort == title.title) {
                                  swithSorts.switchSort(title);
                                } else {
                                  setSort('asc');
                                  setCodeSort(`${title.nameSort},asc`);
                                  setTitleSort(title.title);
                                  setOnSort(title.title);
                                }
                              }
                            }}
                          >
                            <span className={onSort == title.title ? 'color-primary' : ''}>
                              {title.title ? t(title.title) : t(title)}
                            </span>
                            {title.sort && swithSorts.iconSort(title.title)}
                          </div>
                        ) : (
                          <span>{t(title)}</span>
                        )}
                      </th>
                    )
                  );
                })}
                {renderActions?.length > 0 ? (
                  <th className={`actions text-center ${!scrollTable ? '' : 'scroll-Table'}`}>
                    <div className="d-flex justify-content-center align-items-center gap-6">
                      {t('Thao tác')}
                      {!isSettingColumn && (
                        <Tippy appendTo={document.body} content={t('Điều chỉnh cột')}>
                          <div onClick={toggleOpenSettingCol} className="actions__col">
                            <Icon name="settings-nav" />
                          </div>
                        </Tippy>
                      )}
                    </div>
                  </th>
                ) : null}
              </tr>
              {totalHeader && totalHeader}
            </thead>
          </table>

          <table
            className={`table${striped ? ' table-striped' : ''}${isPagination ? ' has-pagination' : ''}${
              className ? ` ${className}` : ''
            }`}
          >
            {sizes ? (
              <colgroup>
                {isBulkAction && <col style={{ width: 25 }} />}
                {sizes.map((item, idx) => showTitles[idx] && <col key={idx} style={{ width: item }} />)}
                {renderActions?.length > 0 && <col style={{ width: '150px' }} />}
              </colgroup>
            ) : null}
            <tbody>
              {renderEmpty ? (
                <tr className="no-item">
                  <td colSpan={renderTitles.length}>
                    <Icon name="box" />

                    <span className="">{textEmpty}</span>
                  </td>
                </tr>
              ) : null}
              {listItem?.map((item, index) => {
                const isChecked = !!(listIdChecked && setListIdChecked && listIdChecked.some((id) => id === item.id));
                const itemDetail = item;
                const hasActiveWithControlRenderDetail = isControlRenderDetail && item?.raw?.isViewDetail;

                return (
                  <React.Fragment key={index}>
                    <tr
                      onClick={(e) => (onClickRow ? onClickRow(item.id) : null)}
                      className={`${hasActiveWithControlRenderDetail ? 'actived' : ''} ${
                        onClickRow ? 'cursor-pointer' : ''
                      }${isBulkAction && bulkActionItems?.length && isChecked ? ' has-choose' : ''}${
                        listIdDetailShow?.includes(item.id) ? ' actived active' : ''
                      }`}
                    >
                      {isBulkAction &&
                      bulkActionItems &&
                      bulkActionItems?.length > 0 &&
                      listIdChecked &&
                      setListIdChecked ? (
                        <td className={`checkbox`} onClick={(e) => e.stopPropagation()}>
                          <Checkbox checked={isChecked} onChange={(e: any) => checkOne(item.id, e.target.checked)} />
                        </td>
                      ) : null}

                      {item.data?.map((d: any, idx: number) => {
                        return (
                          showTitles[idx] && (
                            <React.Fragment key={idx}>
                              <td className={`${formats ? formats[idx] : ''}`} style={{ width: `${sizes[idx]}px` }}>
                                {d?.data}
                              </td>
                            </React.Fragment>
                          )
                        );
                      })}

                      {renderActions?.length > 0 ? (
                        <td
                          //   style={{
                          //     position: isStickyActionCol ? 'sticky' : 'relative',
                          //   }}
                          className={`actions d-flex justify-content-center align-items-center gap-6 ${
                            !scrollTable ? '' : 'scroll-Table'
                          }`}
                          onClick={async (e) => {
                            e.stopPropagation();
                          }}
                        >
                          <div className="action-container">
                            {renderActions.map((value, index) => {
                              if (value?.type === 'view_detail')
                                return (
                                  <Tippy
                                    appendTo={document.body}
                                    ref={refViewDetail}
                                    content={renderDetail && renderDetail(expandedDetail)}
                                    trigger="click"
                                    interactive={true}
                                    key={index}
                                    data-box="view-detail"
                                    theme="light"
                                    className="break-word tooltip_table_view_detail"
                                  >
                                    <div
                                      onClick={() => {
                                        setExpandedDetail({ id: itemDetail?.raw?.id, status: true });
                                      }}
                                      className={`view-detail action__item ${
                                        expandedDetail?.id == itemDetail?.raw?.id && expandedDetail?.status
                                          ? 'active'
                                          : ''
                                      }`}
                                    >
                                      {value.icon}
                                    </div>
                                  </Tippy>
                                );
                              return (
                                index < 2 && (
                                  <Tippy
                                    appendTo={document.body}
                                    content={
                                      value.subTitle ? (
                                        <div
                                          onClick={() => {
                                            setShowAction(null);
                                            value.callback(item.id);
                                          }}
                                        >
                                          {value.subTitle}
                                        </div>
                                      ) : (
                                        value.title
                                      )
                                    }
                                    key={index}
                                    className="break-word"
                                    theme={'light'}
                                    disabled={value.subTitle ? (showAction == item.id ? false : true) : false}
                                    visible={value.subTitle ? (showAction == item.id ? true : false) : undefined}
                                  >
                                    <div
                                      key={index}
                                      onClick={() => {
                                        if (value.subTitle) {
                                          if (showAction == item.id) {
                                            setShowAction(null);
                                          } else setShowAction(item.id);
                                          value.callback(item.id);
                                        } else {
                                          value.callback(item.id);
                                          handleShowActionRow(0);
                                        }
                                      }}
                                      className="action__item"
                                    >
                                      {value.icon}
                                    </div>
                                  </Tippy>
                                )
                              );
                            })}
                            {renderActions.length > 2 && (
                              <Tippy
                                appendTo={document.body}
                                ref={refActions}
                                content={
                                  <ul className="more-actions">
                                    {renderActions?.map(
                                      (a, idx) =>
                                        idx > 1 && (
                                          <li
                                            key={idx}
                                            onClick={() => {
                                              a.callback(item.id);
                                              handleShowActionRow(0);
                                            }}
                                          >
                                            {a.icon}
                                            {a.title}
                                          </li>
                                        ),
                                    )}
                                  </ul>
                                }
                                data-box="view-detail"
                                theme="light"
                                visible={clickActions ? idClick === item.id : item.showActionRow}
                                className="break-word tooltip_table_more_options"
                              >
                                <div
                                  onClick={() => {
                                    handleShowActionRow(item.id, !item.showActionRow);
                                    if (clickActions) {
                                      clickCallBackActions && clickCallBackActions(item.id);
                                      setIdClick((prev) => {
                                        const res = prev === item.id ? 0 : item.id;
                                        return res;
                                      });
                                    }
                                  }}
                                  className="action__item"
                                >
                                  <Icon name="more-options" />
                                </div>
                              </Tippy>
                            )}
                          </div>
                        </td>
                      ) : null}
                    </tr>
                  </React.Fragment>
                );
              })}
              {otherFooter && otherFooter}
            </tbody>
          </table>
        </>
      )}

      {isPagination && dataPagination ? (
        <Pagination
          name={dataPagination.name}
          displayNumber={dataPagination.displayNumber}
          page={dataPagination.page}
          setPage={(page: any) => dataPagination.setPage(page)}
          sizeLimit={dataPagination.sizeLimit}
          totalItem={dataPagination.totalItem}
          totalPage={dataPagination.totalPage}
          chooseSizeLimit={(limit: any) => dataPagination?.chooseSizeLimit && dataPagination?.chooseSizeLimit(limit)}
          //   styles={{
          //     width: isOpenSidebar ? 'calc(100vw - 5.6rem)' : 'calc(100vw - 24rem)',
          //   }}
        />
      ) : null}

      {isEditColumns && (
        <SettingTable
          name={name}
          data={titles}
          showTitles={showTitles}
          onHide={offOpenSettingCol}
          onShow={openSettingCol}
          renderColumns={renderTitles}
          updateTitles={(data) => {
            const dataNew = data?.map((i: any) => i.title);
            setRenderTitles(dataNew);
          }}
        />
      )}
    </div>
  );
};

export default Table;
