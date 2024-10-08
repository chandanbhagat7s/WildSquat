import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



export const signupForm = createAsyncThunk('/signup/user', async (data) => {


    try {


        const res = await axios.post('/api/v1/auth/signup', data, {
            withCredentials: true
        })
        if (res) {
            return res


        }
    } catch (error) {

        return error.response;
    }


})

export const loginForm = createAsyncThunk('/login/user', async (data, { rejectWithValue }) => {


    try {


        const res = await axios.post('/api/v1/auth/login', data, {
            withCredentials: true
        })
        if (res) {
            return res.data


        }
    } catch (e) {

        return rejectWithValue(e?.response?.data?.msg || "Please check Your internet connection");
    }


})
export const SendOtpToUser = createAsyncThunk('/otp/user', async (data) => {


    try {


        const res = await axios.post('/api/v1/auth/sendOtp', data, {
            withCredentials: true
        })
        if (res) {
            return res


        }
    } catch (error) {

        return error.response;
    }


})

const initialState = {
    data: JSON.parse(localStorage.getItem("data")) || '',
    isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn")) || false,
    gender: "male",
    msg: ""
}
const authSlice = createSlice({
    name: 'Auth',
    initialState,
    reducers: {
        changeGender: (state, action) => {

            state.gender = action.payload.gender
        },
        logout: (state, action) => {
            state.isLoggedIn = false,
                state.data = {},
                state.msg = ""
        }

    },
    extraReducers: (builder) => {
        builder.addCase(signupForm.fulfilled, (state, action) => {
            if (action.payload.data.status == "success") {
                localStorage.setItem("isLoggedIn", JSON.stringify(true))
                localStorage.setItem("data", JSON.stringify(action?.payload?.data?.data))
                state.isLoggedIn = true;
                state.data = action?.payload?.data?.data;
            }


        }).addCase(loginForm.fulfilled, (state, action) => {
            if (action?.payload?.status == "success") {
                localStorage.setItem("isLoggedIn", JSON.stringify(true))
                localStorage.setItem("data", JSON.stringify(action?.payload?.data))
                state.isLoggedIn = true;
                state.data = action?.payload?.data;
            }


        }).addCase(loginForm.rejected, (state, action) => {



            state.msg = action.payload;
        })

    }
})

export const { logout, changeGender } = authSlice.actions;

export default authSlice.reducer

















