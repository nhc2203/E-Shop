import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  wishlist: localStorage.getItem("wishlistItems")
    ? JSON.parse(localStorage.getItem("wishlistItems"))
    : [],
};

export const wishlistReducer = createReducer(initialState, {
  addToWishlist: (state, action) => {
    const item = action.payload;
    const existItem = state.wishlist.find((x) => x._id === item._id);
    if (existItem) {
      return {
        ...state,
        wishlist: state.wishlist.map((x) =>
          x._id === existItem._id ? item : x
        ),
      };
    } else {
      return {
        ...state,
        wishlist: [...state.wishlist, item],
      };
    }
  },

  removeFromWishlist: (state, action) => {
    return {
      ...state,
      wishlist: state.wishlist.filter((i) => i._id !== action.payload),
    };
  },

  clearErrors: (state) => {
    state.error = null;
  },
});
