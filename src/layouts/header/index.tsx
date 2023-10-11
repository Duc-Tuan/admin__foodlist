import React from 'react';
import Icon from '../../assets/icon';
import { useAppDispatch, useBoolean } from '../../hooks';
import { getLocation } from '../../utils/localStorage';
import { actions as actionsHeader } from '../sliderbar/store';
import { nameSliderbar } from './const';
import './index.scss';
import Tippy from '@tippyjs/react';
import MenuLogin from './MenuLogin';
import MenuNotifition from './MenuNotifition';

type Props = {};

const Header = (props: Props) => {
  const dispatch = useAppDispatch();
  const [isSliderbar, { on, off, toggle }] = useBoolean(getLocation(nameSliderbar) !== null ? true : false);

  React.useEffect(() => {
    dispatch(actionsHeader.setSlidebar({ isHeader: isSliderbar }));
  }, [isSliderbar]);

  return (
    <div className="header d-flex justify-content-between align-items-center">
      <div className="icon__menu" onClick={toggle}>
        {!isSliderbar ? <Icon name="icon-open-sidebar" /> : <Icon name="icon-off-sidebar" />}
      </div>

      <div className="header__info d-flex justidy-content-center align-items-center">
        <Tippy
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
