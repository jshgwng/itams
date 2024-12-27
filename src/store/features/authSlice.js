import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchUser, loginUser } from "../../services/api";

export const fetchUserData = createAsyncThunk(
    'auth/fetchUser',
    async (_, { rejectWithValue }) => {
        try {
            const data = fetchUser()
            return data
        } catch (error) {
            return rejectWithValue(error.response?.data || "An error occured while fetching user data")
        }
    }
)

export const login = createAsyncThunk(
    'auth/loginUser',
    async (credentials, { rejectWithValue }) => {
        try {
            const data = loginUser(credentials);
            return data
        } catch (error) {
            return rejectWithValue(error.response?.data || "An error occured while logging in the user")
        }
    }
)

const authSlice = createSlice({
    initialState: {
        user: null,
        status: 'idle',
        error: null
    },
    reducers: {
        logout: (state)=>{
            state.user = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserData.pending, (state) => {
                state.status = 'loading',
                    state.error = null
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.status = 'succeeded',
                    state.user = action.payload
            })
            .addCase(fetchUserData.pending, (state, action) => {
                state.status = 'failed',
                    state.error = action.payload
            })
            .addCase(login.pending, (state) => {
                state.status = 'loading',
                    state.error = null
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'succeeded',
                    state.user = action.payload
            })
            .addCase(login.pending, (state, action) => {
                state.status = 'failed',
                    state.error = action.payload
            })
    }
})