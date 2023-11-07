import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Selector } from '../../../../components';
import { PATHNAME } from '../../../../configs/pathname';
import { useAppDispatch } from '../../../../hooks';
import { DefaultLayout } from '../../../../layouts';
import { Option } from '../../../../types/general';
import { actions as actionsLanguage } from '../../store';
import { language } from '../../store/select';
import { dataLanguage } from './const';
import './index.scss';

type Props = {};

const ScreenLanguage = (props: Props) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const isLanguage = useSelector(language);

  return (
    <DefaultLayout
      title="Thiết lập ngôn ngữ hệ thống"
      isSearch
      isBack
      onClickBack={() => navigate(PATHNAME.SCREENSETTINGS)}
    >
      <div className="wrapper__settingLanguage compont mt-2 d-flex justify-content-start align-items-center">
        <div className="describe p-10">
          <div className="title">{t('Ngôn ngữ')}</div>
          <div className="sub">{t('Thiết lập chức năng chuyển đổi ngôn ngữ của hệ thống')}</div>
        </div>
        <div className="detail p-10">
          <div className="d-flex justify-content-between align-items-center gap-10">
            <h4>{t('Chọn ngôn ngữ')}</h4>
            <Selector
              placeholder={String(isLanguage?.label)}
              options={dataLanguage}
              onChange={(e: Option) => {
                dispatch(actionsLanguage.setLanguage({ language: e }));
              }}
            />
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ScreenLanguage;
