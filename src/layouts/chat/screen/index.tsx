import Tippy from '@tippyjs/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import Icon from '../../../assets/icon';
import NoMess from '../../../assets/images/no-messager.png';
import { WrapTooltip } from '../../../components/wrapTooltip/WrapTooltip';
import { useAppDispatch, useBoolean } from '../../../hooks';
import useDebounce from '../../../hooks/components/useDebounce';
import { actions as actionsChat } from '../store';
import { isShow, selected } from '../store/select';
import {
  IMessager,
  ISelectUser,
  dataUser,
  dataUserChat,
  dateTimeMess,
  fakeDataMessage,
  fakeDataMessage2,
} from './const';
import './index.scss';
import dayjs from 'dayjs';
import { cloneDeep } from 'lodash';
import { Loading, LoadingDots } from '../../../components';
import Images from '../../../components/image';

const Chat = () => {
  const { t } = useTranslation();
  const showChat = useSelector(isShow);
  const refChat = React.useRef<any>();
  const dispatch = useAppDispatch();
  const selectedUser = useSelector(selected);
  const [isShowChat, { on, off, toggle }] = useBoolean(showChat);
  const [dataMessage, setDataMessage] = React.useState<IMessager[]>(fakeDataMessage);
  const [selectUser, setSelectUser] = React.useState<ISelectUser | undefined>(selectedUser);
  const [value, setValue] = React.useState<string>('');
  let dateTimeMessRef = React.useRef() as React.MutableRefObject<string>;
  const [isFetching, setIsFetching] = React.useState(false);
  const [isScrollBottom, setScrollBottom] = React.useState<boolean>(false);

  React.useEffect(() => {
    refChat?.current?.scrollTo({ top: refChat?.current?.scrollHeight });
  }, [selectUser?.id]);

  React.useEffect(() => {
    dataMessage?.length > 11 && refChat?.current?.scrollTo({ top: 60, behavior: 'smooth' });
  }, [JSON.stringify(dataMessage)]);

  function handleScroll() {
    if (refChat?.current?.scrollTop < refChat?.current?.scrollHeight - 374) {
      setScrollBottom(true);
    } else {
      setScrollBottom(false);
    }
    if (refChat?.current?.scrollTop === 0) return setIsFetching(true);
  }

  React.useEffect(() => {
    refChat?.current?.addEventListener('scroll', handleScroll);
    return () => refChat?.current?.removeEventListener('scroll', handleScroll);
  }, [selectUser?.id]);

  React.useEffect(() => {
    let fakeCallApi: any;
    if (isFetching) {
      fakeCallApi = setTimeout(() => {
        const dataOld = cloneDeep(dataMessage);
        dataOld.unshift(...fakeDataMessage2);
        setDataMessage(dataOld);
        setIsFetching(false);
      }, 1000);
    }
    return () => {
      isFetching && clearTimeout(fakeCallApi);
    };
  }, [isFetching, dataMessage]);

  const valueDebounce = useDebounce(value, 300);

  React.useEffect(() => {
    dispatch(actionsChat.setChat({ isShow: isShowChat }));
  }, [isShowChat]);

  return (
    <div className="wrapper_compChat">
      <div className="icon" onClick={toggle}>
        <Icon name="icon-chat" />
      </div>

      {isShowChat && (
        <div className="main__chat">
          <div className="header__chat d-flex justify-content-between align-items-center gap-10">
            <div className="header__chat--notifi-qty">{t('Tin nhắn')} (09)</div>
            <div className="right d-flex justify-content-end align-items-center gap-4">
              <div className="user__chat  d-flex justify-content-start align-items-end gap-4">
                <div className="title">{t('Đang chat bằng')}: </div>
                <div className="name-user d-flex justify-content-start align-items-end gap-4">
                  <div className="icon-user">
                    <Icon name="customer-nav" />
                  </div>
                  <div className="name">
                    <WrapTooltip data={'Mr.Tuan'} length={20} />
                  </div>
                </div>
              </div>

              <Tippy content={t('Thu nhỏ chat')}>
                <div className="icon__zoomChat" onClick={off}>
                  <Icon name="icon-zoom-chat" />
                </div>
              </Tippy>

              <Tippy content={t('Mở chat')}>
                <div className="icon__openChat">
                  <Icon name="icon-open-chat" />
                </div>
              </Tippy>
            </div>
          </div>

          <div className="bottom__chat d-flex justify-content-start align-items-start">
            <div className="bottom__chat--left scroll__foodApp d-flex justify-content-start align-items-start flex-column gap-4">
              {dataUserChat?.map((i: ISelectUser, idx: number) => (
                <div
                  key={idx}
                  className={`left__content d-flex justify-content-start align-items-start gap-8 p-6 w-100 ${
                    selectUser?.id === i?.id ? 'active' : ''
                  }`}
                  onClick={() => {
                    dispatch(actionsChat.setSelected({ selected: i }));
                    setSelectUser(i);
                  }}
                >
                  <div className="avatar">
                    <Images alt={i?.name} url={i?.image} />
                  </div>
                  <div className="info">
                    <div className="d-flex justify-content-between align-items-center gap-4">
                      <div className="name">
                        <WrapTooltip data={i?.name} length={14} />
                      </div>
                      <div className="time">{t(dateTimeMess(i?.date))}</div>
                    </div>

                    <div className="content__chat">
                      <div className="trunc-one-line">{i?.contentNew}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bottom__chat--right">
              {selectUser ? (
                <>
                  <div className="title__user">
                    <WrapTooltip data={selectUser?.name} length={50} />
                  </div>
                  <div className="content d-flex justify-content-between align-items-center flex-column">
                    <div
                      className="show scroll__foodApp d-flex justify-content-start gap-10 flex-column w-100"
                      ref={refChat}
                    >
                      {isFetching && <LoadingDots />}
                      {dataMessage?.map((i: IMessager, idx: number) => {
                        let flag: boolean = false;

                        if (dateTimeMess(i?.date) !== dateTimeMessRef.current) {
                          if (dayjs().isSame(i?.date, 'day')) {
                            dateTimeMessRef.current = 'Hôm nay';
                          } else if (dayjs(i?.date).isSame(dayjs().subtract(1, 'day'), 'day')) {
                            dateTimeMessRef.current = 'Hôm qua';
                          } else {
                            dateTimeMessRef.current = dayjs(i?.date).format('DD/MM/YYYY') as string;
                          }
                          flag = true;
                        } else {
                          if (idx === 0) flag = true;
                        }

                        return (
                          <React.Fragment key={idx}>
                            {dateTimeMessRef?.current && flag && (
                              <div className="date--notifi d-flex justify-content-center align-items-center">
                                <span>{t(dateTimeMessRef?.current)}</span>
                              </div>
                            )}
                            <div
                              className={`show__messager d-flex align-items-center ${
                                i?.senderId === dataUser?.id
                                  ? 'sender justify-content-end'
                                  : 'receiver justify-content-start'
                              } `}
                            >
                              <div className="d-flex justify-content-start flex-column ">
                                <div className="mess">{i?.content}</div>
                                <div className="time">{dayjs(i?.date).format('HH:mm')}</div>
                              </div>
                            </div>
                          </React.Fragment>
                        );
                      })}
                    </div>
                    <div className="send w-100 d-flex justify-content-start align-items-center gap-2">
                      <input
                        type="text"
                        placeholder={t('Nhập nội dung tin nhắn...')}
                        className="w-100"
                        onChange={(e: any) => setValue(e?.target?.value)}
                        value={value}
                      />
                      {value !== '' && (
                        <div className="icon__clear" onClick={() => setValue('')}>
                          <Icon name="times-circle" />
                        </div>
                      )}
                      <div
                        className={`icon d-flex justify-content-center align-items-center ${
                          value !== '' ? 'active' : ''
                        }`}
                      >
                        <Icon name="icon-send-chat" />
                      </div>
                    </div>
                    {isScrollBottom && (
                      <div
                        className="scroll--bottom d-flex justify-content-center align-items-center"
                        onClick={() =>
                          refChat?.current?.scrollTo({ top: refChat?.current?.scrollHeight, behavior: 'smooth' })
                        }
                      >
                        <Icon name="detail-down" />
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <img src={NoMess} alt="images" />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
