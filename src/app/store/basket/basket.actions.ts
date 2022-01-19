import { createAction, props } from '@ngrx/store';
import { Basket, BasketItem } from '../../models/BasketItem';

const setBasket = createAction('[Basket] Set', props<{ basket: Basket }>());

const addItemToBasket = createAction(
  '[Basket] Add',
  props<{ item: BasketItem }>(),
);

const removeItemFromBasket = createAction(
  '[Basket] Remove',
  props<{ item: BasketItem }>(),
);

export { setBasket, addItemToBasket, removeItemFromBasket };
