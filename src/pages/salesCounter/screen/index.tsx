import React from 'react';
import HeaderSales from './header';
import ProductsSales from './products';
import ProductsBuysSales from './productsBuys';
import './index.scss';
import PaymentSales from './payment';
import useThemeApp from '../../../hooks/components/useTheme';

type Props = {};

const ScreenSalesCounter = (props: Props) => {
  useThemeApp();
  return (
    <div className="wrapper__salesCounter">
      <div className="wrapper__salesCounter--header d-flex align-items-center">
        <HeaderSales />
      </div>

      <div className="wrapper__salesCounter--main d-flex align-items-center justify-content-center gap-6">
        <div className="wrapper__salesCounter--productsBuy flex-fill d-flex justify-conten-center align-items-start flex-column gap-6">
          <div className="wrapper__salesCounter--productsPayments w-100">
            <ProductsBuysSales />
          </div>

          <div className="wrapper__salesCounter--products w-100">
            <ProductsSales />
          </div>
        </div>

        <div className="wrapper__salesCounter--payments">
          <PaymentSales />
        </div>
      </div>
    </div>
  );
};

export default ScreenSalesCounter;
