import React from 'react';
import './index.scss';

type Props = {};

const index = (props: Props) => {
  return (
    <div className="wrapper__loadingDots">
      <div className="snippet d-flex align-items-center justify-content-center" data-title="dot-stretching">
        <div className="stage">
          <div className="dot-stretching"></div>
        </div>
      </div>
    </div>
  );
};

export default index;
