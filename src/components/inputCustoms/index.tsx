import React from 'react';
import './index.scss';
import Icon from '../../assets/icon';

type Props = {
  placeholder?: string;
  setFocused?: React.Dispatch<React.SetStateAction<boolean>>;
};

const InputCustom = (props: Props) => {
  const { placeholder = 'Tìm kiếm nhanh...', setFocused } = props;
  const [isFocused, setIsFocused] = React.useState<boolean>(false);

  React.useEffect(() => {
    setFocused && setFocused(isFocused);
  }, [isFocused]);

  return (
    <div className="wrapper__input d-flex justify-content-between align-items-center gap-8">
      <input
        type="text"
        placeholder={placeholder}
        onFocus={(e) => setIsFocused(e?.isTrusted)}
        onBlur={() => setIsFocused(false)}
      />
      <div className="iconSearch d-flex justify-content-center align-items-center">
        <Icon name="search" />
      </div>
    </div>
  );
};

export default InputCustom;
