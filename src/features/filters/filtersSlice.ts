import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface FiltersState {
    type: string;
    category: string;
    date: string;
}

const initialState: FiltersState = {
    type: '',
    category: '',
    date: '',
};

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setType(state: FiltersState, action: PayloadAction<string>) {
            state.type = action.payload;
        },
        setCategory(state: FiltersState, action: PayloadAction<string>) {
            state.category = action.payload;
        },
        setDate(state: FiltersState, action: PayloadAction<string>) {
            state.date = action.payload;
        },
        resetFilters(state: FiltersState) {
            state.type = '';
            state.category = '';
            state.date = '';
        },
    },
});

export const { setType, setCategory, setDate, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
