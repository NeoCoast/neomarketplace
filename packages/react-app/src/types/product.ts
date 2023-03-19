import { UserType } from './user';

export type ProductType = {
  id?: number | undefined,
  description: string,
  name: string,
  image: string | null,
  price: number,
  createdAt?: string,
  owner?: UserType | null,
  buyer?: UserType | null,
  msgsCount?: number,
};
