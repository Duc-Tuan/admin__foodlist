import React from 'react';
import './index.scss';
import Icon from '../../assets/icon';
import Tippy from '@tippyjs/react';
import Menu from './menu';

type Props = {
  placeholder?: string;
  isFocused?: boolean;
  setFocused?: React.Dispatch<React.SetStateAction<boolean>>;
  classNameInput?: string;
};

const SearchCustom = (props: Props) => {
  const { placeholder = 'Tìm kiếm nhanh...', setFocused, classNameInput, isFocused } = props;
  const [value, setValue] = React.useState<string>('');
  const refInput = React.useRef<any>();

  return (
    <Tippy
      placement="bottom-start"
      content={<Menu data={[]} />}
      theme="light"
      arrow={false}
      visible={isFocused}
      className="wrapper__menu--search"
      interactive={true}
    >
      <div className="wrapper__input d-flex justify-content-between align-items-center gap-8">
        <input
          ref={refInput}
          type="text"
          placeholder={placeholder}
          onFocus={(e) => {
            setFocused && setFocused(e?.isTrusted);
          }}
          onChange={(e) => setValue(e?.target?.value)}
          value={value}
          className={classNameInput}
        />

        {value !== '' && (
          <div
            className="icon__clear d-flex justify-content-center align-items-center"
            onClick={() => {
              refInput?.current?.focus();
              setValue('');
            }}
          >
            <Icon name="times-circle" />
          </div>
        )}

        <div className="iconSearch d-flex justify-content-center align-items-center">
          <Icon name="search" />
        </div>
      </div>
    </Tippy>
  );
};

export default SearchCustom;
