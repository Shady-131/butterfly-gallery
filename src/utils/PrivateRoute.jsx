import React from 'react';
import { Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function PrivateRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: '#FDF8F5',
        fontFamily: "'Tajawal', 'Jost', 'Segoe UI', sans-serif",
      }}>
        <div style={{ textAlign: 'center' }}>
          <Loader2 size={40} color="#C9A84C" style={{ marginBottom: '16px', animation: 'spin 1s linear infinite' }} />
          <p style={{ color: '#9B8878' }}>Loading...</p>
        </div>
        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
