import Tippy from '@tippyjs/react';
import React from 'react';
import * as axiosInstance from '../../../store/axios';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import Icon from '../../../assets/icon';
import NoMess from '../../../assets/images/no-messager.png';
import { WrapTooltip } from '../../../components/wrapTooltip/WrapTooltip';
import { useAppDispatch, useBoolean, useToast } from '../../../hooks';
import useDebounce from '../../../hooks/components/useDebounce';
import { actions as actionsChat } from '../store';
import { selected } from '../store/select';
import {
  IMessager,
  ISelectUser,
  dataUser,
  dataUserChat,
  dateTimeMess,
  fakeDataMessage,
  fakeDataMessage2,
  uploadFile,
} from './const';
import './index.scss';
import dayjs from 'dayjs';
import { cloneDeep } from 'lodash';
import { Loading, LoadingDots } from '../../../components';
import Images from '../../../components/image';

import { accountSelect } from 'pages/login/store/select';
import { isSettingChat } from 'pages/settings/store/select';
import { useLocation } from 'react-router-dom';
import { PATHNAME } from 'configs/pathname';
import { inValidFileImage, inValidateSizeFile } from 'utils';
import SelectImage from './SelectImage';

const Chat = ({ socket }: any) => {
  const { t } = useTranslation();
  const url = useLocation();
  const toast = useToast();
  const refImageScroll = React.useRef<any>();
  const refFile = React.useRef<any>();
  const refInput = React.useRef<any>();
  const showChat = useSelector(isSettingChat);
  const dataUserRedux = useSelector(accountSelect);
  const refChat = React.useRef<any>();
  const dispatch = useAppDispatch();
  const selectedUser = useSelector(selected);
  const [isShowChat, { on, off, toggle }] = useBoolean();
  const [dataMessage, setDataMessage] = React.useState<IMessager[]>(fakeDataMessage);
  const [selectUser, setSelectUser] = React.useState<ISelectUser | undefined>(selectedUser);
  const [value, setValue] = React.useState<string>('');
  let dateTimeMessRef = React.useRef() as React.MutableRefObject<string>;
  const [isFetching, setIsFetching] = React.useState(false);
  const [isScrollBottom, setScrollBottom] = React.useState<boolean>(false);

  const [isScroll, setIsScroll] = React.useState(true);
  const [dataSocket, setDataSocket] = React.useState<any>();

  const [dataScreen, setDataScreen] = React.useState<any[]>([]);

  const [imageSend, setImageSend] = React.useState<uploadFile[]>([]);
  const refImageIndex = React.useRef<number>(imageSend?.length);

  React.useEffect(() => {
    refInput.current?.focus();
    refChat?.current?.addEventListener('scroll', handleScroll);
    refChat?.current?.scrollTo({ top: refChat?.current?.scrollHeight });
    setDataSocket(undefined);

    return () => refChat?.current?.removeEventListener('scroll', handleScroll);
  }, [selectUser?.id]);

  React.useEffect(() => {
    !isScroll && dataMessage?.length > 11 && refChat?.current?.scrollTo({ top: 60, behavior: 'smooth' });
  }, [JSON.stringify(dataMessage)]);

  function handleScroll() {
    if (refChat?.current?.scrollTop < refChat?.current?.scrollHeight - 574) {
      setScrollBottom(true);
    } else {
      setScrollBottom(false);
    }
    if (refChat?.current?.scrollTop === 0) return setIsFetching(true);
  }

  React.useEffect(() => {
    const setTime = setTimeout(() => {
      isScroll && refChat?.current?.scrollTo({ top: refChat?.current?.scrollHeight, behavior: 'smooth' });
    }, 100);

    return () => {
      clearTimeout(setTime);
    };
  }, [dataMessage]);

  React.useEffect(() => {
    let fakeCallApi: any;
    if (isFetching) {
      fakeCallApi = setTimeout(() => {
        const dataOld = cloneDeep(dataMessage);
        dataOld.unshift(...fakeDataMessage2);
        setDataMessage(dataOld);
        setIsFetching(false);
        setIsScroll(false);
      }, 1000);
    }
    return () => {
      isFetching && clearTimeout(fakeCallApi);
    };
  }, [isFetching, dataMessage]);

  React.useEffect(() => {
    socket?.on('server_send', (data: any) => {
      setDataSocket(data);
    });
    socket?.on('admin_merchant', (data: any) => {
      setDataSocket(data);
    });
  }, [socket]);

  const socketEmit = (id?: string | number, valueDefault?: string) => {
    const dataSend: IMessager = {
      content: valueDefault ?? undefined,
      date: new Date().toString(),
      zoom: id,
      receiverId: id,
      senderId: '650bbb2315c0e10c0ed839d9',
      screen: false,
    };

    socket?.emit('client_send', dataSend);
  };

  const handleSend = () => {
    if (value !== '') {
      socketEmit(selectUser?.id, value);
      setValue('');
      setIsScroll(true);
    }
    refInput.current?.focus();
  };

  const valueSocketDebouce = useDebounce(dataSocket, 100);

  React.useEffect(() => {
    valueSocketDebouce?.content !== undefined && setDataMessage((prev) => [...prev, valueSocketDebouce]);

    if (!isShowChat && valueSocketDebouce !== undefined) {
      valueSocketDebouce?.content !== undefined && setDataScreen((prev) => [...prev, valueSocketDebouce]);
    } else {
      valueSocketDebouce?.zoom !== selectUser?.id &&
        valueSocketDebouce?.zoom !== '650bbb2315c0e10c0ed839d9' &&
        valueSocketDebouce?.content !== undefined &&
        setDataScreen((prev) => [...prev, valueSocketDebouce]);
    }

    return () => {
      setDataSocket(undefined);
    };
  }, [valueSocketDebouce, selectUser]);

  const handleClearNotifi = () => {
    const dataNew = cloneDeep(dataScreen);
    // const dataMess = cloneDeep(dataMessage);
    // const dataFilter = dataMess?.filter((i: IMessager) => i?.senderId === selectUser?.id);
    // dataFilter?.map((i: IMessager) => {
    //   if (!i?.screen) i.screen = true;
    //   return i;
    // });
    // setDataMessage([...dataMess]);

    if (isShowChat && dataNew?.length !== 0) {
      const dataAfter = dataNew?.filter((i: any) => i?.zoom !== selectUser?.id);
      setDataScreen(dataAfter);
    }
  };

  React.useEffect(() => {
    if (imageSend?.length !== 0) {
      refImageIndex.current = Math.max(...imageSend?.map((i: uploadFile) => i?.id));
    }

    if (imageSend?.length > 5) {
      const setTime = setTimeout(() => {
        refImageScroll.current.scrollLeft += refImageScroll.current?.scrollWidth;
      }, 100);
      return () => clearTimeout(setTime);
    }
  }, [refImageScroll, imageSend]);

  const uploadImage = (e: any) => {
    const { target } = e;
    const getFile = target?.files?.item(0);
    if (!getFile) return;
    if (!inValidFileImage(e)) {
      return toast('Loại file upload không hợp lệ!', 'error');
    }
    if (!inValidateSizeFile(getFile)) {
      return toast('Không được upload file lớn hơn 5MB!', 'error');
    }
    if (e.target.files[0]) {
      const reader: any = new FileReader();
      reader.addEventListener('load', () => {
        setImageSend((prev) => [
          ...prev,
          { id: refImageIndex.current + 1, file: e.target.files[0], url: reader.result.toString() },
        ]);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const clearImageSend = () => {
    setImageSend([]);
  };

  const handleRemove = (id: number) => {
    const dataNew = cloneDeep(imageSend);
    const dataRemove = dataNew?.filter((i: uploadFile) => i?.id !== id);
    setImageSend(dataRemove);
  }

  return showChat && !(url?.pathname === PATHNAME.SCREENSALESCOUNTER) ? (
    <div className="wrapper_compChat">
      <div className="icon" onClick={toggle}>
        <Icon name="icon-chat" />

        {dataScreen?.length !== 0 && (
          <div className="notifiMess d-flex justify-content-center align-items-center">
            {dataScreen?.length > 99 ? '+99' : dataScreen?.length}
          </div>
        )}
      </div>

      {isShowChat && (
        <div className="main__chat">
          <div className="header__chat d-flex justify-content-between align-items-center gap-10">
            <div className="header__chat--notifi-qty">
              {t('Tin nhắn')} (
              {dataScreen?.length > 10
                ? dataScreen?.length > 99
                  ? '+99'
                  : dataScreen?.length
                : `0${dataScreen?.length}`}
              )
            </div>
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
              {dataUserChat?.map((i: ISelectUser, idx: number) => {
                const dataMess = dataScreen?.filter((d: any) => d?.zoom === i?.id);
                const dataMessScreen = dataMessage?.filter((f: any) => f?.zoom === i.id && f?.senderId === i.id);
                return (
                  <div
                    key={idx}
                    className={`left__content d-flex justify-content-start align-items-start gap-8 p-6 w-100 ${
                      selectUser?.id === i?.id ? 'active' : ''
                    }`}
                    onClick={() => {
                      dispatch(actionsChat.setSelected({ selected: i }));
                      setSelectUser(i);
                      socketEmit(i?.id);
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
                        <div className="time">{t(dateTimeMess(dataMess[dataMess?.length - 1]?.date))}</div>
                      </div>

                      <div className="content__chat">
                        <div className="trunc-one-line">
                          {dataMess[dataMess?.length - 1]?.content ??
                            dataMessScreen[dataMessScreen?.length - 1]?.content}
                        </div>
                      </div>
                    </div>
                    {dataMess?.length !== 0 && (
                      <div className="notifi d-flex justify-content-center align-items-center">
                        {dataMess?.length > 99 ? '+99' : dataMess?.length}
                      </div>
                    )}
                  </div>
                );
              })}
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
                      {dataMessage
                        ?.filter((f: any) => f?.zoom === selectUser.id)
                        ?.map((i: IMessager, idx: number) => {
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
                              <div className="">
                                <div
                                  className={`show__messager d-flex align-items-center ${
                                    i?.receiverId === selectUser?.id
                                      ? 'sender justify-content-end'
                                      : 'receiver justify-content-start'
                                  } `}
                                >
                                  <div className="d-flex justify-content-start flex-column ">
                                    <div className="mess">{i?.content}</div>
                                    <div className="time">{dayjs(i?.date).format('HH:mm')}</div>
                                  </div>
                                </div>
                                {/* {i?.screen && i?.senderId !== selectUser.id && (
                                  <div className="mt-1 d-flex justify-content-end align-items-center">
                                    <div className="user__screen">
                                      <Tippy
                                        appendTo={document.body}
                                        content={
                                          <span
                                            className="trunc-one-line"
                                            style={{ wordBreak: 'break-word', maxWidth: '20rem' }}
                                          >
                                            Mr.Tuan
                                          </span>
                                        }
                                      >
                                        <img src="https://imgupscaler.com/images/samples/animal-before.webp" alt="" />
                                      </Tippy>
                                    </div>
                                  </div>
                                )} */}
                              </div>
                            </React.Fragment>
                          );
                        })}
                    </div>
                    <div className="w-100">
                      {imageSend?.length !== 0 && (
                        <SelectImage
                          data={imageSend}
                          clearImageSend={clearImageSend}
                          uploadImage={() => refFile.current.click()}
                          handleRemove={handleRemove}
                          ref={refImageScroll}
                        />
                      )}
                      <div className="send w-100 d-flex justify-content-start align-items-center gap-2">
                        <div className="d-flex justify-content-start align-items-center flex-fill">
                          <div className="more">
                            <Tippy
                              interactive={true}
                              appendTo={document.body}
                              content={
                                <div className="menu__chat d-flex justify-content-start align-items-center gap-10">
                                  <div className="icon" onClick={() => refFile.current.click()}>
                                    <Icon name="icon-image" />
                                  </div>
                                  <div className="icon">
                                    <Icon name="order-nav" />
                                  </div>
                                </div>
                              }
                              trigger="click"
                              theme="light"
                              className="wrapper__morechat"
                            >
                              <div className="icon__more">
                                <Icon name="more-options" />
                              </div>
                            </Tippy>
                          </div>
                          <input
                            type="text"
                            placeholder={t('Nhập nội dung tin nhắn...')}
                            className="w-100"
                            onChange={(e: any) => setValue(e?.target?.value)}
                            value={value}
                            ref={refInput}
                            onFocus={handleClearNotifi}
                            onKeyDown={(e: any) => e?.keyCode == 13 && handleSend()}
                          />
                        </div>
                        {value !== '' && (
                          <div className="icon__clear" onClick={() => setValue('')}>
                            <Icon name="times-circle" />
                          </div>
                        )}
                        <div
                          className={`icon d-flex justify-content-center align-items-center ${
                            value !== '' ? 'active' : ''
                          }`}
                          onClick={handleSend}
                        >
                          <Icon name="icon-send-chat" />
                        </div>
                      </div>
                    </div>
                    {isScrollBottom && (
                      <div
                        className="scroll--bottom d-flex justify-content-center align-items-center"
                        onClick={() => {
                          refChat?.current?.scrollTo({ top: refChat?.current?.scrollHeight, behavior: 'smooth' });
                          setIsScroll(true);
                        }}
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

      <input type="file" hidden ref={refFile} multiple onChange={(e) => uploadImage(e)} />
    </div>
  ) : (
    <></>
  );
};

export default React.memo(Chat);
