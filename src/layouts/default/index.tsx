import React from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch, useBoolean } from '../../hooks';
import { Chat } from '../chat';
import { isShow } from '../chat/store/select';
import Header from '../header';
import Sliderbar from '../sliderbar/screen';
import './index.scss';

type Props = {
  children: React.ReactNode | string;
  isHeader?: boolean;
  title?: string;
  placeholder?: string;
  onChange?: (data: string) => void;
};

const Index = (props: Props) => {
  const { children, isHeader = true, title, placeholder, onChange } = props;
  const showChat = useSelector(isShow);
  const dispatch = useAppDispatch();
  const [isShowChat, { on, off, toggle }] = useBoolean(showChat);

  return (
    <div className="app__food d-flex">
      <section>
        <Sliderbar />
      </section>
      <main className="main__app">
        <Header isHeader={isHeader} title={title} placeholder={placeholder} onChange={onChange} />
        <div className="main__app--content">{children}</div>
      </main>

      <div className="wrapper__chat">
        <Chat />
        {/* <Tippy
          offset={[4, 24]}
          content={<Chat />}
          appendTo={document.body}
          placement="top-end"
          theme="light"
          trigger="click"
          arrow={true}
          interactive={true}
          className="Wrapper__tippy--chat"
          visible={isShowChat}
        >
          <div className="icon" onClick={toggle}>
            <Icon name="icon-chat" />
          </div>
        </Tippy> */}
      </div>
    </div>
  );
};

export default Index;
