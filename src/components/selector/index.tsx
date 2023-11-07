import React from 'react';
import Icon from '../../assets/icon';
import { useBoolean, useClickOutSide } from '../../hooks';
import { Option } from '../../types/general';
import { WrapTooltip } from '../wrapTooltip/WrapTooltip';
import Menu from './Menu';
import './index.scss';
import { useTranslation } from 'react-i18next';

type Props = {
  options: Option[];
  placeholder?: string;
  onChange?: (data: any) => void;
};

const Selector = (props: Props) => {
  const { options, placeholder, onChange } = props;
  const { t } = useTranslation();
  const [isOpen, { on, off, toggle }] = useBoolean();
  const ref = React.useRef<any>();
  const [value, setValue] = React.useState<Option>();
  useClickOutSide(ref, off);

  React.useEffect(() => {
    const findData = options.find((i: Option) => i?.label === placeholder);
    setValue(findData);
  }, []);

  const renderTitle: () => JSX.Element = () => {
    return <WrapTooltip data={t(String(value?.label ?? placeholder ?? 'Chọn ngay'))} length={26} />;
  };

  return (
    <div className="select__foodApp" ref={ref}>
      <div className="select__foodApp--value d-flex justify-content-between align-items-center gap-10" onClick={toggle}>
        <div className="value">{renderTitle()}</div>

        <div className={`icon ${isOpen ? 'active' : ''}`}>
          <Icon name="chevron-down" />
        </div>
      </div>

      {isOpen && (
        <Menu
          data={options}
          setValue={(data: Option) => {
            onChange && onChange(data);
            setValue(data);
          }}
          value={value}
          hidden={off}
        />
      )}
    </div>
  );
};

export default Selector;
