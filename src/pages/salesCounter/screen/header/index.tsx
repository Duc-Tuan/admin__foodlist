import Tippy from '@tippyjs/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../../assets/icon';
import { Loading, SearchCustom } from '../../../../components';
import { useAppDispatch } from '../../../../hooks';
import MenuNotifition from '../../../../layouts/header/MenuNotifition';
import { actions as actionsSales } from '../../store';
import { dataProducts, isFullscreen as fullscreen } from '../../store/select';
import Tabs from './Tabs';
import { IMenu, menu } from './const';
import './index.scss';
import { IProducts } from '../products/const';
import ResultSearch from './ResultSearch';
import ApiProducts from '../../../../assets/apis/ApiProducts';
import { useTranslation } from 'react-i18next';

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
  const refInput = React.useRef<any>();
  const { t } = useTranslation();
  const productsStore = useSelector(dataProducts);
  const isFullscreen = useSelector(fullscreen);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isFocused, setIsFocused] = React.useState<boolean>(false);
  const [dataSearch, setDataSearch] = React.useState<IProducts[]>([]);
  const [valueSearch, setValueSearch] = React.useState<string>('');
  const [laoding, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      event.keyCode === 113 && refInput?.current.querySelector('input')?.focus();
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      window.removeEventListener('keydown', handleKey);
    };
  }, []);

  const getData = async () => {
    try {
      setLoading(true);
      const res = await ApiProducts.getProducts(1, 10, valueSearch);
      setDataSearch(res?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    valueSearch !== '' ? getData() : setDataSearch(productsStore);
  }, [valueSearch, productsStore]);

  return (
    <div className="wrapper__header--sales d-flex align-items-center justify-content-between gap-4 flex-fill">
      <div className="wrapper__main--tabs flex-fill d-flex align-items-center justify-content-start gap-10">
        <div className="wrapper__main--tabs_search">
          <SearchCustom
            renderMenu={<ResultSearch isLoading={laoding} data={dataSearch} />}
            ref={refInput}
            placeholder="Tìm kiếm sản phẩm(F2)"
            setFocused={setIsFocused}
            classNameInput={isFocused ? 'active' : ''}
            isFocused={isFocused}
            onChange={(e: string) => setValueSearch(e)}
          />
          {isFocused && <div className="blurred_bg" onClick={() => setIsFocused(false)}></div>}
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
          <h4>{t('Nhân viên bán hàng')}</h4>
        </div>
        <div className="info__other d-flex justify-content-end align-items-center gap-10">
          {menu.map((i: IMenu, idx: number) => (
            <React.Fragment key={`menu__sales--${idx}`}>
              <Tippy
                appendTo={document.body}
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
            appendTo={document.body}
            content={t(!isFullscreen ? 'Mở rộng màn hình' : 'Thu nhỏ màn hình')}
            arrow={true}
            interactive={true}
            placement="bottom"
          >
            {!isFullscreen ? (
              <div
                className="btn-action maximize info__other--item  d-flex justify-content-center align-items-center"
                hover-text={t('Mở rộng màn hình')}
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
