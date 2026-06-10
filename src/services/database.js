/**
 * Local Database Service - Handles all data persistence
 * Can be easily migrated to Firebase by updating these methods
 */

import { PRODUCTS } from '../constants/data';

const DB_PREFIX = 'butterfly_gallery_';

// Default app data structure
const DEFAULT_DATA = {
  settings: {
    brandName: 'Butterfly Gallery',
    brandTagline: 'Elegance Without Limits',
    heroTitle: 'Your Elegance',
    heroBadge: 'Spring Collection 2025',
    colors: {
      primary: '#F2C4CE',
      secondary: '#C9A84C',
    },
    social: {
      instagram: 'https://www.instagram.com/butterfly.gallery510?igsh=cXo5bTgzcjk0OGZv',
      facebook: 'https://www.facebook.com/share/g/1Yi5cNkjpN/?mibextid=wwXIfr',
      tiktok: 'https://www.tiktok.com/@butterflyg510?_r=1&_t=ZS-95eOx6HpejJ',
      whatsapp: '201001234567',
    },
  },
  // Seed the storefront catalog so admin and storefront share one source.
  products: PRODUCTS,
  orders: [],
};

// ─── Admin accounts (demo only — plaintext passwords, no backend) ─────────────
// These two are the source of truth for /admin/login. Customers are stored
// separately (customerAuthService) and can never access the dashboard.
const ADMIN_ACCOUNTS = [
  { id: 'admin-rana',  name: 'Rana',  email: 'rana@butterfly.com',  password: 'rana123',  role: 'admin' },
  { id: 'admin-menna', name: 'Menna', email: 'menna@butterfly.com', password: 'menna123', role: 'admin' },
];

// Strip the password before exposing an admin to the session/app.
const safeAdmin = (a) => (a ? { id: a.id, name: a.name, email: a.email, role: a.role } : null);

// ─── Auth Service (admin) ─────────────────────────────────────────────────────
export const authService = {
  accounts: ADMIN_ACCOUNTS.map(safeAdmin),

  login: async (email, password) => {
    const cleanEmail = String(email || '').trim().toLowerCase();
    const account = ADMIN_ACCOUNTS.find(a => a.email === cleanEmail);

    if (!account || account.password !== password) {
      throw new Error('Invalid credentials');
    }

    const user = safeAdmin(account);
    const token = btoa(`${account.email}:${Date.now()}`);
    localStorage.setItem(DB_PREFIX + 'authToken', token);
    localStorage.setItem(DB_PREFIX + 'currentUser', JSON.stringify(user));

    return { user, token };
  },

  logout: () => {
    localStorage.removeItem(DB_PREFIX + 'authToken');
    localStorage.removeItem(DB_PREFIX + 'currentUser');
  },

  getCurrentUser: () => {
    const user = localStorage.getItem(DB_PREFIX + 'currentUser');
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem(DB_PREFIX + 'authToken');
  },
};

// ─── Audit Log Service (admin activity trail) ─────────────────────────────────
const ACTIVITY_KEY = DB_PREFIX + 'admin_activity_logs';

