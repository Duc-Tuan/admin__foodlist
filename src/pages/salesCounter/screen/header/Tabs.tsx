import React from 'react';
import { useSelector } from 'react-redux';
import { tabs as reducerTabs } from '../../store/select';
import { ITabs } from '../../const';
import Icon from '../../../../assets/icon';
import { useAppDispatch } from '../../../../hooks';
import { actions as actionsSales } from '../../store';
import Tippy from '@tippyjs/react';

type Props = {};

const Tabs = (props: Props) => {
  const dispatch = useAppDispatch();
  const tabs = useSelector(reducerTabs);

  const handleAddTab = React.useCallback(() => {
    const dataTab: ITabs = {
      indexTab: tabs?.length,
      status: true,
      nameTab: tabs?.some((i: ITabs) => i?.nameTab?.includes(`Đơn ${tabs?.length}`))
        ? `Đơn ${tabs?.length + 1}`
        : `Đơn ${tabs?.length}`,
      contentTab: [
        {
          id: tabs?.length + 1,
          name: `Sản phẩm ${tabs?.length + 1}`,
          image: '',
          qty: Math.floor(Math.random() * 11),
          price: Math.floor(Math.random() * 100000),
        },
      ],
    };
    dispatch(actionsSales.setTabs({ tab: dataTab }));

    handleScrollIntoView();
  }, [tabs]);

  const handleScrollIntoView = () => {
    setTimeout(() => {
      const tabList: any = document.querySelector('.wrapper__tabsSales .order-tab-box');
      tabList.scrollLeft += tabList.scrollWidth;
      const arrowPrevTab: any = document.querySelector('.wrapper__tabsSales .arrow-left');
      const arrowNextTab: any = document.querySelector('.wrapper__tabsSales .arrow-right');
      arrowNextTab?.classList.add('hide');
      arrowPrevTab?.classList.remove('hide');
    }, 100);
  };

  const handleUpdateTab = React.useCallback(
    (id: number, name: string) => {
      const dataTab: ITabs = {
        indexTab: id,
        status: true,
        nameTab: name,
        contentTab: tabs?.filter((i: ITabs) => i?.indexTab === id)[0]?.contentTab,
      };
      dispatch(actionsSales.setTabs({ tab: dataTab }));
    },
    [tabs],
  );

  // console.log(tabs);

  const handleDeleteTab = React.useCallback(
    (id: number) => {
      dispatch(actionsSales.delete({ id: id }));
    },
    [tabs],
  );

  const handlePrevTab = () => {
    const tabList: any = document.querySelector('.wrapper__tabsSales .order-tab-box');
    const arrowPrevTab = document.querySelector('.wrapper__tabsSales .arrow-left');
    const arrowNextTab = document.querySelector('.wrapper__tabsSales .arrow-right');
    tabList.scrollLeft -= 200;

    if (tabList?.scrollLeft - 200 <= 0) {
      arrowPrevTab?.classList.add('hide');
    } else {
      arrowPrevTab?.classList.remove('hide');
    }
    if (tabList?.scrollLeft - 200 < tabList?.scrollWidth - tabList?.clientWidth) {
      arrowNextTab?.classList.remove('hide');
    }
  };

  const handleNextTab = () => {
    const tabList: any = document.querySelector('.wrapper__tabsSales .order-tab-box');
    const arrowPrevTab = document.querySelector('.wrapper__tabsSales .arrow-left');
    const arrowNextTab = document.querySelector('.wrapper__tabsSales .arrow-right');
    tabList.scrollLeft += 200;

    if (tabList?.scrollLeft + 200 >= tabList?.scrollWidth - tabList?.clientWidth) {
      arrowNextTab?.classList.add('hide');
    } else {
      arrowNextTab?.classList.remove('hide');
    }
    if (tabList?.scrollLeft + 200 >= 200) {
      arrowPrevTab?.classList?.remove('hide');
    }
  };

  React.useEffect(() => {
    const wrapTabs: any = document.querySelector('.wrapper__tabsSales .order-tab-box ');
    const arrowNext: any = document.querySelector('.arrow-right');
    const arrowPrev: any = document.querySelector('.arrow-left');
    let renderCheckView: number = 0;
    const screenView = window.screen.width;
    if (screenView <= 1279) renderCheckView = 250;
    if (screenView > 1279 && screenView <= 1365) renderCheckView = 400;
    if (screenView > 1365 && screenView <= 1580) renderCheckView = 440;
    if (screenView > 1580 && screenView <= 1720) renderCheckView = 650;
    if (screenView > 1720 && screenView <= 1919) renderCheckView = 800;
    if (screenView >= 1920) renderCheckView = 950;

    if (renderCheckView > wrapTabs?.scrollWidth) {
      arrowNext?.classList.add('none');
      arrowPrev?.classList.add('none');
      arrowNext?.classList.add('hide');
      arrowPrev?.classList.add('hide');
    } else {
      arrowNext?.classList.remove('hide');
      arrowNext?.classList.remove('none');
      arrowPrev?.classList.remove('none');
    }
  }, [document.querySelectorAll('.wrapper__tabsSales .order-tab-box .wrapper__tabsSales_item')]);

  return (
    <div className="wrapper__tabsSales d-flex justify-content-center align-items-center gap-10">
      <div className="d-flex justify-content-center align-items-center gap-10">
        {tabs?.length >= 5 && (
          <div onClick={() => handlePrevTab()} className="arrow-left">
            <Icon name="chevron-down" />
          </div>
        )}

        <div className="order-tab-box d-flex justify-content-start align-items-center">
          {tabs?.map((i: ITabs, idx: number) => {
            return (
              <div
                className={`wrapper__tabsSales_item d-flex justify-content-center align-items-center ${
                  i?.status ? 'active' : ''
                } ${idx != tabs?.length - 1 ? 'hidenBefore' : ''}`}
                key={idx}
              >
                <h4 onClick={() => handleUpdateTab(i.indexTab, i?.nameTab)}>{i?.nameTab}</h4>
                {tabs?.length >= 2 && (
                  <div
                    className="close d-flex justify-content-center align-items-center"
                    onClick={() => handleDeleteTab(i.indexTab)}
                  >
                    <Icon name="times" />
                  </div>
                )}
                <div className="space"></div>
              </div>
            );
          })}
        </div>

        {tabs?.length >= 5 && (
          <div onClick={() => handleNextTab()} className="arrow-right">
            <Icon name="chevron-down" />
          </div>
        )}
      </div>

      <button className="button__tabsSales d-flex justify-content-center align-items-center" onClick={handleAddTab}>
        <Icon name="plus-circle" />
      </button>
    </div>
  );
};

export default Tabs;
