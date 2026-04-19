# ⚡ Quick Reference Guide

## 🚀 Getting Started (Copy-Paste Commands)

```bash
# Install
npm install

# Run
npm start

# Build
npm run build
```

---

## 🔑 Default Credentials

```
Email:    admin@butterfly.com
Password: admin123
```

**⚠️ Change in production!** Edit `src/services/database.js`

---

## 🌐 Important URLs

| Page | URL |
|------|-----|
| Website | http://localhost:3000 |
| Shop | http://localhost:3000/shop |
| Admin Login | http://localhost:3000/admin/login |
| Admin Dashboard | http://localhost:3000/admin/dashboard |
| Cart | http://localhost:3000/cart |

---

## 📚 Documentation Quick Links

| Guide | Time | Best For |
|-------|------|----------|
| QUICK_START.md | 1 min | Fastest setup |
| SETUP_GUIDE.md | 5 min | Basic setup |
| ADMIN_GUIDE.md | 20 min | Complete feature guide |
| ARCHITECTURE.md | 15 min | Technical deep dive |
| IMPLEMENTATION_SUMMARY.md | 10 min | What was built |
| CHANGES.md | 10 min | File changes |

---

## 🎯 Common Tasks

### Add a Product
1. Go to http://localhost:3000/admin/login
2. Login with admin credentials
3. Click "Products" in sidebar
4. Click "Add Product"
5. Fill in details:
   - Arabic name
   - English name
   - Price
   - Category
   - Image URL
6. Click "Add Product"
✅ Product appears on website instantly!

### Update Social Media
1. Dashboard → Settings
2. Update Instagram/Facebook/TikTok/WhatsApp
3. Click "Save Social Media Links"
✅ Links update on website instantly!

### View Orders
1. Dashboard → Orders
2. See all customer orders
3. Click status dropdown to change status
✅ Order status updates instantly!

### Change Website Colors
1. Dashboard → Website Content
2. Click color pickers for primary/secondary
3. Click "Save Changes"
✅ Website colors update instantly!

---

## 🔧 Useful Code Snippets

### Use Authentication Hook
```javascript
import { useAuth } from './context/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, logout } = useAuth();
  
  return (
    <div>
      {isAuthenticated && <p>Hello, {user.email}</p>}
    </div>
  );
}
```

### Use App Data Hook
```javascript
import { useAppData } from './context/AppDataContext';

function ProductList() {
  const { products, addProduct, deleteProduct } = useAppData();
  
  return (
    <div>
      {products.map(p => (
        <div key={p.id}>{p.en}</div>
      ))}
    </div>
  );
}
```

### Use Toast Notifications
```javascript
import { useToast } from './context/ToastContext';

function MyComponent() {
  const { success, error } = useToast();
  
  const handleClick = async () => {
    try {
      // do something
      success('Success!');
    } catch (err) {
      error('Error: ' + err.message);
    }
  };
  
  return <button onClick={handleClick}>Click</button>;
}
```

### Use Protected Route
```javascript
import { PrivateRoute } from './utils/PrivateRoute';
import AdminDashboard from './admin/pages/AdminDashboard';

<Route
  path="/admin/dashboard"
  element={
    <PrivateRoute>
      <AdminDashboard />
    </PrivateRoute>
  }
/>
```

---

## 🗂️ File Locations

| What | Where |
|------|-------|
| Admin Dashboard | `src/admin/pages/AdminDashboard.jsx` |
| Admin Login | `src/admin/pages/AdminLogin.jsx` |
| Database Service | `src/services/database.js` |
| Auth State | `src/context/AuthContext.jsx` |
| App Data State | `src/context/AppDataContext.jsx` |
| Toasts | `src/context/ToastContext.jsx` |
| Products Data | `src/constants/data.js` (static) |
| Colors/Fonts | `src/constants/data.js` |
| Main App | `src/App.jsx` |

---

## 🔍 Debugging Tips

### Check Console Errors
```
F12 → Console tab → Look for red errors
```

### View Stored Data
```
F12 → Application → LocalStorage
Look for keys: butterfly_gallery_*
```

### Clear All Data
```javascript
// In browser console:
localStorage.clear()
location.reload()
```

### Check Network Tab
```
F12 → Network → See all requests
(Currently none - uses LocalStorage)
```

### Performance
```
F12 → Performance → Record → Do action → Stop
See timeline of operations
```

---

## 🛠️ Configuration

### Change Admin Credentials
**File**: `src/services/database.js`
```javascript
users: {
  admin: {
    email: 'your-email@example.com',
    password: 'your-password',
    role: 'admin',
  },
}
```

### Change Brand Colors
**File**: `src/constants/data.js`
```javascript
export const G = {
  pink: "#F2C4CE",      // Main pink
  gold: "#C9A84C",      // Accent gold
  text: "#2C1810",      // Text color
  // ... more colors
};
```

### Change Translations
**File**: `src/constants/data.js`
```javascript
export const TR = {
  ar: { /* Arabic text */ },
  en: { /* English text */ },
};
```

---

## 📊 Data Storage Keys

All stored in browser LocalStorage:

```javascript
// Products array
localStorage.getItem('butterfly_gallery_products')

// Orders array
localStorage.getItem('butterfly_gallery_orders')

// Settings object
localStorage.getItem('butterfly_gallery_settings')

// Admin users
localStorage.getItem('butterfly_gallery_users')

// Auth token
localStorage.getItem('butterfly_gallery_authToken')
```

---

## 🎨 Admin Dashboard Menu

