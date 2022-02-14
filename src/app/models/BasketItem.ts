export type BasketItem = {
  id: number;
  name: string;
  amount: number;
  price: number;
};

export type Basket = {
  userId: string;
  items: BasketItem[];
};
