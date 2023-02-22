import React from 'react';
import cn from 'classnames';

import './styles.scss';

type StatusTagProps = {
  text: string,
  isListing?: boolean,
  isGreen?: boolean,
}

const StatusTag = ({
  text,
  isListing = false,
  isGreen = false,
} : StatusTagProps) => (
  <div
    className={cn('tag', {
      'tag--listing': isListing,
      'tag--green': isGreen,
    })}
  >
    <p
      className={cn('tag__text', {
        'tag__text--listing': isListing,
      })}
    >
      {text}
    </p>
  </div>
);

export default StatusTag;
