


import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import errorSlice from "./slices/errorSlice";
import productSlice from "./slices/productSlice";


const store = configureStore({
    reducer: {
        auth: authSlice,
        error: errorSlice,
        product: productSlice

    },

})

export default store
































