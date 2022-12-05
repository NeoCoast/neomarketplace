import React from 'react';
import cn from 'classnames';

import DefaultUser from 'assets/DefaultUser.png';

import './styles.scss';

type DropdownProps = {
  isOpen?: boolean,
  setIsOpen?: (param: boolean) => void,
}

const UsersDropdown = ({ isOpen, setIsOpen = () => {} } : DropdownProps) => {
  const usersMock = [
    { name: 'User Name 2', avatar: DefaultUser },
    { name: 'User Name 3', avatar: DefaultUser },
  ];

  return (
    <div className={cn('dropdown', { 'dropdown-active': isOpen })}>
      <div className="dropdown_list">
        {usersMock.map(({ name, avatar }, index) => (
          <button
            onClick={() => setIsOpen(false)} // TO DO: Add logic for change user using redux
            className={cn('dropdown_user', { 'dropdown_user-border': index !== usersMock.length - 1 })}
          >
            <img src={avatar} alt="User Avatar" className="dropdown_user_avatar" />
            {name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default UsersDropdown;
