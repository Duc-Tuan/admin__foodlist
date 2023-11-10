import Tippy from '@tippyjs/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { navMenu } from '../..';
import Icon from '../../../assets/icon';
import { PATHNAME } from '../../../configs/pathname';
import { useAppDispatch } from '../../../hooks';
import { actions as actionsHeader } from '../../sliderbar/store';
import { INavMenu, ISubMenu } from '../../types';
import MenuSub from './MenuSub';
import './index.scss';
interface ISliderbar {
  isSlidebar?: boolean;
  isSubMenu?: {
    indexCurrent: number;
    isCurrent: boolean;
  };
}

const Sliderbar: React.FC<ISliderbar> = ({ isSlidebar: isHeader, isSubMenu }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const onClickSubmenu = (pathLink: string, indexCurrent: number) => {
    dispatch(
      actionsHeader.setSubMenu({
        subMenu: { indexCurrent: indexCurrent, isCurrent: true },
      }),
    );
    navigate(pathLink);
  };

  return (
    <div className={`sliderbar ${isHeader ? 'open' : 'off'}`}>
      <div className="sliderbar__logo" onClick={() => navigate(PATHNAME.SCREENDASHBOARD)}>
        {isHeader ? 'Food app' : 'F'}
      </div>
      <div className="sliderbar__menu">
        {navMenu?.map((i: INavMenu, idx: number) => {
          const { subMenu } = i;
          const isActive =
            pathname.includes(i?.link) ||
            i?.subMenu?.some((iSub: ISubMenu) => pathname.includes(String(iSub?.namePath)));
          const isOpenMenuSub = isSubMenu?.indexCurrent === idx && isSubMenu?.isCurrent === true;
          return (
            <React.Fragment key={`sliderbar__${idx}`}>
              <Tippy
                appendTo={document.body}
                content={<MenuSub data={subMenu} onClick={onClickSubmenu} idx={idx} title={i?.name} />}
                className="menuSub__header"
                placement="right-start"
                interactive={!isHeader && !(subMenu === undefined)}
                disabled={subMenu === undefined ? true : isHeader}
                // visible={true}
                theme="main"
              >
                <div
                  className={`sliderbar__menu--item d-flex justify-content-between align-items-center gap-10 ${
                    isActive ? 'bg--hover' : ''
                  }`}
                  onClick={() => {
                    if (subMenu) {
                      isSubMenu?.indexCurrent === idx
                        ? dispatch(
                            actionsHeader.setSubMenu({
                              subMenu: { indexCurrent: isSubMenu?.indexCurrent, isCurrent: !isSubMenu.isCurrent },
                            }),
                          )
                        : dispatch(
                            actionsHeader.setSubMenu({
                              subMenu: { indexCurrent: idx, isCurrent: true },
                            }),
                          );
                    } else {
                      dispatch(
                        actionsHeader.setSubMenu({
                          subMenu: { indexCurrent: Number(isSubMenu?.indexCurrent), isCurrent: false },
                        }),
                      );
                      navigate(i?.link);
                    }
                  }}
                >
                  <div className="right d-flex justify-content-center align-items-end gap-10">
                    <div className="icon">
                      <Icon name={i?.icon} />
                    </div>
                    <div className={`name ${isHeader ? 'open' : 'off'}`}>{t(i?.name)}</div>
                  </div>

                  {subMenu && isHeader && (
                    <div className={`left ${isOpenMenuSub ? 'open' : 'off'} `}>
                      <Icon name="chevron-down" />
                    </div>
                  )}
                </div>
              </Tippy>

              <div
                className={`sliderbar__menu--menuSub ${subMenu && isHeader && isOpenMenuSub ? 'active' : ''}`}
                style={{ height: `${subMenu && isHeader && isOpenMenuSub ? 48 * subMenu.length : 0}px` }}
              >
                {subMenu &&
                  isHeader &&
                  isOpenMenuSub &&
                  subMenu.map((sub: ISubMenu, idxSub: number) => (
                    <div
                      className="item d-flex justify-content-start align-items-center"
                      key={`subMenu__${idxSub}`}
                      onClick={() => {
                        navigate(sub?.link);
                      }}
                    >
                      {t(sub?.name)}
                    </div>
                  ))}
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default React.memo(Sliderbar);
