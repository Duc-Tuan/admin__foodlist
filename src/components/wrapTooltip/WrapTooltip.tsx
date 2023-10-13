import Tippy from '@tippyjs/react';
import React, { FC } from 'react';

type WrapTooltipProps = {
  length?: number;
  data: string;
  styles?: React.CSSProperties;
  className?: string;
  classNameChildren?: string;
};

export const WrapTooltip: FC<WrapTooltipProps> = ({ length = 20, data, styles, className, classNameChildren }) => {
  if (!data) return null;
  return data?.length > length ? (
    <Tippy
      appendTo={document.body}
      className={className}
      content={
        <span style={{ wordBreak: 'break-word' }}>{data?.length > 600 ? data?.slice(0, 600) + '...' : data}</span>
      }
    >
      <span style={styles} className={`${classNameChildren ?? 'trunc-one-line'} ${className}`}>
        {data?.slice(0, length) + '...'}
      </span>
    </Tippy>
  ) : (
    <span style={{ wordBreak: 'break-word', ...styles }} className={className}>
      {data}
    </span>
  );
};
