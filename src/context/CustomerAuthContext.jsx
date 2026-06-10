import React, { createContext, useState, useContext } from 'react';
import { customerAuthService } from '../services/database';

const CustomerAuthContext = createContext(null);

// Separate from the admin AuthContext on purpose: customers use the public
// login/signup modal, admins use /admin/login. They never mix.
export function CustomerAuthProvider({ children }) {
  const [customer, setCustomer] = useState(() => customerAuthService.getSession());

  const signup = async ({ name, email, phone, password }) => {
    try {
      const safe = await customerAuthService.signup({ name, email, phone, password });
      setCustomer(safe);
      return { success: true, customer: safe };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const login = async ({ email, password }) => {
    try {
      const safe = await customerAuthService.login({ email, password });
      setCustomer(safe);
      return { success: true, customer: safe };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const logout = () => {
    customerAuthService.logout();
    setCustomer(null);
  };

  return (
    <CustomerAuthContext.Provider value={{ customer, isLoggedIn: !!customer, signup, login, logout }}>
      {children}
    </CustomerAuthContext.Provider>
  );
}

export function useCustomerAuth() {
  const ctx = useContext(CustomerAuthContext);
  if (!ctx) throw new Error('useCustomerAuth must be used within CustomerAuthProvider');
  return ctx;
}
