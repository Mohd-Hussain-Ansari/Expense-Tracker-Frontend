import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { login, register, logout } from '../features/auth/authSlice';
import { Mail, Lock, User, LogOut } from 'lucide-react';

const AuthForm: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { token, loading, error } = useSelector((state: RootState) => state.auth);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isLogin) {
            dispatch(login({ email, password }));
        } else {
            dispatch(register({ name, email, password }));
        }
    };

    if (token) {
        return (
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-6 rounded-lg shadow-lg flex flex-col items-center gap-4 max-w-xs w-full">
                <div className="text-white text-center">
                    <p className="text-sm opacity-90">Welcome back!</p>
                    <p className="text-lg font-semibold mt-1">{email || 'User'}</p>
                </div>
                <button
                    onClick={() => dispatch(logout())}
                    className="w-full bg-white text-red-500 font-semibold px-4 py-2 rounded-lg hover:bg-red-50 transition flex items-center justify-center gap-2"
                >
                    <LogOut size={18} />
                    Logout
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-2xl overflow-hidden max-w-sm mx-auto w-full">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
                <h2 className="text-2xl font-bold">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
                <p className="text-blue-100 text-sm mt-1">{isLogin ? 'Sign in to your account' : 'Join us today'}</p>
            </div>

            {/* Form Fields */}
            <div className="p-6 space-y-4">
                {!isLogin && (
                    <div className="relative">
                        <User className="absolute left-3 top-3 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        />
                    </div>
                )}

                <div className="relative">
                    <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                    />
                </div>

                <div className="relative">
                    <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                    />
                </div>

                {error && <div className="bg-red-100 text-red-700 p-3 rounded-lg text-sm">{error}</div>}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition disabled:opacity-50 mt-6"
                >
                    {loading ? 'Please wait...' : isLogin ? 'Sign In' : 'Create Account'}
                </button>
            </div>

            {/* Toggle */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 text-center">
                <p className="text-gray-600 text-sm">
                    {isLogin ? "Don't have an account? " : 'Already have an account? '}
                    <button
                        type="button"
                        onClick={() => { setIsLogin(!isLogin); setName(''); setEmail(''); setPassword(''); }}
                        className="text-blue-600 font-semibold hover:text-blue-700 transition"
                    >
                        {isLogin ? 'Register' : 'Sign In'}
                    </button>
                </p>
            </div>
        </form>
    );
};

export default AuthForm;