```
Dashboard (Main)
├── Overview          → Stats cards
├── Products          → CRUD operations
├── Orders            → View & update status
├── Website Content   → Edit text & colors
└── Settings          → Social media links

Sidebar
├── Collapse/Expand   → Toggle sidebar
└── Logout            → Sign out
```

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| F12 | DevTools |
| Ctrl+Shift+R | Hard refresh |
| Ctrl+Shift+Delete | Clear cache |
| Ctrl+/ | Comment code |
| Ctrl+S | Save file |

---

## 📱 Responsive Breakpoints

```
Mobile:   < 640px   → Single column
Tablet:   640-1024px → 2 columns
Desktop:  > 1024px   → Full layout
```

---

## 🚀 Deployment Checklist

- [ ] Change admin password
- [ ] Add real products
- [ ] Update social links
- [ ] Test all features
- [ ] Build: `npm run build`
- [ ] Deploy to platform
- [ ] Set domain name
- [ ] Enable HTTPS
- [ ] Monitor errors
- [ ] Backup data regularly

---

## 🐛 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Login fails | Check credentials: admin@butterfly.com / admin123 |
| Products missing | Add via dashboard, check LocalStorage |
| Styling broken | Hard refresh: Ctrl+Shift+R |
| Data lost | Check LocalStorage in DevTools |
| Admin won't load | Check console for errors: F12 |
| Images not loading | Verify image URL is valid |
| Forms not submitting | Fill all required fields |
| Cache issues | Clear: Ctrl+Shift+Delete |

---

## 🎯 Feature Checklist

### Admin Dashboard
- [ ] Admin login works
- [ ] Can add products
- [ ] Can edit products
- [ ] Can delete products
- [ ] Can view orders
- [ ] Can update order status
- [ ] Can edit content
- [ ] Can change colors
- [ ] Can update social links

### Website
- [ ] Home page works
- [ ] Shop page works
- [ ] Search works
- [ ] Filter works
- [ ] Add to cart works
- [ ] Cart works
- [ ] Checkout works
- [ ] WhatsApp button works

---

## 💾 Backup Data

### Export Data
```javascript
// In browser console:
localStorage.getItem('butterfly_gallery_products')
localStorage.getItem('butterfly_gallery_orders')
localStorage.getItem('butterfly_gallery_settings')

// Copy output and save as backup
```

### Import Data
```javascript
// In browser console:
localStorage.setItem('butterfly_gallery_products', '[...]')
localStorage.setItem('butterfly_gallery_orders', '[...]')
localStorage.setItem('butterfly_gallery_settings', '{...}')
```

---

## 🔐 Security Quick Tips

### Development
- ✅ Keep default credentials in dev
- ✅ Use localStorage for demo
- ✅ Test on localhost only

### Production
- ✅ Change admin password
- ✅ Use HTTPS everywhere
- ✅ Enable CORS properly
- ✅ Validate inputs on backend
- ✅ Use environment variables
- ✅ Monitor for attacks
- ✅ Regular backups
- ✅ Update dependencies

---

## 📈 Performance Tips

- Use React DevTools for profiling
- Check console for warnings
- Minimize re-renders with useMemo
- Use Code Splitting for admin
- Optimize images
- Lazy load components
- Monitor bundle size
- Test on slow networks

---

## 🔗 Dependencies

```json
{
  "react": "^19.2.5",
  "react-dom": "^19.2.5",
  "react-router-dom": "^7.0.0",
  "react-toastify": "^11.0.0",
  "firebase": "^11.0.0",
  "lucide-react": "^1.8.0",
  "uuid": "^10.0.0"
}
```

**Install all**: `npm install`

---

## 🎓 Learning Path

1. Start with QUICK_START.md
2. Read SETUP_GUIDE.md
3. Use admin dashboard
4. Read ADMIN_GUIDE.md
5. Study ARCHITECTURE.md
6. Review code in `src/`
7. Customize as needed
8. Deploy to production

---

## 📞 When Things Go Wrong

1. **Check console** → F12
2. **Clear cache** → Ctrl+Shift+Delete
3. **Hard refresh** → Ctrl+Shift+R
4. **Check LocalStorage** → F12 → Application
5. **Read documentation** → See docs/
6. **Check error messages** → Read carefully
7. **Restart server** → Kill and `npm start`
8. **Ask in comments** → Code has hints

---

## ✅ Before Going Live

```bash
# Build production version
npm run build

# Test production build locally
npm install -g serve
serve -s build

# Deploy to host
# ... (Vercel, Netlify, Firebase, etc.)

# Monitor for issues
# Check error logs
# Monitor performance
```

---

## 🎉 Success Indicators

✅ Admin dashboard loads  
✅ Can login successfully  
✅ Can add products  
✅ Products appear on website  
✅ Can manage orders  
✅ Social links update  
✅ Website functions correctly  
✅ Data persists on refresh  

**All green? You're ready!** 🚀

---

## 🦋 Final Checklist

- [ ] Installed dependencies (`npm install`)
- [ ] Server running (`npm start`)
- [ ] Accessed admin dashboard
- [ ] Logged in successfully
- [ ] Added test product
- [ ] Viewed order management
- [ ] Updated social links
- [ ] Changed colors
- [ ] Tested website
- [ ] Confirmed everything works

**Status: Ready for Production** ✨

---

## 📖 Documentation Index

```
QUICK_START.md             ← START HERE
├── SETUP_GUIDE.md        ← Basic setup
├── ADMIN_GUIDE.md        ← Complete guide
├── ARCHITECTURE.md       ← Tech details
├── IMPLEMENTATION_SUMMARY.md ← What changed
└── CHANGES.md            ← File changes
```

---

**Got a question?** Check the docs first! 📚

**Ready to build?** `npm start` 🚀

**Need help?** Read the relevant guide! 📖

🦋 **Butterfly Gallery** - Ready When You Are! ✨
