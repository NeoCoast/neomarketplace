export type Product = {
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
