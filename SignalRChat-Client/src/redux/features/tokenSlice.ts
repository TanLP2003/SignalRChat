import { createSlice } from "@reduxjs/toolkit";
import { login } from "../actions/user-action";

const initialValue: {
    accessToken: string
} = {
    accessToken: ''
}
export const tokenSlice = createSlice({
    name: 'token',
    initialState: initialValue,
    reducers: {
        setAccessToken(state, action) {
            state.accessToken = action.payload;
        }
    },
    extraReducers(builder) {
        builder.addCase(login.fulfilled, (state, action) => {
            state.accessToken = action.payload.accessToken;
        })
    },
})

export const { setAccessToken } = tokenSlice.actions;
export const tokenReducers = tokenSlice.reducer;