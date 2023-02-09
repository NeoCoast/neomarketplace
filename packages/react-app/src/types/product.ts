export type ProductType = {
  id: number,
  description: string,
  name: string,
  image: string,
  price: number,
  publicationDate: string,
  seller: number,
  buyer?: number,
  msgsCount: number,
};
