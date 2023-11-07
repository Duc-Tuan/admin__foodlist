import React from 'react';
import './switch.scss';

interface SwitchProps {
  id?: string;
  name?: string;
  className?: string;
  onChange?: any;
  checked?: boolean;
  onClick?: any;
  disabled?: boolean;
}

export default function Switch(props: SwitchProps) {
  const { checked, id, onChange, name, onClick, disabled } = props;
  return (
    <div className={`isofh-switch ${disabled ? 'disable' : ''}`}>
      <label onClick={onClick}>
        <input id={id} type="checkbox" onChange={onChange} checked={checked} name={name} />
        <span className="slider" />
      </label>
    </div>
  );
}
