import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#22c55e', '#ef4444'];

const IncomeExpenseChart: React.FC = () => {
    const transactionsState = useSelector((state: RootState) => state.transactions) as any;
    const transactions = Array.isArray(transactionsState?.items) ? transactionsState.items : [];
    const income = transactions.filter((t: any) => t.type === 'income').reduce((sum: number, t: any) => sum + t.amount, 0);
    const expense = transactions.filter((t: any) => t.type === 'expense').reduce((sum: number, t: any) => sum + t.amount, 0);
    const data = [
        { name: 'Income', value: income },
        { name: 'Expense', value: expense },
    ];

    return (
        <div style={{ width: '100%', height: '400px', display: 'flex', flexDirection: 'column' }}>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
                        {data.map((_entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default IncomeExpenseChart;
