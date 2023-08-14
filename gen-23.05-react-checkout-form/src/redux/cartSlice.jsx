import { createSlice } from '@reduxjs/toolkit';

const cart = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: cart,
  },
  reducers: {
    addToCart: (state, action) => {
      state.cartItems.push(action.payload);
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      const index = state.cartItems.findIndex((item) => item.product.id === action.payload.product.id);
      if (index >= 0) {
        state.cartItems.splice(index, 1);
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      }
    },
    incrementQuantity: (state, action) => {
      const index = state.cartItems.findIndex((item) => item.product.id === action.payload.product.id);
      if (index >= 0) {
        state.cartItems[index].quantity += 1;
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      }
    },
    decrementQuantity: (state, action) => {
      const index = state.cartItems.findIndex((item) => item.product.id === action.payload.product.id);
      if (index >= 0) {
        state.cartItems[index].quantity = Math.max(1, state.cartItems[index].quantity - 1);
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      }
    },
  },
});

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity } = cartSlice.actions;

export default cartSlice.reducer;
