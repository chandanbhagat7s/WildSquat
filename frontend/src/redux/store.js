import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authSlice from "./slices/authSlice";
import errorSlice from "./slices/errorSlice";
import productSlice from "./slices/productSlice";

// Configure persist for the product slice
const persistConfig = {
    key: 'root',
    storage,
};

// Wrap your root reducer or specific reducers with persistReducer
const persistedProductReducer = persistReducer(persistConfig, productSlice);

const store = configureStore({
    reducer: {
        auth: authSlice,
        error: errorSlice,
        product: persistedProductReducer, // Persisted product reducer
    },
});

const persistor = persistStore(store);

export { store, persistor };


/*

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





*/