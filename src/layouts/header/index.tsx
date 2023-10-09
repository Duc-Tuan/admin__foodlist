import React from 'react';
import Icon from '../../assets/icon';
import { useAppDispatch, useBoolean } from '../../hooks';
import { getLocation } from '../../utils/localStorage';
import { actions as actionsHeader } from '../sliderbar/store';
import { nameSliderbar } from './const';
import './index.scss';

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
    </div>
  );
};

export default Header;
