import { createContext, Dispatch, SetStateAction } from 'react';
import { UserType } from '@server/types/user';

type userContextType = {
  selectedUser: UserType;
  setSelectedUser: Dispatch<SetStateAction<UserType>>;
  usersList: UserType[];
};

export default createContext({
  selectedUser: {
    id: null,
    name: '',
    image: '',
  },
  setSelectedUser: () => {},
  usersList: [],
} as userContextType);
