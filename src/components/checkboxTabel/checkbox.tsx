import React from 'react';
import './checkbox.scss';
import Icon from '../../assets/icon';

interface CheckboxProps {
  label?: string | number;
  checked?: boolean;
  indeterminate?: boolean;
  onChange?: any;
  onClick?: any;
  className?: string;
  disabled?: boolean;
  styles?: React.CSSProperties;
}

export default function Checkbox(props: CheckboxProps) {
  const { label, checked, indeterminate, onChange, onClick, className, disabled, styles } = props;
  return (
    <div
      className={`foodApp-checkbox${className ? ` ${className}` : ''}${label ? '' : ' isofh-checkbox__no-label'}${
        checked ? ' on-checked' : ''
      } ${disabled ? 'has-disabled' : ''} ${indeterminate ? ' on-indeterminate' : ''}
    `}
      style={{ ...styles }}
    >
      <label onClick={onClick}>
        <input type="checkbox" onChange={onChange} checked={checked} disabled={disabled} />
        <span className="checkmark">
          <Icon name="icon-interminate" className="minus" />
          <Icon name="checked" className="check" />
        </span>
        {label || null}
      </label>
    </div>
  );
}
