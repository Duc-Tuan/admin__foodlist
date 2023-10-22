import React from 'react';
import './index.scss';
import { useTranslation } from 'react-i18next';
import Icon from '../../assets/icon';
import { useBoolean } from '../../hooks';

type Props = {
  label?: string;
  placeholder?: string;
  errors?: boolean;
  required?: boolean;
  messErrors?: string;
  value?: string;
  inputProps?: any;
  type?: 'text' | 'password';
};

const InputComp = (props: Props) => {
  const {
    label,
    placeholder = 'Nhập vào...',
    errors,
    messErrors = 'Không được để trống trường này.',
    inputProps,
    required,
    value,
    type = 'text',
  } = props;
  const [showPassword, { on, off, toggle }] = useBoolean();
  const [focus, setFocus] = React.useState<boolean>(false);

  const { t } = useTranslation();

  return (
    <div className="wrapper__inputFoodApp d-flex justify-content-end align-items-start flex-column gap-2 w-100">
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
          placeholder={label ? '' : t(placeholder)}
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

export default InputComp;
