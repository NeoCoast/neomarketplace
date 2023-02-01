import { createContext, Dispatch, SetStateAction } from 'react';
import { UserType } from 'types/user';

type userContextType = {
  selectedUser: UserType;
  setSelectedUser: Dispatch<SetStateAction<UserType>>;
  usersList: UserType[];
};

export default createContext({
  selectedUser: {
    id: null,
    name: '',
    picture: '',
  },
  setSelectedUser: () => {},
  usersList: [],
} as userContextType);
