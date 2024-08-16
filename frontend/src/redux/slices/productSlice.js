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

export const getHompageData = createAsyncThunk("/product/homepage", async (data) => {
    try {
        const res = await axios.get("/api/v1/user/homepage")

        console.log(res);
        return res.data
    } catch (e) {
        return e.response;
    }





})


export const getAllCateogyNames = createAsyncThunk("/product/getCategory", async () => {
    try {
        const res = await axios.get("/api/v1/product/getAllCategory?fields=name,_id,label");
        console.log(res);
        return res.data
    } catch (e) {
        console.log(e);
    }
})


const initialState = {
    cart: [],
    heart: [],
    slider: [],
    hotProducts: [],
    trending: [],
    category: [],
    posters: [],
    categoryName: [],
    msg: "",
    cards: [],
    multiple: []

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
                let card = []
                let trend = []
                let multiple = []
                action?.payload?.allTools.map((el) => {
                    if (el.name == "CATEGORY") {
                        category.push(el)
                    } else if (el.name == "SLIDER") {
                        slider.push(el)

                    } else if (el.name == "POSTER") {
                        poster.push(el)

                    } else if (el.name == "CARDS") {
                        card.push(el)

                    } else if (el.name == "X-MULTIPLE") {
                        multiple.push(el)

                    } else if (el.name == "Trending") {
                        trend.push(el)

                    }

                })
                state.category = category;
                state.posters = poster;
                state.slider = slider;
                state.cards = card;
                state.trending = trend;
                state.multiple = multiple;
            }

        }).addCase(getAllCateogyNames.fulfilled, (state, action) => {
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









