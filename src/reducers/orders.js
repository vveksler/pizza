import { CREATE_NEW_ORDER } from '../modules/clients';
import { MOVE_ORDER_NEXT, MOVE_ORDER_BACK } from '../actions/moveOrder';
import { ADD_INGREDIENT } from '../actions/ingredients';
import { moveNext, moveBack } from './helpers';

// Реализуйте редьюсер
// Типы экшенов, которые вам нужно обрабатывать уже импортированы
// Обратите внимание на `orders.test.js`.
// Он поможет понять, какие значения должен возвращать редьюсер.

export default (state = [], action) => {
  switch (action.type) {
    case CREATE_NEW_ORDER:
      return [
        ...state,
        { ...action.payload, ingredients: [], position: 'clients' }
      ];
    case MOVE_ORDER_NEXT:
      return state.map(order =>
        order.id === action.payload ? moveNext(order) : order
      );
    case MOVE_ORDER_BACK:
      return state.map(order =>
        order.id === action.payload ? moveBack(order) : order
      );
    case ADD_INGREDIENT:
      const orders = state.filter(
        order => order.position === action.payload.from
      );
      if (!orders.length) return state;

      return state.map(order =>
        order.id === orders[0].id
          ? {
              ...order,
              ingredients: [...order.ingredients, action.payload.ingredient]
            }
          : order
      );
    default:
      return state;
  }
};


export const getOrdersFor = (state, position) =>
  state.orders.filter(order => order.position === position);
