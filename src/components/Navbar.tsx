import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { logout } from '../features/auth/authSlice';
import { LayoutDashboard, Plus, List, LogOut, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
    const location = useLocation();
    const dispatch = useDispatch<AppDispatch>();
    const authState = useSelector((state: RootState) => state.auth) as any;
    const token = authState?.token;
    const [isOpen, setIsOpen] = useState(false);

    if (!token) return null;

    const isActive = (path: string) => location.pathname === path;

    const navItems = [
        { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/transactions', label: 'Transactions', icon: List },
        { path: '/add-transaction', label: 'Add Transaction', icon: Plus },
    ];

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed top-4 left-4 z-50 md:hidden bg-blue-600 text-white p-2 rounded-lg"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Sidebar */}
            <div
                className={`fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-slate-900 to-slate-800 text-white shadow-lg transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    } md:translate-x-0 z-40`}
            >
                {/* Logo */}
                <div className="p-6 border-b border-slate-700">
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        💰 Expense Tracker
                    </h1>
                </div>

                {/* Navigation Items */}
                <nav className="p-4 space-y-2">
                    {navItems.map(({ path, label, icon: Icon }) => (
                        <Link
                            key={path}
                            to={path}
                            onClick={() => setIsOpen(false)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${isActive(path)
                                ? 'bg-blue-600 text-white font-bold shadow-lg'
                                : 'text-gray-300 hover:bg-slate-700 hover:text-white'
                                }`}
                            style={isActive(path) ? { color: '#ffffff' } : {}}
                        >
                            <Icon size={20} />
                            <span>{label}</span>
                        </Link>
                    ))}
                </nav>

                {/* Logout Button */}
                <div className="absolute bottom-4 left-4 right-4">
                    <button
                        onClick={() => {
                            dispatch(logout());
                            setIsOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 bg-red-600 hover:bg-red-700 rounded-lg transition text-white font-semibold"
                    >
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>
            </div>

            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
};

export default Navbar;
