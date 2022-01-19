export type BasketItem = {
  id: string;
  name: string;
  amount: number;
};

export type Basket = {
  userId: string;
  items: BasketItem[];
};
