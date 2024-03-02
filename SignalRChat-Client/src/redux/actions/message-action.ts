import { createAsyncThunk } from "@reduxjs/toolkit";
import customAxios from "../../api";

export const getMessageOfUser = createAsyncThunk(
    'get-message-of-user',
    async (userId: string, { rejectWithValue }) => {
        // const accessToken = localStorage.getItem('accessToken');
        // const response = await axios.get(`${SERVER_URL}/api/messages/get-message-of-user/${userId}`, {
        //     headers: {
        //         Authorization: `Bearer ${accessToken}`
        //     }
        // });
        const response = await customAxios.get(`messages/get-message-of-user/${userId}`);
        if (response.status < 200 || response.status >= 300) {
            rejectWithValue(response);
        }
        return response.data;
    }
)

export const getLatestMessageBetweenUser = createAsyncThunk(
    'get-latest-message-between-users',
    async (arg: { firstUser: string; secondUser: string }, { rejectWithValue }) => {
        const { firstUser, secondUser } = arg;
        const response = await customAxios.get(`messages/get-latest-message-between-users`, {
            params: {
                firstUserId: firstUser,
                secondUserId: secondUser
            }
        });
        if (response.status < 200 || response.status >= 300) {
            rejectWithValue(response);
        }
        return {
            userId: secondUser,
            message: response.data
        }
    }
)