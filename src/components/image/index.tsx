import React from 'react';

type Props = {
  url?: string;
  alt: string;
  className?: string;
};

const Images = (props: Props) => {
  const { url, className, alt } = props;
  return <div className={className}>{!url ? <div>Loading</div> : <img src={url} alt={alt} />}</div>;
};

export default Images;
