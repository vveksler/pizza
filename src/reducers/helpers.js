export const moveNext = order => {
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
    case 'conveyor_4':
      return ifRecipeMatched(order.recipe, order.ingredients)
        ? {
            ...order,
            position: 'finish'
          }
        : order;
    default:
      return order;
  }
};

export const moveBack = order => {
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

const ifRecipeMatched = (arr1, arr2) => {
  for (const item of arr1) {
    if (arr2.indexOf(item) < 0) return false;
  }

  return true;
};
