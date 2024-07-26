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

export const getHompageData = createAsyncThunk("/product/homepage", async (data) => {
    try {
        const res = await axios.get("/api/v1/user/homepage")

        console.log(res);
        return res.data
    } catch (error) {

    }





})


export const getAllCateogyNames = createAsyncThunk("/product/getCategory", async () => {
    try {
        const res = await axios.get("/api/v1/product/getAllCategory?fields=name,_id,label");
        console.log(res);
        return res.data
    } catch (error) {
        console.log("error");
    }
})


const initialState = {
    cart: [],
    heart: [],
    slider: [],
    hotProducts: [],
    category: [],
    posters: [],
    categoryName: []

}

const productSlice = createSlice({
    name: "Product",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getHompageData.fulfilled, (state, action) => {
            console.log("came", action);
            if (action?.payload?.status == "success") {
                let category = []
                let slider = []
                let poster = []
                action?.payload?.allTools.map((el) => {
                    if (el.name == "CATEGORY") {
                        category.push(el)
                    } else if (el.name == "SLIDER") {
                        slider.push(el)

                    } else if (el.name == "POSTER") {
                        poster.push(el)

                    }

                })
                state.category = category;
                state.posters = poster;
                state.slider = slider;
            }

        }).addCase(getAllCateogyNames.fulfilled, (state, action) => {
            if (action.payload.status == "success") {
                state.categoryName = action.payload.data
            }
        })




    }
})


export default productSlice.reducer;









