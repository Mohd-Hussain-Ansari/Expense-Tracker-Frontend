import React, { useEffect, useRef } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import AuthPage from './pages/AuthPage';
import TransactionsPage from './pages/TransactionsPage';
import AddTransactionPage from './pages/AddTransactionPage';
import Navbar from './components/Navbar';
import { useSelector } from 'react-redux';
import type { RootState } from './store';

const AppRoutes: React.FC = () => {
    const authState = useSelector((state: RootState) => state.auth) as any;
    const token = authState?.token;
    const navigate = useNavigate();
    const hasRedirected = useRef(false);

    useEffect(() => {
        if (token && !hasRedirected.current) {
            hasRedirected.current = true;
            navigate('/dashboard');
        }
        if (!token) {
            hasRedirected.current = false;
        }
    }, [token, navigate]);

    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/dashboard" element={token ? <DashboardPage /> : <Navigate to="/auth" />} />
                <Route path="/transactions" element={token ? <TransactionsPage /> : <Navigate to="/auth" />} />
                <Route path="/add-transaction" element={token ? <AddTransactionPage /> : <Navigate to="/auth" />} />
                <Route path="*" element={<Navigate to={token ? "/dashboard" : "/auth"} />} />
            </Routes>
        </>
    );
};

export default AppRoutes;
