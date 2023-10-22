import React from 'react';
import { useTranslation } from 'react-i18next';
import './index.scss';

type Props = {
  label?: string;
};

const CheckBox = (props: Props) => {
  const { label } = props;
  const { t } = useTranslation();
  return (
    <div className="wrapper__checkBox d-flex justify-content-start align-items-center">
      <input type="checkbox" id="checkBox" name="checkBox" />
      {label && <label htmlFor="checkBox">{t(label)}</label>}
    </div>
  );
};

export default CheckBox;
