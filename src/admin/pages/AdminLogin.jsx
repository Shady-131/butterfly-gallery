import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Lock, Mail } from 'lucide-react';

export default function AdminLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { error: toastErrorMsg } = useToast();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        navigate('/admin/dashboard');
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #FDF0F3 0%, #F5ECD0 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Jost', sans-serif",
      padding: '20px',
    }}>
      <div style={{
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 10px 40px rgba(44,24,16,0.1)',
        width: '100%',
        maxWidth: '420px',
        padding: '48px 32px',
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '60px',
            height: '60px',
            margin: '0 auto 16px',
            background: '#F2C4CE',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '28px',
          }}>
            🦋
          </div>
          <h1 style={{
            fontSize: '24px',
            fontWeight: 600,
            color: '#2C1810',
            margin: '0 0 8px',
          }}>
            Butterfly Admin
          </h1>
          <p style={{ fontSize: '14px', color: '#9B8878', margin: 0 }}>
            Dashboard Login
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Email Input */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: 500,
              color: '#2C1810',
              marginBottom: '6px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>
              Email Address
            </label>
            <div style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
            }}>
              <Mail size={16} style={{
                position: 'absolute',
                left: '12px',
                color: '#C9A84C',
              }} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="admin@butterfly.com"
                style={{
                  width: '100%',
                  padding: '10px 12px 10px 36px',
                  border: `1px solid #F0E0D8`,
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontFamily: 'inherit',
                  transition: 'all 0.2s',
                  boxSizing: 'border-box',
                  outline: 'none',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#C9A84C';
                  e.target.style.boxShadow = '0 0 0 3px rgba(201,168,76,0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#F0E0D8';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: 500,
              color: '#2C1810',
              marginBottom: '6px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>
              Password
            </label>
            <div style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
            }}>
              <Lock size={16} style={{
                position: 'absolute',
                left: '12px',
                color: '#C9A84C',
              }} />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                style={{
                  width: '100%',
                  padding: '10px 12px 10px 36px',
                  border: `1px solid #F0E0D8`,
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontFamily: 'inherit',
                  transition: 'all 0.2s',
                  boxSizing: 'border-box',
                  outline: 'none',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#C9A84C';
                  e.target.style.boxShadow = '0 0 0 3px rgba(201,168,76,0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#F0E0D8';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
            <p style={{
              fontSize: '12px',
              color: '#9B8878',
              marginTop: '6px',
              fontStyle: 'italic',
            }}>
              Demo: admin@butterfly.com / admin123
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div style={{
              background: '#FEE2E2',
              color: '#DC2626',
              padding: '10px 12px',
              borderRadius: '6px',
              fontSize: '13px',
              border: '1px solid #FECACA',
            }}>
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              background: '#C9A84C',
              color: 'white',
              border: 'none',
              padding: '11px 16px',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              opacity: loading ? 0.7 : 1,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              marginTop: '8px',
            }}
            onMouseEnter={(e) => !loading && (e.target.style.background = '#B8963B')}
            onMouseLeave={(e) => !loading && (e.target.style.background = '#C9A84C')}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* Footer Note */}
        <p style={{
          fontSize: '12px',
          color: '#9B8878',
          textAlign: 'center',
          marginTop: '24px',
          lineHeight: 1.5,
        }}>
          This is a secure admin panel. <br />
          Only authorized administrators can access.
        </p>
      </div>

      <style>{`
        @media (max-width: 480px) {
          div[style*="padding: '48px 32px'"] {
            padding: 24px 20px !important;
          }
        }
      `}</style>
    </div>
  );
}
