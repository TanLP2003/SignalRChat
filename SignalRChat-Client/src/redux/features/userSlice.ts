import { createSlice } from "@reduxjs/toolkit";
import { changeAvatar, getAllUsers, getContactedUsers, login, updateUser } from "../actions/user-action";

export interface User {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    userName: string,
    phoneNumber: string,
    avatar: string
}

const initialValue: {
    user: User | null
    onlineUsers: string[]
    allUsers: User[]
    contactedList: User[]
} = {
    user: null,
    allUsers: [],
    onlineUsers: [],
    contactedList: []
}

export const userSlice = createSlice({
    name: "users",
    initialState: initialValue,
    reducers: {
        addOnLineUser(state, action) {
            if (!state.onlineUsers.includes(action.payload)) {
                state.onlineUsers = [...state.onlineUsers, action.payload];
                console.log("from addOnlineUser, user: ", action.payload);
            }
        },
        removeOffLineUser(state, action) {
            state.onlineUsers = state.onlineUsers.filter(uId => uId !== action.payload);
        }
    },
    extraReducers(builder) {
        builder.addCase(login.fulfilled, (state, action) => {
            state.user = action.payload.user as User;
        })
        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.user = action.payload as User;
        })
        builder.addCase(changeAvatar.fulfilled, (state, action) => {
            state.user = action.payload as User;
        })
        builder.addCase(getContactedUsers.fulfilled, (state, action) => {
            state.contactedList = action.payload;
        })
        builder.addCase(getAllUsers.fulfilled, (state, action) => {
            state.allUsers = action.payload;
        })
    },
});

export const { addOnLineUser, removeOffLineUser } = userSlice.actions;
export const userReducer = userSlice.reducer;