import { createContext, Dispatch, SetStateAction } from 'react';

export type userType = {
  id: number | null;
  name: string;
  picture: string;
};

type userContextType = {
  selectedUser: userType;
  setSelectedUser: Dispatch<SetStateAction<userType>>;
};

export default createContext({
  selectedUser: {
    id: null,
    name: '',
    picture: '',
  },
  setSelectedUser: () => {},
} as userContextType);
