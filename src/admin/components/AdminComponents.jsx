import React from 'react';

export function AdminHeader({ title, subtitle, actions = [] }) {
  return (
    <div style={{
      marginBottom: '32px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: '20px',
      flexWrap: 'wrap',
    }}>
      <div>
        <h1 style={{
          fontSize: '28px',
          fontWeight: 700,
          color: '#2C1810',
          margin: '0 0 8px',
        }}>
          {title}
        </h1>
        {subtitle && (
          <p style={{
            fontSize: '14px',
            color: '#9B8878',
            margin: 0,
          }}>
            {subtitle}
          </p>
        )}
      </div>
      <div style={{ display: 'flex', gap: '12px' }}>
        {actions.map((action, idx) => (
          <button
            key={idx}
            onClick={action.onClick}
            style={{
              background: action.variant === 'outline' ? 'transparent' : '#C9A84C',
              color: action.variant === 'outline' ? '#C9A84C' : 'white',
              border: `1px solid ${action.variant === 'outline' ? '#C9A84C' : 'transparent'}`,
              padding: '10px 16px',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
            onMouseEnter={(e) => {
              if (action.variant === 'outline') {
                e.target.style.background = '#C9A84C';
                e.target.style.color = 'white';
              } else {
                e.target.style.background = '#B8963B';
              }
            }}
            onMouseLeave={(e) => {
              if (action.variant === 'outline') {
                e.target.style.background = 'transparent';
                e.target.style.color = '#C9A84C';
              } else {
                e.target.style.background = '#C9A84C';
              }
            }}
          >
            {action.icon}
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function DataTable({ columns, data, actions = [] }) {
  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      border: '1px solid #F0E0D8',
      overflow: 'hidden',
    }}>
      {data.length === 0 ? (
        <div style={{
          padding: '48px 24px',
          textAlign: 'center',
          color: '#9B8878',
        }}>
          <p style={{ fontSize: '14px', margin: 0 }}>No data found</p>
        </div>
      ) : (
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: '14px',
        }}>
          <thead>
            <tr style={{ background: '#FDF0F3', borderBottom: '1px solid #F0E0D8' }}>
              {columns.map(col => (
                <th
                  key={col.key}
                  style={{
                    padding: '12px 16px',
                    textAlign: 'left',
                    fontWeight: 600,
                    color: '#2C1810',
                    fontSize: '13px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  {col.label}
                </th>
              ))}
              {actions.length > 0 && (
                <th style={{
                  padding: '12px 16px',
                  textAlign: 'center',
                  fontWeight: 600,
                  color: '#2C1810',
                  fontSize: '13px',
                }}>
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr
                key={idx}
                style={{
                  borderBottom: '1px solid #F0E0D8',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#FDF0F3'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                {columns.map(col => (
                  <td
                    key={col.key}
                    style={{
                      padding: '12px 16px',
                      color: '#2C1810',
                    }}
                  >
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
                {actions.length > 0 && (
                  <td style={{
                    padding: '12px 16px',
                    textAlign: 'center',
                  }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                      {actions.map((action, aIdx) => (
                        <button
                          key={aIdx}
                          onClick={() => action.handler(row)}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: action.color || '#C9A84C',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            transition: 'background 0.2s',
                            fontSize: '12px',
                            fontWeight: 500,
                          }}
                          onMouseEnter={(e) => e.target.style.background = 'rgba(201,168,76,0.1)'}
                          onMouseLeave={(e) => e.target.style.background = 'transparent'}
                          title={action.label}
                        >
                          {action.icon ? action.icon : action.label}
                        </button>
                      ))}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export function FormInput({ label, name, value, onChange, type = 'text', placeholder, required = false, error }) {
  return (
    <div style={{ marginBottom: '16px' }}>
      {label && (
        <label style={{
          display: 'block',
          fontSize: '13px',
          fontWeight: 500,
          color: '#2C1810',
          marginBottom: '6px',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}>
          {label} {required && <span style={{ color: '#ef4444' }}>*</span>}
        </label>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '10px 12px',
          border: `1px solid ${error ? '#ef4444' : '#F0E0D8'}`,
          borderRadius: '6px',
          fontSize: '14px',
          fontFamily: 'inherit',
          transition: 'all 0.2s',
          boxSizing: 'border-box',
          outline: 'none',
        }}
        onFocus={(e) => {
          e.target.style.borderColor = error ? '#ef4444' : '#C9A84C';
          e.target.style.boxShadow = `0 0 0 3px ${error ? 'rgba(239,68,68,0.1)' : 'rgba(201,168,76,0.1)'}`;
        }}
        onBlur={(e) => {
          e.target.style.borderColor = error ? '#ef4444' : '#F0E0D8';
          e.target.style.boxShadow = 'none';
        }}
      />
      {error && (
        <p style={{
          fontSize: '12px',
          color: '#ef4444',
          margin: '4px 0 0',
        }}>
          {error}
        </p>
      )}
    </div>
  );
}

export function FormTextarea({ label, name, value, onChange, placeholder, required = false, rows = 4 }) {
  return (
    <div style={{ marginBottom: '16px' }}>
      {label && (
        <label style={{
          display: 'block',
          fontSize: '13px',
          fontWeight: 500,
          color: '#2C1810',
          marginBottom: '6px',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}>
          {label} {required && <span style={{ color: '#ef4444' }}>*</span>}
        </label>
      )}
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        style={{
          width: '100%',
          padding: '10px 12px',
          border: '1px solid #F0E0D8',
          borderRadius: '6px',
          fontSize: '14px',
          fontFamily: 'inherit',
          transition: 'all 0.2s',
          boxSizing: 'border-box',
          outline: 'none',
          resize: 'vertical',
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
  );
}

export function Badge({ variant = 'default', children }) {
  const variants = {
    default: { bg: '#E0F2FE', color: '#0369A1' },
    success: { bg: '#DCFCE7', color: '#15803D' },
    warning: { bg: '#FEF08A', color: '#854D0E' },
    danger: { bg: '#FEE2E2', color: '#991B1B' },
  };

  const style = variants[variant];

  return (
    <span style={{
      display: 'inline-block',
      background: style.bg,
      color: style.color,
      padding: '4px 10px',
      borderRadius: '12px',
      fontSize: '12px',
      fontWeight: 600,
      textTransform: 'capitalize',
    }}>
      {children}
    </span>
  );
}

export function Modal({ isOpen, title, onClose, children, size = 'md' }) {
  if (!isOpen) return null;

  const sizes = {
    sm: '400px',
    md: '600px',
    lg: '800px',
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px',
    }}>
      <div style={{
        background: 'white',
        borderRadius: '12px',
        width: '100%',
        maxWidth: sizes[size],
        maxHeight: '90vh',
        overflow: 'auto',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
      }}>
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid #F0E0D8',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'sticky',
          top: 0,
          background: 'white',
        }}>
          <h2 style={{
            fontSize: '18px',
            fontWeight: 600,
            color: '#2C1810',
            margin: 0,
          }}>
            {title}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '24px',
              color: '#9B8878',
              padding: 0,
              width: 24,
              height: 24,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ×
          </button>
        </div>
        <div style={{ padding: '24px' }}>
          {children}
        </div>
      </div>
    </div>
  );
}
