import React from 'react';

type Props = {
  url?: string;
  alt: string;
  className?: string;
  onClick?: () => void;
};

const Images = (props: Props) => {
  const { url, className, alt, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      {!url ? <div>Loading</div> : <img src={url} alt={alt} loading="lazy"/>}
    </div>
  );
};

export default Images;
