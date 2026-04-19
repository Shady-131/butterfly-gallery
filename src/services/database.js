/**
 * Local Database Service - Handles all data persistence
 * Can be easily migrated to Firebase by updating these methods
 */

const DB_PREFIX = 'butterfly_gallery_';

// Default app data structure
const DEFAULT_DATA = {
  settings: {
    brandName: 'Butterfly Gallery',
    brandTagline: 'Elegance Without Limits',
    heroTitle: 'Your Elegance',
    heroBadge: '✦ Spring Collection 2025',
    colors: {
      primary: '#F2C4CE',
      secondary: '#C9A84C',
    },
    social: {
      instagram: 'https://www.instagram.com/butterfly.gallery510?igsh=cXo5bTgzcjk0OGZv',
      facebook: 'https://www.facebook.com/share/g/1Yi5cNkjpN/?mibextid=wwXIfr',
      tiktok: 'https://www.tiktok.com/@butterfly',
      whatsapp: '+201001234567',
    },
  },
  products: [],
  orders: [],
  users: {
    admin: {
      email: 'admin@butterfly.com',
      password: 'admin123', // CHANGE THIS IN PRODUCTION
      role: 'admin',
    },
  },
};

// ─── Auth Service ───────────────────────────────────────────────────────────
export const authService = {
  login: async (email, password) => {
    const users = JSON.parse(localStorage.getItem(DB_PREFIX + 'users') || '{}');
    const user = users.admin;

    if (!user || user.email !== email || user.password !== password) {
      throw new Error('Invalid credentials');
    }

    const token = btoa(`${email}:${Date.now()}`);
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
    const newOrder = {
      ...order,
      id: `ORDER-${Date.now()}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
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

  // Create default users if not exists
  const usersKey = DB_PREFIX + 'users';
  if (!localStorage.getItem(usersKey)) {
    localStorage.setItem(usersKey, JSON.stringify(DEFAULT_DATA.users));
  }
};
