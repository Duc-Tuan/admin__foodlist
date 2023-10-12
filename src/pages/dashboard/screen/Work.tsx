import React from 'react';

type Props = {};

const Work = (props: Props) => {
  return (
    <div className="wrapper__work">
      <div className="wrapper__work--filter d-flex justify-content-between align-items-center gap-10 sticky">
        <div className="name">Hoạt động</div>

        <div className="selected"></div>
      </div>

      <div className="work"></div>
    </div>
  );
};

export default Work;
