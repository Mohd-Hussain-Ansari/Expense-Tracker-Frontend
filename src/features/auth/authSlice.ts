import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface AuthState {
    token: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    token: localStorage.getItem('token'),
    loading: false,
    error: null,
};

export const login = createAsyncThunk(
    'auth/login',
    async (data: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await axios.post('/api/v1/auth/login', data);
            return response.data.token;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Login failed');
        }
    }
);

export const register = createAsyncThunk(
    'auth/register',
    async (data: { name: string; email: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await axios.post('/api/v1/auth/register', data);
            return response.data.token;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Register failed');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.token = null;
            localStorage.removeItem('token');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload;
                localStorage.setItem('token', action.payload);
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload;
                localStorage.setItem('token', action.payload);
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
