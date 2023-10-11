import React from 'react';
import './index.scss';
import Icon from '../../../../assets/icon';
import { IMenu, menu } from './const';
import Tippy from '@tippyjs/react';
import { useNavigate } from 'react-router-dom';
import MenuNotifition from '../../../../layouts/header/MenuNotifition';
import { useAppDispatch } from '../../../../hooks';
import { actions as actionsSales } from '../../store';
import { useSelector } from 'react-redux';
import { isFullscreen as fullscreen } from '../../store/select';
import { InputCustom } from '../../../../components';
import Tabs from './Tabs';

type Props = {};

declare global {
  interface Document {
    mozCancelFullScreen?: () => Promise<void>;
    msExitFullscreen?: () => Promise<void>;
    webkitExitFullscreen?: () => Promise<void>;
    mozFullScreenElement?: Element;
    msFullscreenElement?: Element;
    webkitFullscreenElement?: Element;
  }
  interface HTMLElement {
    mozRequestFullScreen?: () => Promise<void>;
    msRequestFullscreen?: () => Promise<void>;
    mozRequestFullscreen?: () => Promise<void>;
    webkitRequestFullscreen?: () => Promise<void>;
  }
}

const HeaderSales = (props: Props) => {
  const isFullscreen = useSelector(fullscreen);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isFocused, setIsFocused] = React.useState<boolean>(false);

  return (
    <div className="wrapper__header--sales d-flex align-items-center justify-content-between gap-4 flex-fill">
      <div className="wrapper__main--tabs flex-fill d-flex align-items-center justify-content-start gap-10">
        <div className="wrapper__main--tabs_search">
          <InputCustom placeholder="Tìm kiếm sản phẩm..." setFocused={setIsFocused} />
          {isFocused && <div className="blurred_bg"></div>}
        </div>

        <div className="wrapper__main--tabs_items">
          <Tabs />
        </div>
      </div>
      <div className="wrapper__main--orhter d-flex align-items-center justify-content-between gap-4">
        <div className="info__user d-flex justify-content-start align-items-start flex-column gap-6">
          <div className="d-flex justify-content-start align-items-start gap-4">
            <Icon name="small-user" />
            <h3>Mr.Tuan</h3>
          </div>
          <h4>Nhân viên bán hàng</h4>
        </div>
        <div className="info__other d-flex justify-content-end align-items-center gap-10">
          {menu.map((i: IMenu, idx: number) => (
            <React.Fragment key={`menu__sales--${idx}`}>
              <Tippy
                content={i?.isPopup ? <MenuNotifition /> : i?.name}
                arrow={true}
                interactive={true}
                placement="bottom"
                theme={i?.isPopup ? 'light' : ''}
                trigger={i?.isPopup ? 'click' : undefined}
                className="wrapper__menu--notifitions"
              >
                <div
                  className="info__other--item  d-flex justify-content-center align-items-center"
                  onClick={() => !i?.isPopup && navigate(i?.link)}
                >
                  <Icon name={i?.icon} />
                </div>
              </Tippy>
            </React.Fragment>
          ))}

          <Tippy
            content={!isFullscreen ? 'Mở rộng màn hình' : 'Thu nhỏ màn hình'}
            arrow={true}
            interactive={true}
            placement="bottom"
          >
            {!isFullscreen ? (
              <div
                className="btn-action maximize info__other--item  d-flex justify-content-center align-items-center"
                hover-text="Mở rộng màn hình"
                onClick={() => {
                  dispatch(actionsSales.setisFullscreen({ isFullscreen: true }));
                  const elem: any = document?.documentElement;
                  if (elem.requestFullscreen) {
                    elem.requestFullscreen();
                  } else if (elem.msRequestFullscreen) {
                    elem.msRequestFullscreen();
                  } else if (elem.mozRequestFullScreen) {
                    elem.mozRequestFullScreen();
                  } else if (elem.webkitRequestFullscreen) {
                    elem.webkitRequestFullscreen();
                  }
                }}
              >
                <Icon name="zoom-in" />
              </div>
            ) : (
              <div
                className="btn-action minimize info__other--item  d-flex justify-content-center align-items-center"
                hover-text="Thu nhỏ màn hình"
                onClick={() => {
                  dispatch(actionsSales.setisFullscreen({ isFullscreen: false }));
                  if (document?.exitFullscreen && !document?.documentElement?.requestFullscreen) {
                    document?.exitFullscreen();
                  } else if (document?.webkitExitFullscreen) {
                    /* Safari */
                    document?.webkitExitFullscreen();
                  } else if (document?.msExitFullscreen) {
                    /* IE11 */
                    document?.msExitFullscreen();
                  }
                }}
              >
                <Icon name="zoom-out" />
              </div>
            )}
          </Tippy>
        </div>
      </div>
    </div>
  );
};

export default HeaderSales;
