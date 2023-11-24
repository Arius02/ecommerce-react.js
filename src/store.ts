import { configureStore } from "@reduxjs/toolkit";
import { screenSizeReducer } from "./reducers/screenSlice";
import { cartReducer } from "./reducers/cartSlice";

const store = configureStore({
    reducer:{
        screenSize:screenSizeReducer,
        cart:cartReducer
    }
})

export default store