import React from 'react';
import { Option } from '../../types/general';
import { WrapTooltip } from '../wrapTooltip/WrapTooltip';

type Props = {
  data: Option[];
  hidden?: () => void;
  value?: Option;
  setValue: React.Dispatch<React.SetStateAction<Option | undefined>>;
};

const Menu = (props: Props) => {
  const { data, setValue, value, hidden } = props;
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
          <WrapTooltip data={String(i?.label)} length={20} />
        </div>
      ))}
    </div>
  );
};

export default Menu;
