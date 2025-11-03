import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import { TrendingUp, TrendingDown } from 'lucide-react';

const DashboardSummary: React.FC = () => {

    const transactionsState = useSelector((state: RootState) => state.transactions) as any;
    const transactions = Array.isArray(transactionsState?.items) ? transactionsState.items : [];
    const income = transactions.filter((t: any) => t.type === 'income').reduce((sum: number, t: any) => sum + t.amount, 0);
    const expense = transactions.filter((t: any) => t.type === 'expense').reduce((sum: number, t: any) => sum + t.amount, 0);
    const balance = income - expense;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {/* Income Card */}
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">Total Income</h2>
                    <TrendingUp size={28} className="text-green-200" />
                </div>
                <p className="text-3xl md:text-4xl font-bold">₹{income.toLocaleString()}</p>
                <p className="text-green-100 text-sm mt-2">Total earned</p>
            </div>

            {/* Expense Card */}
            <div className="bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl shadow-lg p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">Total Expense</h2>
                    <TrendingDown size={28} className="text-red-200" />
                </div>
                <p className="text-3xl md:text-4xl font-bold">₹{expense.toLocaleString()}</p>
                <p className="text-red-100 text-sm mt-2">Total spent</p>
            </div>

            {/* Balance Card */}
            <div className={`bg-gradient-to-br ${balance >= 0 ? 'from-blue-500 to-blue-600' : 'from-orange-500 to-orange-600'} rounded-2xl shadow-lg p-6 text-white`}>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">Balance</h2>
                    <span className="text-3xl">{balance >= 0 ? '✓' : '⚠'}</span>
                </div>
                <p className="text-3xl md:text-4xl font-bold">₹{balance.toLocaleString()}</p>
                <p className={`text-sm mt-2 ${balance >= 0 ? 'text-blue-100' : 'text-orange-100'}`}>{balance >= 0 ? 'Surplus' : 'Deficit'}</p>
            </div>
        </div>
    );
};

export default DashboardSummary;
