import React from 'react';
import cn from 'classnames';

import './styles.scss';

type ButtonProps = {
  icon?: string,
  onClick?: () => void,
  text: string,
  isPrimary?: boolean,
}

const CustomButton = ({
  icon,
  onClick,
  text,
  isPrimary = false,
} : ButtonProps) => (
  <button
    onClick={onClick}
    className={cn('button', { 'button--primary': isPrimary })}
  >
    {icon && (
      <img
        src={icon}
        alt="Button Icon"
        className="button__icon"
      />
    )}
    <p className="button__text">{text}</p>
  </button>
);

export default CustomButton;
