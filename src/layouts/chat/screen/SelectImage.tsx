import React from 'react';
import { uploadFile } from './const';
import Icon from 'assets/icon';

type Props = {
  data: uploadFile[];
  clearImageSend: () => void;
  uploadImage: () => void;
  handleRemove: (id: number) => void;
};

const SelectImage = React.forwardRef(({ data, clearImageSend, uploadImage, handleRemove }: Props, ref: any) => {
  return (
    <div style={{ position: 'relative', paddingBottom: '0.1rem' }}>
      <div
        className="image__send scroll__foodApp d-flex justify-contet-start align-items-center gap-10"
        style={{ paddingBottom: data?.length > 5 ? '0.6rem' : '0' }}
        ref={ref}
      >
        <div className="item d-flex justify-contet-start align-items-center gap-10">
          {data
            ?.filter((i: uploadFile) => i?.url !== undefined)
            ?.map((i: uploadFile, idx: number) => {
              return (
                <div className="img" key={idx}>
                  <img alt="image" src={i?.url} />

                  <div
                    className="clear-one-img justify-content-center align-items-center"
                    onClick={() => handleRemove(i?.id)}
                  >
                    <Icon name="close" />
                  </div>
                </div>
              );
            })}
        </div>

        <div className="add d-flex justify-content-center align-items-center" onClick={uploadImage}>
          <Icon name="plus-upload" />
        </div>

        <div className="clear d-flex justify-content-center align-items-center" onClick={clearImageSend}>
          <Icon name="times-circle" />
        </div>
      </div>
    </div>
  );
});

export default SelectImage;
