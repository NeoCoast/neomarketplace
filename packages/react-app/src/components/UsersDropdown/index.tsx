import React, { useContext } from 'react';
import cn from 'classnames';

import UserContext from 'context';
import { UserType } from 'types/user';

import './styles.scss';

type DropdownProps = {
  isOpen: boolean,
  setIsOpen: (param: boolean) => void,
  usersList: UserType[],
}

const UsersDropdown = ({ isOpen, setIsOpen, usersList } : DropdownProps) => {
  const { setSelectedUser, selectedUser } = useContext(UserContext);

  return (
    <div className={cn('dropdown', { 'dropdown--active': isOpen })}>
      <div className="dropdown__list">
        {usersList.filter(({ id }) => id !== selectedUser.id)
          .map(({ name, id }, index) => (
            <button
              key={id}
              onClick={() => {
                setIsOpen(false);

                setTimeout(() => setSelectedUser({
                  id,
                  name,
                }), 200);
              }}
              className={cn('dropdown__user', { 'dropdown__user--border': index !== usersList.length - 1 })}
            >
              <img
                src="data:image/jpeg;base64"
                alt="User Avatar"
                className="dropdown__user__avatar"
              />
              {name}
            </button>
          ))}
      </div>
    </div>
  );
};

export default UsersDropdown;
