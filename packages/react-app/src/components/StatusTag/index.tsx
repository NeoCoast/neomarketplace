import React from 'react';
import cn from 'classnames';

import './styles.scss';

type StatusTagProps = {
  text: string,
  isListing?: boolean,
}

const StatusTag = ({
  text,
  isListing = false,
} : StatusTagProps) => (
  <div
    className={cn('tag', {
      'tag--listing': isListing,
    })}
  >
    <p className="tag__text">{text}</p>
  </div>
);

export default StatusTag;
