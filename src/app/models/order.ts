import { ItemsList } from './ItemsList';

type OrderItem = {
  amount: number;
  item: ItemsList;
};

export type Order = {
  id: number;
  userId: string;
  orderItems: OrderItem[];
};
