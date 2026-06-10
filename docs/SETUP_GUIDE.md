# 🚀 Butterfly Gallery - Setup Guide

## ⚡ Quick Start (5 minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm start
```

The app will open at: **http://localhost:3000**

### 3. Access Admin Dashboard
```
URL: http://localhost:3000/admin/login
Email: admin@butterfly.com
Password: admin123
```

---

## 📦 What's Included

✅ Full Admin Dashboard  
✅ Product Management (Add, Edit, Delete)  
✅ Orders Management System  
✅ Social Media Management  
✅ Website Content Editor  
✅ Responsive Design  
✅ Bilingual Support (AR/EN)  
✅ Toast Notifications  
✅ WhatsApp Integration  

---

## 🎯 Key Features Explained

### Admin Dashboard
- **Dark theme** with professional sidebar
- **Real-time updates** across website
- **Fully responsive** on all devices
- **No code changes needed** - manage everything from dashboard

### Product Management
1. Go to Dashboard → Products
2. Click "Add Product"
3. Fill in details:
   - Product name (Arabic & English)
   - Price
   - Category (Jewelry, Accessories, Handbags)
   - Image URL
4. Products appear immediately on website

### Orders System
- View all customer orders
- See delivery details
- Update status (Pending → Completed)
- Track customer information

### Website Content
- Edit brand name
- Customize hero text
- Change colors
- Update social media links

---

## 🔧 Configuration

### Change Admin Credentials
Edit `src/services/database.js`:
```javascript
users: {
  admin: {
    email: 'your-email@example.com',
    password: 'your-secure-password',
    role: 'admin',
  },
}
```

### Update Social Links
1. Admin Dashboard → Settings
2. Update links for:
   - Instagram
   - Facebook
   - TikTok
   - WhatsApp

### Customize Colors
Edit `src/constants/data.js`:
```javascript
export const G = {
  pink: "#F2C4CE",        // Change brand colors
  gold: "#C9A84C",
  // ... more colors
};
```

---

## 📱 Features by Device

### Desktop
- Full admin dashboard
- All features available
- Optimized layout

### Tablet
- Sidebar collapses
- Touch-friendly buttons
- Full functionality

### Mobile
- Responsive grid
- Collapsible menu
- Optimized for small screens

---

## 🗂️ Folder Structure

```
src/
├── admin/          → Admin dashboard & login
├── components/     → Website components
├── context/        → Global state (auth, data, toasts)
├── services/       → Database & API services
├── utils/          → Helper functions
├── pages/          → Website pages
├── constants/      → Colors, translations, data
├── modals/         → Pop-ups and dialogs
├── App.jsx         → Main app with routing
└── index.js        → Entry point
```

---

## 🔐 Authentication

### How It Works
1. Enter credentials on login page
2. System validates against stored admin user
3. Creates auth token
4. Stores in localStorage
5. Token checked on protected routes
6. Redirects if not authenticated

### Logout
Click "Logout" button in admin dashboard

---

## 💾 Data Storage

All data saved in browser's LocalStorage:
- `butterfly_gallery_products` → Product list
- `butterfly_gallery_orders` → Customer orders
- `butterfly_gallery_settings` → App configuration
- `butterfly_gallery_users` → Admin credentials
- `butterfly_gallery_authToken` → Login token

**Note**: Data persists even after closing browser (stored locally)

---

## 🎨 Customization Examples

### Add New Category
Edit `src/constants/data.js` in PRODUCTS section

### Change Hero Section
Admin Dashboard → Website Content → Hero Section

### Update Footer Links
Edit `src/components/Footer.jsx` for additional customization

---

## 🚀 Build & Deploy

### Production Build
```bash
npm run build
```

Creates optimized `build/` folder ready for deployment

### Deploy Options

#### Option 1: Vercel (Easiest)
```bash
npm install -g vercel
vercel
```

#### Option 2: Netlify
1. Build: `npm run build`
2. Drag `build` folder to [netlify.com](https://netlify.com)

#### Option 3: Firebase
```bash
npm install -g firebase-tools
firebase init hosting
firebase deploy
```

---

## 📊 Admin Dashboard Walkthrough

### 1. Overview (Home Page)
- Stats cards showing:
  - Total products
  - Total orders
  - Pending orders
  - Completed orders

### 2. Products Tab
- See all products in table
- Edit: Change any product detail
- Delete: Remove product
- Add: Create new product

### 3. Orders Tab
- View all orders with details
- Customer name and phone
- Order total and date
- Status dropdown (Pending/Completed)

### 4. Website Content Tab
- Brand Name: Update store name
- Tagline: Change motto
- Hero Title: Edit main headline
- Colors: Pick primary & secondary

### 5. Settings Tab
- Instagram link
- Facebook link
- TikTok link
- WhatsApp number

---

## 🔗 Important Links

- **Admin Login**: http://localhost:3000/admin/login
- **Website Home**: http://localhost:3000
- **Shop Page**: http://localhost:3000/shop
- **Cart**: http://localhost:3000/cart

---

## ❓ FAQ

**Q: Can I upload images?**  
A: Currently uses image URLs. For file upload, add Firebase Storage or Cloudinary integration.

**Q: Where is data saved?**  
A: Browser localStorage (survives page refresh, not cloud-synced).

**Q: How many admin users?**  
A: Currently one admin account. Can add multi-user support.

**Q: Can I use this on mobile?**  
A: Yes! Website is fully responsive. Admin dashboard also works on tablet.

**Q: How to backup data?**  
A: Export from browser DevTools → Application → LocalStorage

---

## 🛠️ Troubleshooting

### npm start doesn't work
```bash
# Clear cache
rm -rf node_modules package-lock.json
npm install
npm start
```

### Admin login fails
- Verify credentials: admin@butterfly.com / admin123
- Check if localStorage is enabled
- Try incognito mode

### Products don't appear
- Add products via Admin Dashboard
- Check localStorage in DevTools
- Hard refresh browser (Ctrl+Shift+R)

### Styling looks broken
- Clear browser cache
- Hard refresh (Ctrl+Shift+R)
- Check if Google Fonts loaded

---

## 🎓 Learning Resources

### React Concepts Used
- Hooks (useState, useEffect, useContext)
- Context API for state management
- React Router for navigation
- Component composition

### Key Files to Learn
1. `src/App.jsx` - Main routing structure
2. `src/context/*.jsx` - Global state
3. `src/admin/pages/AdminDashboard.jsx` - Dashboard features
4. `src/services/database.js` - Data management

---

## 🚢 Next Steps

1. ✅ Install and run locally
2. ✅ Log in to admin dashboard
3. ✅ Add test products
4. ✅ Customize content
5. ✅ Update social media links
6. ✅ Test checkout process
7. 🚀 Deploy to production

---

**Need help?** Check ADMIN_GUIDE.md for detailed documentation!

🦋 **Happy selling!** ✨
