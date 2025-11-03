import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../store';
import { addTransaction } from '../features/transactions/transactionsSlice';
import { Plus } from 'lucide-react';

const categories = ['salary', 'groceries', 'entertainment', 'utilities', 'other'];

const TransactionForm: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [type, setType] = useState('income');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('salary');
    const [date, setDate] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!amount || !description || !date) {
            setError('All fields are required.');
            return;
        }
        setLoading(true);
        try {
            await dispatch(addTransaction({
                type,
                amount: Number(amount),
                description,
                category,
                date,
            }) as any);
            setAmount('');
            setDescription('');
            setCategory('salary');
            setDate('');
        } catch (err) {
            setError('Failed to add transaction.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                <select
                    value={type}
                    onChange={e => setType(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="income">💰 Income</option>
                    <option value="expense">💸 Expense</option>
                </select>

                <input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />

                <input
                    type="text"
                    placeholder="Description (e.g., Salary, Groceries)"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />

                <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>

                <input
                    type="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold px-6 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
                >
                    <Plus size={20} />
                    {loading ? 'Adding...' : 'Add Transaction'}
                </button>
            </div>
            {error && <div className="bg-red-100 text-red-700 p-3 rounded-lg text-sm">{error}</div>}
        </form>
    );
};

export default TransactionForm;
