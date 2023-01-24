import React from 'react';
import cn from 'classnames';

import './styles.scss';

type StatusTagProps = {
  text: string,
  isGreen?: boolean,
  isBig?: boolean,
}

const StatusTag = ({
  text,
  isGreen = false,
  isBig = false,
} : StatusTagProps) => (
  <div
    className={cn('tag', {
      'tag--green': isGreen,
      'tag--big': isBig,
    })}
  >
    <p className="tag__text">{text}</p>
  </div>
);

export default StatusTag;
