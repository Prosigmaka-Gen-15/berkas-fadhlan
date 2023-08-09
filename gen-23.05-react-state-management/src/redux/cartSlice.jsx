import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: { cartItems: [] },
  reducers: {
    addToCart(state, action) {
      const { product, quantity, size } = action.payload;
      const existingItem = state.cartItems.find((item) => item.product.id === product.id && item.size === size);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.cartItems.push({ product, quantity, size });
      }
    },
    removeFromCart(state, action) {
      const itemToRemove = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.product.id !== itemToRemove.product.id || item.size !== itemToRemove.size);
    },
    incrementQuantity: (state, action) => {
      const item = state.cartItems.find((item) => item.product.id === action.payload.product.id && item.size === action.payload.size);
      if (item) item.quantity++;
    },
    decrementQuantity: (state, action) => {
      const item = state.cartItems.find((item) => item.product.id === action.payload.product.id && item.size === action.payload.size);
      if (item && item.quantity > 1) item.quantity--;
    },
  },
});

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity } = cartSlice.actions;

export default cartSlice.reducer;
