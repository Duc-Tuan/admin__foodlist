import React from 'react';
import Header from '../header';
import Sliderbar from '../sliderbar/screen';
import './index.scss';

type Props = {
  children: React.ReactNode | string;
};

const Index = (props: Props) => {
  const { children } = props;
  return (
    <div className="app__food d-flex">
      <section>
        <Sliderbar />
      </section>
      <main className="main__app">
        <Header />
        <div className="main__app--content">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Index;
