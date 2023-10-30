import React from 'react';
import { useTranslation } from 'react-i18next';
import Icon from '../../assets/icon';
import { Button } from '../../components';
import { Chat } from '../chat';
import Header from '../header';
import Sliderbar from '../sliderbar/screen';
import './index.scss';

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
};

const Index = (props: Props) => {
  const {
    children,
    isHeader = true,
    title,
    placeholder,
    onChange,
    isBack = false,
    onClickBack,
    reactNodeRight,
    filter,
  } = props;
  const { t } = useTranslation();

  return (
    <div className="app__food d-flex">
      <section>
        <Sliderbar />
      </section>
      <main className="main__app">
        <Header isHeader={isHeader} title={title} placeholder={placeholder} onChange={onChange} />
        <div className="main__app--content scroll__foodApp">
          {isBack && (
            <div className="header__main d-flex justify-content-between align-items-center gap-10">
              <div className="d-flex justify-content-start align-items-center gap-10">
                <Button color="nomal" onClick={onClickBack}>
                  <Icon name="icon-arrow-back" /> {t('Quay lại')}
                </Button>
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
          {children}
        </div>
      </main>

      <div className="wrapper__chat">
        <Chat />
      </div>
    </div>
  );
};

export default Index;
