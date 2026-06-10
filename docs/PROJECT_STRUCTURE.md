# 🗂️ Project Structure

A reference to how the Butterfly Gallery project is organized after cleanup.
For setup and usage, see the [documentation index](./README.md).

## 📁 Directory Tree

```
butterfly-gallery/
│
├── README.md                  # Project overview & quick start
├── package.json               # Dependencies & scripts
├── package-lock.json          # Locked dependency versions
├── .gitignore
│
├── public/                    # Static assets served as-is
│   ├── index.html             # HTML template
│   ├── favicon.ico
│   ├── logo1.png
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
│
├── docs/                      # Project documentation
│   ├── README.md              # Documentation index
│   ├── QUICK_START.md         # 2-minute setup
│   ├── SETUP_GUIDE.md         # Detailed setup & troubleshooting
│   ├── ADMIN_GUIDE.md         # Admin dashboard walkthrough
│   ├── ARCHITECTURE.md        # System architecture & data flow
│   ├── PROJECT_STRUCTURE.md   # This file
│   ├── PAYMENT_CONFIG_GUIDE.md# Payment & social media config
│   ├── QUICK_REFERENCE.md     # Commands & quick lookups
│   ├── VISUAL_GUIDE.md        # UI/UX layout reference
│   └── archive/               # Historical build notes (not maintained)
│       ├── README.md
│       ├── START_HERE.md
│       ├── COMPLETION_SUMMARY.md
│       ├── IMPLEMENTATION_SUMMARY.md
│       ├── IMPLEMENTATION_REPORT.md
│       ├── CHANGES.md
│       ├── SOCIAL_PAYMENT_UPDATE.md
│       ├── DOCUMENTATION_SUITE.md
│       └── DOCS_INDEX.md
│
└── src/                       # Application source
    │
    ├── index.js               # App entry point
    ├── App.jsx                # Routing + context providers
    │
    ├── admin/                 # Admin dashboard system
    │   ├── pages/
    │   │   ├── AdminLogin.jsx
    │   │   └── AdminDashboard.jsx
    │   └── components/
    │       └── AdminComponents.jsx
    │
    ├── components/            # Shared website components
    │   ├── Navbar.jsx
    │   ├── Footer.jsx
    │   ├── ProductCard.jsx
    │   └── ui/                # Reusable UI primitives
    │       ├── Btn.jsx
    │       ├── CustomSelect.jsx
    │       ├── Logo.jsx
    │       ├── PriceText.jsx
    │       ├── PublicSelect.jsx
    │       ├── SocialIcons.jsx
    │       └── Stars.jsx
    │
    ├── context/               # Global state (React Context)
    │   ├── AuthContext.jsx            # Admin authentication
    │   ├── CustomerAuthContext.jsx    # Customer authentication
    │   ├── AppDataContext.jsx         # Products, orders, settings
    │   └── ToastContext.jsx           # Toast notifications
    │
    ├── pages/                 # Public website pages
    │   ├── Home.jsx
    │   ├── Shop.jsx
    │   ├── Product.jsx
    │   ├── Cart.jsx
    │   ├── Checkout.jsx
    │   ├── Confirmation.jsx
    │   ├── MyOrders.jsx
    │   ├── Wishlist.jsx
    │   ├── About.jsx
    │   └── Contact.jsx
    │
    ├── modals/                # Overlay dialogs
    │   ├── LoginModal.jsx
    │   ├── Popup.jsx
    │   └── QuickViewModal.jsx
    │
    ├── constants/             # Static data & configuration
    │   └── data.js            # Colors, fonts, translations, product data
    │
    ├── services/              # Data layer
    │   └── database.js        # LocalStorage CRUD (Firebase-ready)
    │
    └── utils/                 # Helpers
        └── PrivateRoute.jsx   # Route protection for admin
```

## 🚫 Ignored / Local-Only Folders

These are generated or environment-specific and are **not** committed (see `.gitignore`):

```
node_modules/   # Installed dependencies (npm install)
build/          # Production build output (npm run build)
coverage/       # Test coverage reports
.claude/        # Local Claude Code workspace
.vercel/        # Local Vercel CLI link & settings
.env*           # Local environment variables
```

## 📂 Folder Responsibilities

| Folder | Responsibility |
|--------|----------------|
| `public/` | Static assets and the HTML template |
| `docs/` | Project documentation; `docs/archive/` holds historical notes |
| `src/admin/` | Admin login and dashboard (products, orders, content, settings) |
| `src/components/` | Shared website components; `ui/` holds reusable primitives |
| `src/context/` | Global state via the Context API |
| `src/pages/` | Public website routes |
| `src/modals/` | Overlay dialogs (login, quick view, popups) |
| `src/constants/` | Colors, fonts, translations, and product data |
| `src/services/` | Data persistence layer (LocalStorage, Firebase-ready) |
| `src/utils/` | Helper utilities such as route protection |

## 🔌 How It Fits Together

```
index.js
└── App.jsx
    ├── Context providers (Auth, CustomerAuth, AppData, Toast)
    └── Router
        ├── Public routes  → pages/ + components/ + modals/
        └── Admin routes   → admin/ (AdminLogin, AdminDashboard via PrivateRoute)

Contexts ──> services/database.js ──> LocalStorage
```

### LocalStorage keys (managed by `services/database.js`)

```
butterfly_gallery_products
butterfly_gallery_orders
butterfly_gallery_settings
butterfly_gallery_users
butterfly_gallery_authToken
```

## 🏗️ Build Output

Running `npm run build` produces an optimized static bundle in `build/`:

```
build/
├── index.html
├── static/
│   ├── js/main.[hash].js
│   └── css/main.[hash].css
└── (public assets copied in)
```

---

For deeper architecture details see [ARCHITECTURE.md](./ARCHITECTURE.md).
