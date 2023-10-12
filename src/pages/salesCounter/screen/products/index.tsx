import React from 'react';
import { Loading } from '../../../../components';
import './index.scss';

type Props = {};

const ProductsSales = (props: Props) => {
  return (
    <div className="wrapper__productsSales">
      <Loading />
    </div>
  );
};

export default ProductsSales;
