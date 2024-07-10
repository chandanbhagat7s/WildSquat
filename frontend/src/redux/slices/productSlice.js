import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";





export const addToCart = createAsyncThunk("/product/add/cart", async (data) => {

    try {
        const res = await axios.get(`/api/v1/product/addToCart/${data._id}`);

        return res.data

    } catch (e) {
        return e.response;
    }

})

export const addToHeart = createAsyncThunk("/product/add/cart", async (data) => {

    try {
        const res = await axios.get(`/api/v1/product/addToHeart/${data._id}`);

        return res.data

    } catch (e) {
        return e.response;
    }

})

export const removeFromCart = createAsyncThunk("/product/remove/cart", async (data) => {

    try {
        const res = await axios.get(`/api/v1/product/removeFromCart/${data._id}`);

        return res.data

    } catch (e) {
        return e.response;
    }

})

export const removeFromHeart = createAsyncThunk("/product/remove/heart", async (data) => {

    try {
        const res = await axios.get(`/api/v1/product/removeFromHeart/${data._id}`);

        return res.data

    } catch (e) {
        return e.response;
    }

})


const initialState = {
    cart: [],
    heart: [],

}

const productSlice = createSlice({
    name: "Product",
    initialState,
    reducers: {

    },
    extraReducers: 
})









