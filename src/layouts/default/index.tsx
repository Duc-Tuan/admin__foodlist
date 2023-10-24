import React from 'react';
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
  return (
    <div className="app__food d-flex">
      <section>
        <Sliderbar />
      </section>
      <main className="main__app">
        <Header isHeader={isHeader} title={title} placeholder={placeholder} onChange={onChange} />
        <div className="main__app--content">{children}</div>
      </main>
    </div>
  );
};

export default Index;
