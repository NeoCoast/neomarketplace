import React from 'react';
import cn from 'classnames';

import { ClipLoader } from 'react-spinners';

import './styles.scss';

type ButtonProps = {
  icon?: string,
  onClick?: () => void,
  text: string,
  isPrimary?: boolean,
  isLoading?: boolean,
  disabled?: boolean,
}

const CustomButton = ({
  icon,
  onClick,
  text,
  isPrimary = false,
  disabled = false,
  isLoading = false,
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
    {isLoading
      ? (
        <ClipLoader
          size={20}
          color="white"
        />
      )
      : <p className="button__text">{text}</p>}
  </button>
);

export default CustomButton;
