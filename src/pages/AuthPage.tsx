import React from 'react';
import AuthForm from '../components/AuthForm';


const AuthPage: React.FC = () => (
    <div className="min-h-screen w-full bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 flex items-center justify-center p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
            {/* Left Side - Branding */}
            <div className="hidden md:flex flex-col justify-center text-white space-y-6">
                <div>
                    <h1 className="text-4xl font-bold mb-2">Expense Tracker</h1>
                    <p className="text-xl text-gray-400">Manage your finances effortlessly</p>
                </div>
                <div className="space-y-4">
                    <div className="flex gap-4">
                        <div className="bg-blue-500 p-3 rounded-lg">
                            <span className="text-2xl">💰</span>
                        </div>
                        <div>
                            <h3 className="font-semibold">Track Income</h3>
                            <p className="text-gray-400 text-sm">Monitor all your income sources</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="bg-red-500 p-3 rounded-lg">
                            <span className="text-2xl">📊</span>
                        </div>
                        <div>
                            <h3 className="font-semibold">Track Expenses</h3>
                            <p className="text-gray-400 text-sm">Categorize and analyze spending</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="bg-green-500 p-3 rounded-lg">
                            <span className="text-2xl">📈</span>
                        </div>
                        <div>
                            <h3 className="font-semibold">Insights</h3>
                            <p className="text-gray-400 text-sm">Get detailed financial insights</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex items-center justify-center">
                <AuthForm />
            </div>
        </div>
    </div>
);

export default AuthPage;
