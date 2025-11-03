import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';

const TransactionList: React.FC = () => {
    const transactionsState = useSelector((state: RootState) => state.transactions) as any;
    const { items = [], loading, error } = transactionsState || {};

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-md border-collapse">
                <thead className="bg-slate-100 border-b-2 border-slate-200">
                    <tr>
                        <th className="py-3 px-4 text-left text-slate-900 font-semibold">Type</th>
                        <th className="py-3 px-4 text-left text-slate-900 font-semibold">Amount</th>
                        <th className="py-3 px-4 text-left text-slate-900 font-semibold">Description</th>
                        <th className="py-3 px-4 text-left text-slate-900 font-semibold">Category</th>
                        <th className="py-3 px-4 text-left text-slate-900 font-semibold">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {items.length === 0 ? (
                        <tr>
                            <td colSpan={5} className="py-6 px-4 text-center text-slate-500">
                                No transactions found
                            </td>
                        </tr>
                    ) : (
                        items.map((t: any) => (
                            <tr key={t._id} className="border-b border-slate-200 hover:bg-slate-50 transition">
                                <td className="py-3 px-4 text-slate-900 font-medium">{t.type}</td>
                                <td className="py-3 px-4 text-slate-900 font-semibold">₹{t.amount}</td>
                                <td className="py-3 px-4 text-slate-700">{t.description}</td>
                                <td className="py-3 px-4 text-slate-700 capitalize">{t.category}</td>
                                <td className="py-3 px-4 text-slate-700">{new Date(t.date).toLocaleDateString()}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionList;
