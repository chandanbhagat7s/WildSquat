import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";





export const addToCart = createAsyncThunk("/product/add/cart", async (data, { rejectWithValue }) => {

    try {
        const res = await axios.get(`/api/v1/user/addToCart/${data}`);

        return res.data

    } catch (e) {
        console.log(e);
        return rejectWithValue(e?.response?.data?.msg || "Please check Your internet connection");
    }

})

export const addToHeart = createAsyncThunk("/product/add/cart", async (data) => {

    try {
        const res = await axios.get(`/api/v1/user/addToHeart/${data._id}`);

        return res.data

    } catch (e) {
        return e.response;
    }

})

export const removeFromCart = createAsyncThunk("/product/remove/cart", async (data, { rejectWithValue }) => {

    try {
        const res = await axios.get(`/api/v1/user/removeFromCart/${data}`);

        console.log(res);

        return res.data

    } catch (e) {
        console.log(e);
        return rejectWithValue(e?.response?.data?.msg || "Please check Your internet connection");
    }

})

export const removeFromHeart = createAsyncThunk("/product/remove/heart", async (data) => {

    try {
        const res = await axios.get(`/api/v1/user/removeFromHeart/${data._id}`);

        return res.data

    } catch (e) {
        return e.response;
    }

})




export const getAllCateogyNames = createAsyncThunk("/product/getCategory", async (gender) => {
    try {
        console.log("CALLED");

        const res = await axios.get(`/api/v1/product/getAllCategory?fields=name,_id,label&gender=${gender}`);
        console.log(res);
        return res.data
    } catch (e) {
        console.log(e);
    }
})




const initialState = {
    cart: [],
    heart: [],
    categoryName: [],
    msg: "",

}

const productSlice = createSlice({
    name: "Product",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getAllCateogyNames.fulfilled, (state, action) => {
            if (action.payload.status == "success") {
                state.categoryName = action.payload.data
            }
        }).addCase(addToCart.rejected, (state, action) => {
            console.log(action);

            state.msg = action.payload;
        }).addCase(removeFromCart.rejected, (state, action) => {
            console.log(action);

            state.msg = action.payload;
        })




    }
})


export default productSlice.reducer;









