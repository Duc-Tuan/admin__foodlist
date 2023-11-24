import React from 'react';
import './index.scss';
import { useTranslation } from 'react-i18next';
import { useBoolean } from '../../hooks';
import Icon from '../../assets/icon';

type Props = {
  label?: string;
  placeholder?: string;
  errors?: boolean;
  required?: boolean;
  messErrors?: string;
  value?: string;
  inputProps?: any;
  type?: 'text' | 'password';
  classNameWrapper?: string;
};

const Index = (props: Props) => {
  const {
    label,
    placeholder = '',
    errors,
    inputProps,
    messErrors = 'Trường này không được để trống!',
    required,
    type,
    value,
    classNameWrapper
  } = props;
  const [showPassword, { on, off, toggle }] = useBoolean();
  const { t } = useTranslation();

  return (
    <div className={`wrapper__inputComp d-flex justify-content-end align-items-start flex-column gap-2 w-100 ${classNameWrapper}`}>
      <div className={`input w-100 ${value !== '' ? 'active' : ''}`}>
        {label && (
          <label className={`${value !== '' ? 'active' : ''}`}>
            {t(label)}{' '}
            {required && (
              <span>
                (<span className="required">*</span>)
              </span>
            )}
          </label>
        )}
        <input
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
          placeholder={t(placeholder)}
          {...inputProps}
        />
        {type === 'password' && (
          <div className="eye" onClick={toggle}>
            {showPassword ? <Icon name="icon-eye" /> : <Icon name="icon-eye-slash" />}
          </div>
        )}
      </div>

      {errors && <span className="mess__error">{t(messErrors)}</span>}
    </div>
  );
};

export default Index;
