import React from 'react';
import { DefaultLayout } from '../../../layouts';
import Difference from './Difference';
import Revenue from './Revenue';
import Work from './Work';
import { optionsChartBar, optionsChartColumn } from './const';
import './index.scss';

const ScreenDashBoard = () => {
  const [data, setData] = React.useState<any[]>([
    ['01/09', 37.33],
    ['02/09', 31.18],
    ['03/09', 27.79],
    ['04/09', 22.23],
    ['05/09', 21.91],
    ['06/09', 21.91],
    ['07/09', 21.91],
    // ['08/09', 21.91],
    // ['09/09', 21.91],
    // ['10/09', 21.91],
    // ['11/09', 21.91],
    // ['12/09', 21.91],
    // ['13/09', 21.91],
    // ['14/09', 21.91],
    // ['15/09', 21.91],
    // ['16/09', 37.33],
    // ['17/09', 31.18],
    // ['18/09', 27.79],
    // ['19/09', 22.23],
    // ['20/09', 21.91],
    // ['21/09', 21.91],
    // ['22/09', 21.91],
    // ['23/09', 21.91],
    // ['24/09', 21.91],
    // ['25/09', 21.91],
    // ['26/09', 21.91],
    // ['27/09', 21.91],
    // ['28/09', 21.91],
    // ['29/09', 21.91],
    // ['30/09', 21.91],
    // ['31/09', 21.91],
  ]);

  return (
    <DefaultLayout isHeader={false}>
      <div className="wrapper__dashboard">
        {/* <Loading /> */}
        <Difference />
        <div className="d-flex mt-20 gap-10">
          <div className="charts">
            <Revenue optionsChartColumn={optionsChartColumn(data)} title="Doanh thu bán hàng" emty />
            <div className="mt-20">
              <Revenue optionsChartColumn={optionsChartBar()} title="Sản phẩm bán chạy" emty />
            </div>
          </div>
          <Work />
        </div>

        <div className="mt-20"></div>
      </div>
    </DefaultLayout>
  );
};

export default ScreenDashBoard;
