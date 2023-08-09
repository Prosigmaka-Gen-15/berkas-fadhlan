export const ADD_TO_CART = 'ADD_TO_CART';

export const addToCart = (product, quantity, size) => {
  return {
    type: ADD_TO_CART,
    payload: {
      product,
      quantity,
      size,
    },
  };
};

export const removeFromCart = (item) => {
  return {
    type: 'REMOVE_FROM_CART',
    payload: item,
  };
};
