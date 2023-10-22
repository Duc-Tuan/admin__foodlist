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
  const [imageShow, setImageShow] = React.useState<string>(url ?? '');
  return (
    <div className="wrapper__imagas">
      <Images url={imageShow} alt={alt ?? 'ảnh'} className="image" />

      <div className="images d-flex justify-content-start align-items-center gap-8 mt-10">
        {dataUrl?.map((i: string, idx: number) => (
          <React.Fragment key={idx}>
            <Images
              url={i}
              alt={'ảnh'}
              className={`img__${idx} ${imageShow === i ? 'active' : ''}`}
              onClick={() => setImageShow(i)}
            />
            <div className={`image__hover--${idx}`}>
              <Images url={i} alt={'ảnh'} className="image" />
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ViewImageProduct;
