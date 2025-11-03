import React from 'react';
import TransactionForm from '../components/TransactionForm';

const AddTransactionPage: React.FC = () => {
    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 to-blue-50">
            <div className="md:ml-64 p-4 md:p-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-slate-900 mb-2">Add Transaction</h1>
                    <p className="text-slate-600">Record a new income or expense</p>
                </div>

                {/* Form Section */}
                <div className="bg-white rounded-2xl shadow-lg p-6 max-w-2xl">
                    <TransactionForm />
                </div>
            </div>
        </div>
    );
};

export default AddTransactionPage;
