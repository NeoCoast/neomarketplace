import { UserType } from './user';

export type ProductType = {
  id?: number,
  description: string,
  name: string,
  image: string,
  price: number,
  createdAt?: string,
  owner?: UserType,
  buyer?: UserType | null,
  msgsCount?: number,
};
