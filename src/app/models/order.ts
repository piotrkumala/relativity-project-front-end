import { ItemsList } from './ItemsList';

type OrderItem = {
  amount: number;
  item: ItemsList;
};

export type Order = {
  userId: string;
  orderItems: OrderItem[];
};
