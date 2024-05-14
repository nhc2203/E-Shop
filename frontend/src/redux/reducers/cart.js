import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  cart: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
};

export const cartReducer = createReducer(initialState, {
  addToCart: (state, action) => {
    const item = action.payload;
    const existItem = state.cart.find((x) => x._id === item._id);
    if (existItem) {
      return {
        ...state,
        cart: state.cart.map((x) => (x._id === existItem._id ? item : x)),
      };
    } else {
      return {
        ...state,
        cart: [...state.cart, item],
      };
    }
  },

  removeFromCart: (state, action) => {
    return {
      ...state,
      cart: state.cart.filter((i) => i._id !== action.payload),
    };
  },

  clearErrors: (state) => {
    state.error = null;
  },
});
