import React from 'react';
import { useTranslation } from 'react-i18next';
import './index.scss';

type Props = {
  label?: string;
  value?: boolean;
};

const Index = (props: Props) => {
  const { t } = useTranslation();
  const { label = 'Chọn ngay', value } = props;
  return (
    <div className="wrapper__radio d-flex justify-content-start align-itmes-center gap-6">
      <span></span>
      <label className="flex-fill">{t(label)}</label>
    </div>
  );
};

export default Index;
