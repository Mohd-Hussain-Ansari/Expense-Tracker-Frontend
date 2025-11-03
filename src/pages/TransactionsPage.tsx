import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { fetchTransactions } from '../features/transactions/transactionsSlice';
import FilterControls from '../components/FilterControls';
import TransactionList from '../components/TransactionList';

const TransactionsPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const filters = useSelector((state: RootState) => state.filters) as any;
    const { type = '', category = '', date = '' } = filters || {};

    useEffect(() => {
        dispatch(
            fetchTransactions({
                type: type || '',
                category: category || '',
                date: date || '',
            })
        );
    }, [dispatch, type, category, date]);

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 to-blue-50">
            <div className="md:ml-64 p-4 md:p-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-slate-900 mb-2">Transactions</h1>
                    <p className="text-slate-600">View and filter your transactions</p>
                </div>

                {/* Filter Section */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                    <h2 className="text-xl font-semibold text-slate-900 mb-4">Filters</h2>
                    <FilterControls />
                </div>

                {/* Transactions List Section */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h2 className="text-xl font-semibold text-slate-900 mb-4">All Transactions</h2>
                    <TransactionList />
                </div>
            </div>
        </div>
    );
};

export default TransactionsPage;
