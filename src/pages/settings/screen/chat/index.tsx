import React from 'react';
import { DefaultLayout } from '../../../../layouts';
import './index.scss';
import { useNavigate } from 'react-router-dom';
import { PATHNAME } from '../../../../configs/pathname';
import Switch from '../../../../components/switch/switch';
import { useAppDispatch } from '../../../../hooks';
import { actions as actionsChat } from '../../store';
import { useSelector } from 'react-redux';
import { isChat } from '../../store/select';
import { useTranslation } from 'react-i18next';

type Props = {};

const ScreenChat = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const shshowChat = useSelector(isChat);

  return (
    <DefaultLayout title="Thiết lập chat" isSearch isBack onClickBack={() => navigate(PATHNAME.SCREENSETTINGS)}>
      <div className="wrapper__settingChat compont d-flex justify-content-start align-items-center">
        <div className="describe p-10">
          <div className="title">{t('Tin nhắn')}</div>
          <div className="sub">{t('Thiết lập chức năng nhắn tin với khách hàng')}</div>
        </div>
        <div className="detail p-10">
          <div className="d-flex justify-content-between align-items center gap-10 mt-2">
            <h4>{t('Bật/Tắt bong bóng chat')}</h4>
            <Switch
              onChange={(e: any) => dispatch(actionsChat.setChat({ isChat: e?.target?.checked }))}
              checked={shshowChat}
            />
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ScreenChat;
