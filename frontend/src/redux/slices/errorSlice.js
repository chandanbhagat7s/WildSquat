import { createSlice } from "@reduxjs/toolkit";





const errorSlice = createSlice({
    name: "error",
    initialState: { status: "", message: [] },
    reducers: {
        defaulta: (state, action) => {
            state.status = ""
            state.message = [];
            // state.message = action.payload.message
        },
        warning: (state, action) => {
            state.status = "warning"
            state.message.push({ id: Date.now(), status: "warning", message: action.payload.message });
            // state.message = action.payload.message
        },
        info: (state, action) => {
            state.status = "info"
            state.message.push({ id: Date.now(), status: "info", message: action.payload.message });
            // state.message = action.payload.message
        },
        success: (state, action) => {
            state.status = "success"
            state.message.push({ id: Date.now(), status: "success", message: action.payload.message });
            // state.message = action.payload.message
        },
        error: (state, action) => {
            state.status = "error"
            state.message.push({ id: Date.now(), status: "error", message: action.payload.message });
            // state.message = action.payload.message
        },
        removeAlert: (state) => {
            // Remove the oldest alert in the stack
            state.message.shift();
        },

    }
})

export const { defaulta, addAlert, removeAlert, warning, info, success, error, message } = errorSlice.actions
export default errorSlice.reducer;

















