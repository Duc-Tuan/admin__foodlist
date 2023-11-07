import React from 'react';
import { IDifference, dataDifference, dataSelect, renderIconDifference } from '../types';
import { formatCurrency } from '../../../utils';
import Icon from '../../../assets/icon';
import { Selector } from '../../../components';
import CountUp from 'react-countup';
import { useTranslation } from 'react-i18next';

type Props = {};

const Difference = (props: Props) => {
  const [difference, setDifference] = React.useState<IDifference[]>(dataDifference);
  const { t } = useTranslation();
  return (
    <div className="wrapper__difference">
      <div className="wrapper__difference--filter d-flex justify-content-between align-items-center gap-10 sticky">
        <div className="name">{t('Thống kê trong ngày')}</div>

        <div className="selected">
          <Selector options={dataSelect} />
        </div>
      </div>
      <div className="d-flex justify-content-start align-items-center gap-10">
        {difference?.map((i: IDifference, idx: number) => {
          const dataDifference: number = i?.qty - i?.qtyOld;

          return (
            <div className="wrapper__difference--item w-100" key={idx}>
              <div className="top flex-fill d-flex justify-content-between align-items-center gap-10 w-100">
                <div className="price">
                  <h4>
                    <CountUp
                      start={0}
                      end={i?.qty}
                      formattingFn={(e) => {
                        return String(formatCurrency(e, ''));
                      }}
                    />
                  </h4>
                  <span>{t(i?.name)}</span>
                </div>

                <div
                  className="icon d-flex justify-content-center align-items-center"
                  style={{ background: renderIconDifference(i?.status)?.color }}
                >
                  <Icon name={renderIconDifference(i?.status)?.nameicon} />
                </div>
              </div>

              <div className="bottom">
                <span
                  className={`sign ${dataDifference > 0 ? 'activePositive' : 'activePositiveMinus'} ${
                    i?.qtyOld === 0 ? 'no' : ''
                  }`}
                >
                  {dataDifference > 0 ? '+' : '-'}
                  {((dataDifference / i?.qtyOld) * 100).toFixed(2)} %
                </span>{' '}
                {t('so với hôm trước')}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Difference;
