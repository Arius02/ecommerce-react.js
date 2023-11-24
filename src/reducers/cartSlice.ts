import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  cart:{
    products:[],
    totalPrice:0,
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<any>) => {
      state.cart = action.payload;
    },
  },
});

// Actions generated from the slice
export const { setCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
