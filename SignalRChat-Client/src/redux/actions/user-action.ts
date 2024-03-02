import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SERVER_URL } from "../config";
import customAxios from "../../api";
import { toast } from "react-toastify";
import { Exception } from "sass";

export interface LoginProps {
    email: string,
    password: string
}

export interface SignUpProps {
    firstname: string,
    lastname: string,
    email: string,
    username: string,
    password: string,
    phonenumber: string
}

export interface UserUpdateProps {
    firstname: string,
    lastname: string,
    email: string,
    username: string,
    phonenumber: string
}

export const login = createAsyncThunk(
    'login',
    async (data: LoginProps, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${SERVER_URL}/api/auth/login`, data);
            console.log(response.data);
            if (response.status < 200 || response.status >= 300) {
                console.log(response.status);
                return rejectWithValue(response.data);
            }
            localStorage.setItem('user', JSON.stringify(response.data.user));
            localStorage.setItem('userId', response.data.user.id);
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            console.log(response.data);
            return response.data;
        } catch (e: Exception) {
            toast.error(e.response.data.Message);
            throw e;
        }
    }
)

export const signup = createAsyncThunk(
    'signup',
    async (data: SignUpProps, { rejectWithValue }) => {
        const response = await axios.post(`${SERVER_URL}/api/auth/signup`, data);
        if (response.status < 200 || response.status >= 300) {
            return rejectWithValue(response);
        }
        return response.data;
    }
)

export const logout = createAsyncThunk(
    'logout',
    async (_, { rejectWithValue }) => {
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.post(`${SERVER_URL}/api/auth/logout`, null, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        if (response.status < 200 || response.status >= 300) {
            rejectWithValue(response);
        }
        localStorage.clear();
    }
)

export const updateUser = createAsyncThunk(
    'update-user',
    async (data: UserUpdateProps, { rejectWithValue }) => {
        const response = await customAxios.put(`auth/update-user`, data);
        if (response.status < 200 || response.status >= 300) {
            rejectWithValue(response);
        }
        localStorage.setItem('user', JSON.stringify(response.data));
        localStorage.setItem('userId', response.data.id);
        return response.data;
    }
)
export const changePassword = createAsyncThunk(
    'change-password',
    async (data: {
        email: string,
        currentPassword: string,
        newPassword: string
    }, { rejectWithValue }) => {
        const response = await customAxios.put(`auth/change-password`, data);
        if (response.status < 200 || response.status >= 300) {
            rejectWithValue(response);
        }
        return response.data;
    }
)
export const changeAvatar = createAsyncThunk(
    'change-avatar',
    async (data: any, { rejectWithValue }) => {
        const response = await customAxios.post(`auth/change-avatar`, data);
        if (response.status < 200 || response.status >= 300) {
            rejectWithValue(response);
        }
        return response.data;
    }
)
export const getContactedUsers = createAsyncThunk(
    'get-contacted-users',
    async (userId: string, { rejectWithValue }) => {
        const response = await customAxios.get(`auth/get-contacted-users/${userId}`)
        if (response.status < 200 || response.status >= 300) {
            rejectWithValue(response);
        }

        return response.data;
    }
)

export const getAllUsers = createAsyncThunk(
    'get-all-users',
    async (userId: string, { rejectWithValue }) => {
        const response = await customAxios.get(`auth/get-all-users/${userId}`)
        if (response.status < 200 || response.status >= 300) {
            rejectWithValue(response);
        }
        return response.data;
    }
)