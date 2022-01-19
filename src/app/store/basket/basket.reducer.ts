import { Basket } from '../../models/BasketItem';
import { Action, createReducer, on } from '@ngrx/store';
import {
  addItemToBasket,
  removeItemFromBasket,
  setBasket,
} from './basket.actions';

export const initialState: Basket = { items: [], userId: '' };

const _basketReducer = createReducer(
  initialState,
  on(setBasket, (state, { basket }) => basket),
  on(addItemToBasket, (state, { item }) =>
    state.items.find((x) => x.id === item.id)
      ? {
          ...state,
          items: state.items.map((x) =>
            x.id === item.id ? { ...x, amount: x.amount + item.amount } : x,
          ),
        }
      : {
          ...state,
          items: [...state.items, item],
        },
  ),
  on(removeItemFromBasket, (state, { item }) => ({
    ...state,
    items:
      state.items.find((x) => x.id === item.id)?.amount === 1
        ? state.items.filter((x) => x.id !== item.id)
        : state.items.map((x) =>
            x.id === item.id ? { ...x, amount: x.amount - 1 } : x,
          ),
  })),
);

export const basketReducer = (
  state: Basket | undefined,
  action: Action,
): Basket => _basketReducer(state, action);
