import React from 'react';
import './index.scss';
import { DefaultLayout } from '../../../layouts';
import { INavMenu, fakeNav } from './const';
import Icon from '../../../assets/icon';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

type Props = {};

const ScreenSetting = (props: Props) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <DefaultLayout title="Thiết lập" isSearch>
      <div className="wrapper__setting grid_4 mt-3">
        {fakeNav?.map((i: INavMenu, idx: number) => (
          <div
            className="item d-flex justify-content-start align-items-center gap-10"
            key={idx}
            onClick={() => {
              navigate(i?.link);
            }}
          >
            <div className="icon d-flex justify-content-center align-items-center">
              <Icon name={i?.icon} />
            </div>
            <div className="desc">
              <div className="title">{t(i?.name)}</div>
              <div className="content">{t(i?.desc)}</div>
            </div>
          </div>
        ))}
      </div>
    </DefaultLayout>
  );
};

export default ScreenSetting;
