import React from 'react';
import { DefaultLayout } from '../../../../layouts';
import './index.scss';
import { useNavigate } from 'react-router-dom';
import { PATHNAME } from '../../../../configs/pathname';
import { useTranslation } from 'react-i18next';
import Icon from 'assets/icon';
import { Button } from 'components';
import OrderPrintForm from './components/order/OrderPrintForm';
import { dataFormDefalut } from './form';
import { useReactToPrint } from 'react-to-print';

type Props = {};

const ScreenPrint = (props: Props) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const refPrintTest = React.useRef<any>();
  const [editHTML, setEditHTML] = React.useState<string>(dataFormDefalut);
  const [printTest, setPrintTest] = React.useState<{
    type: string;
    status: boolean;
  }>({
    type: 'stock_adjustment',
    status: false,
  });

  const handlePrint = useReactToPrint({
    content: () => refPrintTest?.current,
    onAfterPrint: () => {
      setPrintTest({
        type: 'order',
        status: false,
      });
    },
  });

  return (
    <DefaultLayout title="Thiết lập mẫu phiếu in" isSearch isBack onClickBack={() => navigate(PATHNAME.SCREENSETTINGS)}>
      <div className="wrapper__settingPrint compont d-flex justify-content-start align-items-center">
        <div className="describe p-10">
          <div className="title">{t('Mẫu in')}</div>
          <div className="sub">{t('Thiết lập & tùy chỉnh các mẫu in mặc định của phiếu')}</div>
        </div>
        <div className="detail">
          <div className="m-10 d-flex justify-content-start align-items-start">
            <div className="edit w-100 flex-fill">
              <div className="header__print">
                {t('Mẫu in')}
                <div className="icon">
                  <Button color="primary">
                    <Icon name="icon-pencil" />
                    {t('Sửa')}
                  </Button>
                </div>
              </div>

              <div className="main scroll__foodApp">
                <OrderPrintForm size={'K80'} html={editHTML} isDefaultView />
              </div>
            </div>
            <div className="view w-100 flex-fill">
              <div className="header__print">
                {t('Bản xem trước')}
                <div className="icon">
                  <Button color="primary" onClick={handlePrint}>
                    <Icon name="v2-print" />
                    {t('In thử')}
                  </Button>
                </div>
              </div>

              <div className="main">
                <OrderPrintForm size={'K80'} html={editHTML} isTest ref={refPrintTest}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ScreenPrint;
