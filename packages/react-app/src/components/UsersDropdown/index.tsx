import React, { useContext } from 'react';
import cn from 'classnames';

import UserContext, { userType } from 'context';

import './styles.scss';

type DropdownProps = {
  isOpen: boolean,
  setIsOpen: (param: boolean) => void,
  usersList: userType[],
}

const UsersDropdown = ({ isOpen, setIsOpen, usersList } : DropdownProps) => {
  const { setSelectedUser, selectedUser } = useContext(UserContext);

  return (
    <div className={cn('dropdown', { 'dropdown-active': isOpen })}>
      <div className="dropdown_list">
        {usersList.filter(({ id }) => id !== selectedUser.id)
          .map(({ name, picture, id }, index) => (
            <button
              key={id}
              onClick={() => {
                setIsOpen(false);

                setTimeout(() => setSelectedUser({
                  id,
                  name,
                  picture,
                }), 200);
              }}
              className={cn('dropdown_user', { 'dropdown_user-border': index !== usersList.length - 1 })}
            >
              <img
                src={picture}
                alt="User Avatar"
                className="dropdown_user_avatar"
              />
              {name}
            </button>
          ))}
      </div>
    </div>
  );
};

export default UsersDropdown;
