import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosAuth from '../../utils/axiosAuth';

export interface Transaction {
    _id?: string;
    type: string;
    amount: number;
    description: string;
    category: string;
    date: string;
}

export interface TransactionsState {
    items: Transaction[];
    loading: boolean;
    error: string | null;
}

const initialState: TransactionsState = {
    items: [],
    loading: false,
    error: null,
};


export const fetchTransactions = createAsyncThunk(
    'transactions/fetchTransactions',
    async (params: { type?: string; category?: string; date?: string }) => {
        const response = await axiosAuth.get('/api/v1/transactions', { params });
        const data = Array.isArray(response.data) ? response.data : response.data.data || [];
        return data;
    }
);


export const addTransaction = createAsyncThunk(
    'transactions/addTransaction',
    async (transaction: Transaction) => {
        const response = await axiosAuth.post('/api/v1/transactions', transaction);
        const data = response.data.data || response.data;
        return data;
    }
);

const transactionsSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTransactions.pending, (state: TransactionsState) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTransactions.fulfilled, (state: TransactionsState, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchTransactions.rejected, (state: TransactionsState, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch transactions';
            })
            .addCase(addTransaction.pending, (state: TransactionsState) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addTransaction.fulfilled, (state: TransactionsState, action) => {
                state.loading = false;
                state.items.unshift(action.payload);
            })
            .addCase(addTransaction.rejected, (state: TransactionsState, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to add transaction';
            });
    },
});

export default transactionsSlice.reducer;
