import { CREATE_NEW_ORDER } from '../modules/clients';
import { MOVE_ORDER_NEXT, MOVE_ORDER_BACK } from '../actions/moveOrder';
import { ADD_INGREDIENT } from '../actions/ingredients';

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
      return state;
    default:
      return state;
  }
};

const moveNext = order => {
  switch (order.position) {
    case 'clients':
      return {
        ...order,
        position: 'conveyor_1'
      };
    case 'conveyor_1':
      return {
        ...order,
        position: 'conveyor_2'
      };
    case 'conveyor_2':
      return {
        ...order,
        position: 'conveyor_3'
      };
    case 'conveyor_3':
      return {
        ...order,
        position: 'conveyor_4'
      };
    default:
      return order;
  }
};

const moveBack = order => {
  switch (order.position) {
    case 'conveyor_2':
      return {
        ...order,
        position: 'conveyor_1'
      };
    case 'conveyor_3':
      return {
        ...order,
        position: 'conveyor_2'
      };
    case 'conveyor_4':
      return {
        ...order,
        position: 'conveyor_3'
      };
    default:
      return order;
  }
};

export const getOrdersFor = (state, position) =>
  state.orders.filter(order => order.position === position);
