


import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import errorSlice from "./slices/errorSlice";


const store = configureStore({
    reducer: {
        auth: authSlice,
        error: errorSlice

    },

})

export default store
































