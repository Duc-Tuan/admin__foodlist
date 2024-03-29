import React from 'react';
import { useTranslation } from 'react-i18next';
import Icon from '../../assets/icon';
import { Button } from '../../components';
import { Chat } from '../chat';
import Header from '../header';
import Sliderbar from '../sliderbar/screen';
import './index.scss';
import { useSelector } from 'react-redux';
import { isSettingChat } from '../../pages/settings/store/select';
import { useHeader } from '../../hooks/common/useHeader';

import { accountSelect } from 'pages/login/store/select';
import { useAppDispatch, useToast } from 'hooks';
import { actions as actionsChat } from 'layouts/chat/store';

type Props = {
  children: React.ReactNode | string;
  isHeader?: boolean;
  title?: string;
  placeholder?: string;
  onChange?: (data: string) => void;
  isBack?: boolean;
  onClickBack?: () => void;
  reactNodeRight?: React.ReactNode[];
  filter?: React.ReactNode[];
  noBack?: boolean;
  isSearch?: boolean;
  isScroll?: boolean;
  isScrollX?: boolean;
};

const Index = (props: Props) => {
  const {
    children,
    isHeader = true,
    isSearch,
    title,
    placeholder,
    onChange,
    isBack = false,
    onClickBack,
    reactNodeRight,
    filter,
    noBack,
    isScroll,
    isScrollX,
  } = props;
  const { t } = useTranslation();
  const { isHeader: isSlidebar, isSubMenu } = useHeader();

  return (
    <div className="app__food d-flex">
      <section>
        <Sliderbar isSlidebar={isSlidebar} isSubMenu={isSubMenu} />
      </section>
      <main className={`main__app ${isHeader ? 'open' : 'off'}`}>
        <Header isHeader={isHeader} title={title} placeholder={placeholder} onChange={onChange} isSearch={isSearch} />
        <div className={`main__app--content ${!isScroll ? 'scroll__foodApp' : ''} ${!isScrollX ? 'scrollX' : ''}`}>
          {isBack && (
            <div className="header__main d-flex justify-content-between align-items-center gap-10 sticky">
              <div className="d-flex justify-content-start align-items-center gap-10">
                {!noBack && (
                  <Button color="nomal" onClick={onClickBack}>
                    <Icon name="icon-arrow-back" /> {t('Quay lại')}
                  </Button>
                )}
                {filter && (
                  <div className="d-flex justify-content-start align-items-center gap-10">
                    {filter?.map((i: React.ReactNode, idx: number) => <React.Fragment key={idx}>{i}</React.Fragment>)}
                  </div>
                )}
              </div>
              {reactNodeRight && (
                <div className="d-flex justify-content-end align-items-center gap-10">
                  {reactNodeRight?.map((i: React.ReactNode, idx: number) => (
                    <React.Fragment key={idx}>{i}</React.Fragment>
                  ))}
                </div>
              )}
            </div>
          )}
          <div className={`${!isBack ? 'mt-10' : ''}`}>{children}</div>
        </div>
      </main>
    </div>
  );
};

export default React.memo(Index);
