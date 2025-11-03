import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { setType, setCategory, setDate } from '../features/filters/filtersSlice';
import { fetchTransactions } from '../features/transactions/transactionsSlice';

const categories = ['salary', 'groceries', 'entertainment', 'other'];

const FilterControls: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const filtersState = useSelector((state: RootState) => state.filters) as any;
    const { type = '', category = '', date = '' } = filtersState || {};

    const handleFilter = () => {
        dispatch(fetchTransactions({ type, category, date }));
    };

    return (
        <div className="flex gap-4 mb-6">
            <select value={type} onChange={e => dispatch(setType(e.target.value))} className="border p-2 rounded">
                <option value="">All Types</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
            </select>
            <select value={category} onChange={e => dispatch(setCategory(e.target.value))} className="border p-2 rounded">
                <option value="">All Categories</option>
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
            <input type="date" value={date} onChange={e => dispatch(setDate(e.target.value))} className="border p-2 rounded" />
            <button onClick={handleFilter} className="bg-gray-500 text-white px-4 py-2 rounded">Filter</button>
        </div>
    );
};

export default FilterControls;
