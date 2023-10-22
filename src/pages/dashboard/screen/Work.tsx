import React from 'react';
import { Loading } from '../../../components';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { PATHNAME } from '../../../configs/pathname';

type Props = {};

const Work = (props: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className="wrapper__work">
      <div className="wrapper__work--filter d-flex justify-content-between align-items-center gap-10 sticky">
        <div className="name">{t('Hoạt động')}</div>

        <div className="view__all" onClick={() => navigate(PATHNAME.SCREENWORK)}>
          {t('Xem thêm')}
        </div>
      </div>

      <div className="work">
        <Loading />
      </div>
    </div>
  );
};

export default Work;
