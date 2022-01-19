import { Basket } from '../models/BasketItem';
import { basketReducer } from './basket/basket.reducer';

export type State = {
  basket: Basket;
};

export const reducers = {
  basket: basketReducer,
};
