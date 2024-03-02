import { createSlice } from "@reduxjs/toolkit";
import { changeAvatar, changePassword, getContactedUsers, login, logout, signup, updateUser } from "../actions/user-action";


const initialValue: {
    loading: boolean,
    skeleton: boolean
} = {
    loading: false,
    skeleton: false
}

const loadingSlice = createSlice({
    name: "loading",
    initialState: initialValue,
    reducers: {
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setSkeleton(state, action) {
            state.skeleton = action.payload;
        }
    },
    extraReducers(builder) {
        builder.addCase(login.pending, (state, _) => {
            state.loading = true;
        })
        builder.addCase(login.fulfilled, (state, _) => {
            state.loading = false;
        })
        builder.addCase(login.rejected, (state, _) => {
            state.loading = false;
        })
        builder.addCase(signup.pending, (state, _) => {
            state.loading = true;
        })
        builder.addCase(signup.fulfilled, (state, _) => {
            state.loading = false;
        })
        builder.addCase(signup.rejected, (state, _) => {
            state.loading = false;
        })
        builder.addCase(updateUser.pending, (state, _) => {
            state.loading = true;
        })
        builder.addCase(updateUser.fulfilled, (state, _) => {
            state.loading = false;
        })
        builder.addCase(updateUser.rejected, (state, _) => {
            state.loading = false;
        })
        builder.addCase(changePassword.pending, (state, _) => {
            state.loading = true;
        })
        builder.addCase(changePassword.fulfilled, (state, _) => {
            state.loading = false;
        })
        builder.addCase(changePassword.rejected, (state, _) => {
            state.loading = false;
        })
        builder.addCase(changeAvatar.pending, (state, _) => {
            state.loading = true;
        })
        builder.addCase(changeAvatar.fulfilled, (state, _) => {
            state.loading = false;
        })
        builder.addCase(changeAvatar.rejected, (state, _) => {
            state.loading = false;
        })
    }
})

export const { setLoading, setSkeleton } = loadingSlice.actions;
export const loadingReducers = loadingSlice.reducer;