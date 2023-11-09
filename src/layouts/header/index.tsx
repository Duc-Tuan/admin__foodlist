import Tippy from '@tippyjs/react';
import React from 'react';
import Icon from '../../assets/icon';
import { useAppDispatch, useBoolean } from '../../hooks';
import { getLocation } from '../../utils/localStorage';
import { actions as actionsHeader } from '../sliderbar/store';
import MenuColor from './MenuColor';
import MenuLogin from './MenuLogin';
import MenuNotifition from './MenuNotifition';
import { nameSliderbar } from './const';
import './index.scss';
import { useTranslation } from 'react-i18next';
import useDebounce from '../../hooks/components/useDebounce';

type Props = {
  isHeader?: boolean;
  title?: string;
  placeholder?: string;
  onChange?: (data: string) => void;
  isSearch?: boolean;
};

const Header = (props: Props) => {
  const { isHeader, title = 'Tiêu đề', placeholder = 'Tìm kiếm nhanh...', onChange, isSearch } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [valueSearch, setValueSearch] = React.useState<string>('');
  const [isSliderbar, { on, off, toggle: toggleSliderbar }] = useBoolean(
    getLocation(nameSliderbar) !== null ? true : false,
  );

  React.useEffect(() => {
    dispatch(actionsHeader.setSlidebar({ isHeader: isSliderbar }));
  }, [isSliderbar]);

  const debounceValue = useDebounce(valueSearch, 300);

  React.useEffect(() => {
    onChange && onChange(debounceValue);
  }, [debounceValue]);

  return (
    <div className="header d-flex justify-content-between align-items-center">
      <div className="d-flex justify-content-start align-items-center gap-10">
        <div className="icon__menu" onClick={toggleSliderbar}>
          {!isSliderbar ? <Icon name="icon-open-sidebar" /> : <Icon name="icon-off-sidebar" />}
        </div>

        {isHeader && (
          <div className="header__orther d-flex justify-content-start align-items-center">
            <div className="title">{t(title)}</div>
            {!isSearch && (
              <div className="search d-flex justify-content-start align-items-center gap-6">
                <div className="icon d-flex justify-content-center align-items-center ">
                  <Icon name="search" />
                </div>
                <input
                  type="text"
                  placeholder={t(placeholder)}
                  onChange={(e: any) => setValueSearch(e?.target?.value)}
                  value={valueSearch}
                />
              </div>
            )}
          </div>
        )}
      </div>

      <div className="header__info d-flex justidy-content-center align-items-center">
        <Tippy
          appendTo={document.body}
          placement="bottom-end"
          content={<MenuColor />}
          theme="light"
          trigger="click"
          arrow={true}
          className="wrapper__menu--color"
          interactive={true}
        >
          <div className="header__info--item d-flex justify-content-center align-items-center">
            <Icon name="icon-change-theme" />
          </div>
        </Tippy>
        <Tippy
          appendTo={document.body}
          placement="bottom"
          content={<MenuNotifition />}
          theme="light"
          trigger="click"
          arrow={true}
          className="wrapper__menu--notifitions"
          interactive={true}
        >
          <div className="header__info--item d-flex justify-content-center align-items-center">
            <Icon name="notification-v2" />
          </div>
        </Tippy>
        <Tippy
          appendTo={document.body}
          content={<MenuLogin />}
          theme="light"
          trigger="click"
          arrow={false}
          className="wrapper__menu--login"
          interactive={true}
        >
          <div className="header__info--item">
            <img src="https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014_1280.jpg" alt="accont user" />
          </div>
        </Tippy>
      </div>
    </div>
  );
};

export default Header;
