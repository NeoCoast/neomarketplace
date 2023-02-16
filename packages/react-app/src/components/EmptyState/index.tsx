import React from 'react';

import './styles.scss';

type EmptyStateProps = {
  text: string,
}
const EmptyState = ({ text }: EmptyStateProps) => (
  <div className="message">
    {text}
  </div>
);

export default EmptyState;
