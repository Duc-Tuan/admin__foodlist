import React from 'react';
import Icon from '../../assets/icon';
import useDebounce from '../../hooks/components/useDebounce';
import './index.scss';
import { useTranslation } from 'react-i18next';

type Props = {
  placeholder?: string;
  isFocused?: boolean;
  setFocused?: React.Dispatch<React.SetStateAction<boolean>>;
  classNameInput?: string;
  ref?: any;
  renderMenu: React.ReactNode;
  onChange?: (value: string) => void;
};

const SearchCustom = React.forwardRef((props: Props, ref: any) => {
  const { placeholder = 'Tìm kiếm nhanh...', setFocused, classNameInput, isFocused, renderMenu, onChange } = props;
  const [value, setValue] = React.useState<string>('');
  const refInput = React.useRef<any>();
  const { t } = useTranslation();

  const valueDebounce = useDebounce(value, 300);

  React.useEffect(() => {
    onChange && onChange(valueDebounce);
  }, [valueDebounce]);

  return (
    // <Tippy
    //   placement="bottom-start"
    //   content={isCallBack ? <div style={{ color: 'var(--black-color)' }}>Đang tìm kiếm...</div> : renderMenu}
    //   theme="light"
    //   arrow={false}
    //   visible={isFocused}
    //   className="wrapper__menu--search"
    //   int
    //   appendTo={document.body}eractive={true}
    // >
    <div className="wrapper__input d-flex justify-content-between align-items-center gap-8" ref={ref}>
      <input
        ref={refInput}
        type="text"
        placeholder={t(placeholder)}
        onFocus={(e) => {
          setFocused && setFocused(e?.isTrusted);
        }}
        onChange={(e) => {
          setValue(e?.target?.value);
        }}
        value={value}
        className={classNameInput}
      />

      {value !== '' && (
        <div
          className="icon__clear d-flex justify-content-center align-items-center"
          onClick={() => {
            isFocused && refInput?.current?.focus();
            setValue('');
          }}
        >
          <Icon name="times-circle" />
        </div>
      )}

      <div className="iconSearch d-flex justify-content-center align-items-center">
        <Icon name="search" />
      </div>

      {isFocused && <div className="wrapper__menu--search">{renderMenu}</div>}
    </div>
    // </Tippy>
  );
});

export default React.memo(SearchCustom);
