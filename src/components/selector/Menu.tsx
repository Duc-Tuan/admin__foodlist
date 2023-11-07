import React from 'react';
import { Option } from '../../types/general';
import { WrapTooltip } from '../wrapTooltip/WrapTooltip';
import { useTranslation } from 'react-i18next';

type Props = {
  data: Option[];
  hidden?: () => void;
  value?: Option;
  setValue: (data: Option) => void;
};

const Menu = (props: Props) => {
  const { data, setValue, value, hidden } = props;
  const { t } = useTranslation();
  return (
    <div className="select__foodApp--menu">
      {data?.map((i: Option, idx: number) => (
        <div
          className={`select__foodApp--menu_item ${value?.value === i?.value ? 'active' : ''}`}
          key={idx}
          onClick={() => {
            hidden && hidden();
            setValue(i);
          }}
        >
          <WrapTooltip data={t(String(i?.label))} length={20} />
        </div>
      ))}
    </div>
  );
};

export default Menu;
