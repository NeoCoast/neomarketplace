import React from 'react';
import cn from 'classnames';

import './styles.scss';

type ButtonProps = {
  icon?: string,
  onClick?: () => void,
  text: string,
  isPrimary?: boolean,
  disabled?: boolean,
}

const CustomButton = ({
  icon,
  onClick,
  text,
  isPrimary = false,
  disabled = false,
} : ButtonProps) => (
  <button
    onClick={onClick}
    className={cn('button', {
      'button--primary': isPrimary,
      'button--disabled': disabled,
    })}
    disabled={disabled}
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
