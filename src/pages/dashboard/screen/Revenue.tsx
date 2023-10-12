import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Exporting from 'highcharts/modules/exporting';
import { useTranslation } from 'react-i18next';
import { useHeader } from '../../../hooks/common/useHeader';
import { Loading } from '../../../components';
Exporting(Highcharts);

type Props = {
  optionsChartColumn?: any;
  title?: string;
  emty?: boolean;
};

const Revenue = (props: Props) => {
  const { optionsChartColumn, title, emty } = props;
  const { t } = useTranslation();
  const { isHeader } = useHeader();

  return (
    <div className={`wrapper__revenue ${isHeader ? 'active' : ''}`}>
      <div className="wrapper__revenue--filter d-flex justify-content-between align-items-center gap-10 sticky">
        <div className="name">{t(title ?? 'Tiêu đề')}</div>

        <div className="selected"></div>
      </div>

      <div className="highcharts">
        {!emty ? <Loading /> : <HighchartsReact highcharts={Highcharts} options={optionsChartColumn} />}
      </div>
    </div>
  );
};

export default Revenue;
