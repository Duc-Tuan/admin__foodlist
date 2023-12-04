import React from 'react';
import { useTranslation } from 'react-i18next';
import Icon from '../../assets/icon';
import { Button } from '../../components';
import { Chat } from '../chat';
import Header from '../header';
import Sliderbar from '../sliderbar/screen';
import './index.scss';
import { useSelector } from 'react-redux';
import { isChat } from '../../pages/settings/store/select';
import { useHeader } from '../../hooks/common/useHeader';

import { io } from 'socket.io-client';
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
  const showChat = useSelector(isChat);
  const dataUserRedux = useSelector(accountSelect);
  const { isHeader: isSlidebar, isSubMenu } = useHeader();
  const [socket, setSocket] = React.useState<any>(null);
  const toast = useToast();
  const dispath = useAppDispatch();

  React.useEffect(() => {
    const newSocket = io('http://localhost:3036');
    setSocket(newSocket);
    dispath(actionsChat.setSocketChat({ socket: newSocket }));
    return () => {
      newSocket?.disconnect();
    };
  }, []);

  React.useEffect(() => {
    socket?.emit('client_send-merchant', { data: { value: '', idMerchant: '650bbb2315c0e10c0ed839d9' } });
    // socket?.emit('client_send', { data: { id: dataUserRedux?._id, type: 'server' } });
  }, [socket, dataUserRedux?._id]);

  React.useEffect(() => {
    socket?.on('admin_merchant', (data: any) => toast(data?.value, 'success'));
  }, [socket]);

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

      {showChat && (
        <div className="wrapper__chat">
          <Chat />
        </div>
      )}
    </div>
  );
};

export default Index;