export const auditLogService = {
  getLogs: () => {
    try { return JSON.parse(localStorage.getItem(ACTIVITY_KEY) || '[]'); }
    catch { return []; }
  },

  addLog: (entry = {}) => {
    const logs = auditLogService.getLogs();
    const log = {
      id: `LOG-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      adminId: entry.adminId || null,
      adminName: entry.adminName || 'Unknown',
      adminEmail: entry.adminEmail || '',
      action: entry.action || '',
      entityType: entry.entityType || '',
      entityId: entry.entityId ?? null,
      entityName: entry.entityName ?? null,
      details: entry.details || '',
      before: entry.before ?? null,
      after: entry.after ?? null,
      createdAt: new Date().toISOString(),
    };
    logs.unshift(log); // newest first
    // Keep the demo log bounded so localStorage never bloats.
    localStorage.setItem(ACTIVITY_KEY, JSON.stringify(logs.slice(0, 500)));
    return log;
  },

  clearLogs: () => localStorage.removeItem(ACTIVITY_KEY),
};

// Convenience helper for admin action handlers.
export const logAdminAction = (admin, action, entityType, details = '', extra = {}) =>
  auditLogService.addLog({
    adminId: admin?.id,
    adminName: admin?.name,
    adminEmail: admin?.email,
    action,
    entityType,
    details,
    entityId: extra.entityId,
    entityName: extra.entityName,
    before: extra.before,
    after: extra.after,
  });

// ─── Customer Auth Service (demo only — plaintext passwords in localStorage) ──
export const customerAuthService = {
  getCustomers: () => {
    try { return JSON.parse(localStorage.getItem(DB_PREFIX + 'customers') || '[]'); }
    catch { return []; }
  },

  getSession: () => {
    try { return JSON.parse(localStorage.getItem(DB_PREFIX + 'customerSession') || 'null'); }
    catch { return null; }
  },

  // Strip the password before exposing a customer to the app/session.
  _safe: (c) => (c ? { id: c.id, name: c.name, email: c.email, phone: c.phone || '', createdAt: c.createdAt } : null),

  signup: async ({ name, email, phone, password }) => {
    const customers = customerAuthService.getCustomers();
    const cleanEmail = String(email || '').trim().toLowerCase();
    if (!name || !cleanEmail || !password) throw new Error('MISSING_FIELDS');
    // Demo admin emails (Rana/Menna) are reserved for /admin/login — never let a
    // customer register with one (keeps admin and customer auth clearly separate).
    if (ADMIN_ACCOUNTS.some(a => a.email === cleanEmail)) throw new Error('ADMIN_EMAIL_RESERVED');
    if (customers.some(c => c.email === cleanEmail)) throw new Error('EMAIL_EXISTS');

    const customer = {
      id: `CUST-${Date.now()}`,
      name: String(name).trim(),
      email: cleanEmail,
      phone: phone ? String(phone).trim() : '',
      password, // demo only — never do this in production
      createdAt: new Date().toISOString(),
    };
    customers.push(customer);
    localStorage.setItem(DB_PREFIX + 'customers', JSON.stringify(customers));

    const safe = customerAuthService._safe(customer);
    localStorage.setItem(DB_PREFIX + 'customerSession', JSON.stringify(safe));
    return safe;
  },

  login: async ({ email, password }) => {
    const customers = customerAuthService.getCustomers();
    const cleanEmail = String(email || '').trim().toLowerCase();
    const found = customers.find(c => c.email === cleanEmail);
    if (!found) throw new Error('NO_EMAIL');
    if (found.password !== password) throw new Error('WRONG_PASSWORD');

    const safe = customerAuthService._safe(found);
    localStorage.setItem(DB_PREFIX + 'customerSession', JSON.stringify(safe));
    return safe;
  },

  logout: () => {
    localStorage.removeItem(DB_PREFIX + 'customerSession');
  },
};

// ─── Settings Service ─────────────────────────────────────────────────────
export const settingsService = {
  getSettings: async () => {
    let data = JSON.parse(localStorage.getItem(DB_PREFIX + 'settings') || '{}');
    if (Object.keys(data).length === 0) {
      data = DEFAULT_DATA.settings;
      localStorage.setItem(DB_PREFIX + 'settings', JSON.stringify(data));
    }
    return data;
  },

  updateSettings: async (updates) => {
    const current = await settingsService.getSettings();
    const updated = { ...current, ...updates };
    localStorage.setItem(DB_PREFIX + 'settings', JSON.stringify(updated));
    return updated;
  },

  updateSocialMedia: async (social) => {
    const current = await settingsService.getSettings();
    current.social = { ...current.social, ...social };
    localStorage.setItem(DB_PREFIX + 'settings', JSON.stringify(current));
    return current;
  },
};

// ─── Products Service ─────────────────────────────────────────────────────
export const productsService = {
  getProducts: async () => {
    let products = JSON.parse(localStorage.getItem(DB_PREFIX + 'products') || '[]');
    if (products.length === 0) {
      products = DEFAULT_DATA.products;
      localStorage.setItem(DB_PREFIX + 'products', JSON.stringify(products));
    }
    return products;
  },

  getProductById: async (id) => {
    const products = await productsService.getProducts();
    return products.find(p => p.id === parseInt(id));
  },

  addProduct: async (product) => {
    const products = await productsService.getProducts();
    const newProduct = {
      ...product,
      id: Math.max(...products.map(p => p.id), 0) + 1,
      createdAt: new Date().toISOString(),
    };
    products.push(newProduct);
    localStorage.setItem(DB_PREFIX + 'products', JSON.stringify(products));
    return newProduct;
  },

  updateProduct: async (id, updates) => {
    const products = await productsService.getProducts();
    const index = products.findIndex(p => p.id === parseInt(id));
    if (index === -1) throw new Error('Product not found');
    products[index] = { ...products[index], ...updates, updatedAt: new Date().toISOString() };
    localStorage.setItem(DB_PREFIX + 'products', JSON.stringify(products));
    return products[index];
  },

  deleteProduct: async (id) => {
    const products = await productsService.getProducts();
    const filtered = products.filter(p => p.id !== parseInt(id));
    localStorage.setItem(DB_PREFIX + 'products', JSON.stringify(filtered));
    return true;
  },
};

// ─── Orders Service ─────────────────────────────────────────────────────
export const ordersService = {
  getOrders: async () => {
    return JSON.parse(localStorage.getItem(DB_PREFIX + 'orders') || '[]');
  },

  getOrderById: async (id) => {
    const orders = await ordersService.getOrders();
    return orders.find(o => o.id === id);
  },

  addOrder: async (order) => {
    const orders = await ordersService.getOrders();
    const now = new Date().toISOString();
    const newOrder = {
      ...order,
      id: `ORDER-${Date.now()}`,
      status: 'pending',
      createdAt: now,
      updatedAt: now,
    };
    orders.push(newOrder);
    localStorage.setItem(DB_PREFIX + 'orders', JSON.stringify(orders));
    return newOrder;
  },

  updateOrderStatus: async (id, status) => {
    const orders = await ordersService.getOrders();
    const order = orders.find(o => o.id === id);
    if (!order) throw new Error('Order not found');
    order.status = status;
    order.updatedAt = new Date().toISOString();
    localStorage.setItem(DB_PREFIX + 'orders', JSON.stringify(orders));
    return order;
  },
};

// Initialize database with default data
export const initializeDatabase = () => {
  // Create default products from constants if not exists
  const productsKey = DB_PREFIX + 'products';
  if (!localStorage.getItem(productsKey)) {
    localStorage.setItem(productsKey, JSON.stringify(DEFAULT_DATA.products));
  }

  // Create default settings if not exists
  const settingsKey = DB_PREFIX + 'settings';
  if (!localStorage.getItem(settingsKey)) {
    localStorage.setItem(settingsKey, JSON.stringify(DEFAULT_DATA.settings));
  }

  // Admin accounts (Rana, Menna) live in code (ADMIN_ACCOUNTS) — no seeding needed.
  // Remove any stale single-admin "users" blob from older demo builds.
  localStorage.removeItem(DB_PREFIX + 'users');
};
