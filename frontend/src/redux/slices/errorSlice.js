import { createSlice } from "@reduxjs/toolkit";





const errorSlice = createSlice({
    name: "error",
    initialState: { status: "", message: "" },
    reducers: {
        defaulta: (state, action) => {
            state.status = ""
            state.message = action.payload.message
        },
        warning: (state, action) => {
            state.status = "warning"
            state.message = action.payload.message
        },
        info: (state, action) => {
            state.status = "info"
            state.message = action.payload.message
        },
        success: (state, action) => {
            state.status = "success"
            state.message = action.payload.message
        },
        error: (state, action) => {
            state.status = "error"
            state.message = action.payload.message
        },

    }
})

export const { defaulta, warning, info, success, error, message } = errorSlice.actions
export default errorSlice.reducer;

















