import React from 'react';
import { Loading } from '..';

type Props = {
  data: any[];
};

const Menu = (props: Props) => {
  const { data } = props;
  return <div className="menu">{data?.length === 0 ? <Loading /> : ''}</div>;
};

export default Menu;
