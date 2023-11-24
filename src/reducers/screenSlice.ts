import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  show: false,
};

const screenslice = createSlice({
  name: "screenSize",
  initialState,
  reducers: {
    setShow: (state, action: PayloadAction<boolean>) => {
      state.show = action.payload;
    },
  },
});

// Actions generated from the slice
export const { setShow } = screenslice.actions;
export const screenSizeReducer = screenslice.reducer;