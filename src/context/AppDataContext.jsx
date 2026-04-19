import React, { createContext, useState, useContext, useEffect } from 'react';
import { settingsService, productsService, ordersService } from '../services/database';

const AppDataContext = createContext(null);

export function AppDataProvider({ children }) {
  const [settings, setSettings] = useState(null);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load all data on mount
  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      setLoading(true);
      const [settingsData, productsData, ordersData] = await Promise.all([
        settingsService.getSettings(),
        productsService.getProducts(),
        ordersService.getOrders(),
      ]);
      setSettings(settingsData);
      setProducts(productsData);
      setOrders(ordersData);
    } catch (err) {
      console.error('Error loading app data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Settings methods
  const updateSettings = async (updates) => {
    const updated = await settingsService.updateSettings(updates);
    setSettings(updated);
    return updated;
  };

  const updateSocialMedia = async (social) => {
    const updated = await settingsService.updateSocialMedia(social);
    setSettings(updated);
    return updated;
  };

  // Products methods
  const addProduct = async (product) => {
    const newProduct = await productsService.addProduct(product);
    setProducts([...products, newProduct]);
    return newProduct;
  };

  const updateProduct = async (id, updates) => {
    const updated = await productsService.updateProduct(id, updates);
    setProducts(products.map(p => p.id === parseInt(id) ? updated : p));
    return updated;
  };

  const deleteProduct = async (id) => {
    await productsService.deleteProduct(id);
    setProducts(products.filter(p => p.id !== parseInt(id)));
    return true;
  };

  // Orders methods
  const addOrder = async (order) => {
    const newOrder = await ordersService.addOrder(order);
    setOrders([newOrder, ...orders]);
    return newOrder;
  };

  const updateOrderStatus = async (id, status) => {
    const updated = await ordersService.updateOrderStatus(id, status);
    setOrders(orders.map(o => o.id === id ? updated : o));
    return updated;
  };

  const value = {
    settings,
    products,
    orders,
    loading,
    updateSettings,
    updateSocialMedia,
    addProduct,
    updateProduct,
    deleteProduct,
    addOrder,
    updateOrderStatus,
    refreshData: loadAllData,
  };

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

export function useAppData() {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error('useAppData must be used within AppDataProvider');
  }
  return context;
}
