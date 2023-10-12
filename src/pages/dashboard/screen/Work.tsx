import React from 'react';
import { Loading } from '../../../components';
import { useTranslation } from 'react-i18next';

type Props = {};

const Work = (props: Props) => {
  const { t } = useTranslation();
  return (
    <div className="wrapper__work">
      <div className="wrapper__work--filter d-flex justify-content-between align-items-center gap-10 sticky">
        <div className="name">{t('Hoạt động')}</div>

        <div className="view__all">{t('Xem thêm')}</div>
      </div>

      <div className="work">
        <Loading />
      </div>
    </div>
  );
};

export default Work;
