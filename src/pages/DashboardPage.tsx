import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../store';
import { fetchTransactions } from '../features/transactions/transactionsSlice';
import DashboardSummary from '../components/DashboardSummary';
import IncomeExpenseChart from '../components/IncomeExpenseChart';

const DashboardPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchTransactions({}) as any);
    }, [dispatch]);

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 to-blue-50">
            <div className="md:ml-64 p-4 md:p-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">💰 Expense Tracker</h1>
                        <p className="text-slate-600">Manage and track your finances with ease</p>
                    </div>

                    {/* Summary Section */}
                    <div className="mb-8">
                        <DashboardSummary />
                    </div>

                    {/* Chart Section */}
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h2 className="text-xl font-bold text-slate-900 mb-4">Income vs Expense Overview</h2>
                        <IncomeExpenseChart />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
