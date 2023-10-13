import React from 'react';
import Images from '../image';
import './index.scss';
import Tippy from '@tippyjs/react';

type Props = {
  url?: string;
  alt?: string;
  dataUrl?: string[];
};

const ViewImageProduct = (props: Props) => {
  const { url, alt, dataUrl } = props;
  return (
    <div className="wrapper__imagas">
      <Images url={url} alt={alt ?? 'ảnh'} className="image" />

      <div className="images d-flex justify-content-start align-items-center gap-8 mt-10">
        {dataUrl?.map((i: string, idx: number) => <Images url={i} alt={alt ?? 'ảnh'} className="img" key={idx} />)}
      </div>
    </div>
  );
};

export default ViewImageProduct;
