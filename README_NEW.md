# 🦋 Butterfly Gallery - Production-Ready E-Commerce Platform

A modern, scalable e-commerce platform with a comprehensive admin dashboard, designed for jewelry, accessories, and women's bags. Built with React, featuring bilingual support (Arabic/English), full product management, and real-time updates.

## ✨ What's New in v1.0

🎯 **Complete Admin Dashboard** - Manage everything without code  
🎨 **Social Media Management** - Update links instantly  
📦 **Product Management** - Add, edit, delete products dynamically  
📋 **Orders Management** - Track and manage customer orders  
🌐 **Website Content Editor** - Customize text and colors on the fly  
🔐 **Secure Admin Login** - Protected dashboard access  
📱 **Fully Responsive** - Works on all devices  
💬 **Toast Notifications** - Real-time user feedback  
📞 **WhatsApp Integration** - Direct customer contact  

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm start

# 3. Open http://localhost:3000

# 4. Access admin dashboard
# URL: http://localhost:3000/admin/login
# Email: admin@butterfly.com
# Password: admin123
```

## 📚 Documentation

- **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Step-by-step setup instructions
- **[ADMIN_GUIDE.md](./ADMIN_GUIDE.md)** - Complete admin dashboard guide

## 🎯 Key Features

### Admin Dashboard
- 📊 **Overview**: Real-time statistics and metrics
- 📦 **Products**: Full CRUD operations (Add, Edit, Delete)
- 🛒 **Orders**: View orders, customer details, update status
- 🌐 **Content**: Edit brand name, hero text, colors
- ⚙️ **Settings**: Manage social media links and configurations

### Website Features
- 🛍️ **Shop**: Browse products by category
- 🔍 **Search & Filter**: Find products easily
- ❤️ **Wishlist**: Save favorite items
- 🛒 **Shopping Cart**: Add/remove items with quantity control
- 💳 **Checkout**: Seamless order placement
- 🌍 **Bilingual**: Arabic and English support with RTL
- 📞 **WhatsApp**: Direct contact button

## 📁 Project Structure

```
butterfly-gallery/
├── src/
│   ├── admin/               # Admin dashboard
│   │   ├── pages/
│   │   │   ├── AdminLogin.jsx
│   │   │   └── AdminDashboard.jsx
│   │   └── components/
│   │
│   ├── components/          # Website components
│   ├── context/             # Global state (Auth, Data, Toasts)
│   ├── services/            # Database & APIs
│   ├── pages/               # Website pages
│   ├── constants/           # Colors, fonts, translations
│   ├── utils/               # Helper functions
│   ├── App.jsx              # Main app with routing
│   └── index.js
│
├── SETUP_GUIDE.md          # Quick setup guide
├── ADMIN_GUIDE.md          # Complete admin documentation
└── package.json
```

## 🔧 Tech Stack

- **Frontend**: React 19
- **Routing**: React Router 7
- **State Management**: Context API
- **Storage**: LocalStorage (Firebase-ready)
- **UI Icons**: Lucide React
- **Styling**: CSS-in-JS (Inline styles)
- **Fonts**: Google Fonts (Jost, Cormorant Garamond)

## 🎨 Customization

### Update Social Media Links
Admin Dashboard → Settings → Update Instagram, Facebook, TikTok, WhatsApp

### Change Brand Colors
Edit `src/constants/data.js`:
```javascript
export const G = {
  pink: "#F2C4CE",     // Primary pink
  gold: "#C9A84C",     // Gold accent
  // ... more colors
};
```

### Add Products
1. Go to Admin Dashboard
2. Click "Add Product"
3. Fill product details
4. Products appear instantly on website

## 📱 Responsive Design

- ✅ Mobile (< 640px)
- ✅ Tablet (640px - 1024px)
- ✅ Desktop (> 1024px)
- ✅ Admin dashboard collapses on small screens

## 🔐 Security

### Default Admin Credentials
```
Email: admin@butterfly.com
Password: admin123
```

⚠️ **Important**: Change these in production!

### Protected Routes
- Admin login required for dashboard access
- Auth token stored in localStorage
- Auto-logout on session expiry

## 💾 Data Management

### LocalStorage Database
```
butterfly_gallery_products   → Product catalog
butterfly_gallery_orders     → Customer orders
butterfly_gallery_settings   → Configuration
butterfly_gallery_users      → Admin credentials
butterfly_gallery_authToken  → Login token
```

### Upgrade to Firebase
The database service is Firebase-ready. Update `src/services/database.js` to use Firestore instead of LocalStorage.

## 🚀 Build & Deploy

### Production Build
```bash
npm run build
```

### Deploy Options

#### Vercel (Recommended)
```bash
vercel
```

#### Netlify
Drag `build/` folder to [netlify.com](https://netlify.com)

#### Firebase
```bash
firebase init hosting
firebase deploy
```

## 🎓 How to Use Admin Dashboard

### Add a Product
1. Dashboard → Products
2. Click "Add Product"
3. Fill Arabic & English names
4. Set price and category
5. Add image URL
6. Product appears on website instantly

### Manage Orders
1. Dashboard → Orders
2. View customer details
3. Click status dropdown
4. Change from Pending to Completed

### Update Social Links
1. Dashboard → Settings
2. Update Instagram, Facebook, TikTok
3. Add WhatsApp number
4. Links update across website

### Customize Website
1. Dashboard → Website Content
2. Edit brand name, hero title
3. Change colors
4. Save changes (instant updates)

## 📊 Performance

- Optimized component rendering
- Lazy loading for images
- Smooth transitions and animations
- Efficient state management
- Mobile-first responsive design

## 🔗 Important URLs

- Website: `http://localhost:3000`
- Admin Login: `http://localhost:3000/admin/login`
- Dashboard: `http://localhost:3000/admin/dashboard`
- Shop: `http://localhost:3000/shop`
- Cart: `http://localhost:3000/cart`

## 🐛 Troubleshooting

### Admin login not working
- Verify credentials: `admin@butterfly.com` / `admin123`
- Clear browser cache
- Check if localStorage is enabled
- Try incognito mode

### Products not appearing
- Add products via Admin Dashboard
- Hard refresh browser (Ctrl+Shift+R)
- Check LocalStorage in DevTools

### Styling looks off
- Clear cache and hard refresh
- Check if Google Fonts are loading
- Verify CSS is not blocked

## 🚢 Next Steps

1. ✅ Install and setup locally
2. ✅ Log into admin dashboard
3. ✅ Add test products
4. ✅ Customize content and colors
5. ✅ Update social media links
6. ✅ Test checkout process
7. 🚀 Deploy to production

## 📞 Contact & Support

- **Instagram**: [@butterfly.gallery510](https://www.instagram.com/butterfly.gallery510?igsh=cXo5bTgzcjk0OGZv)
- **Facebook**: [Butterfly Gallery](https://www.facebook.com/share/g/1Yi5cNkjpN/?mibextid=wwXIfr)
- **WhatsApp**: Use the floating button on the website

## 📄 License

Proprietary © 2025 Butterfly Gallery. All rights reserved.

## 🎉 Changelog

### Version 1.0.0
- ✨ Complete admin dashboard
- ✨ Product management system
- ✨ Orders tracking system
- ✨ Social media management
- ✨ Website content editor
- ✨ Secure authentication
- ✨ Improved UI/UX
- ✨ Full responsiveness
- ✨ Toast notifications
- ✨ WhatsApp integration

---

**Ready to transform your e-commerce business?** Start with [SETUP_GUIDE.md](./SETUP_GUIDE.md) 🚀

🦋 **Butterfly Gallery v1.0** - Production Ready ✨
