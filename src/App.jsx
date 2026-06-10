import { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';

// Providers
import { AuthProvider } from './context/AuthContext';
import { AppDataProvider, useAppData } from './context/AppDataContext';
import { ToastProvider } from './context/ToastContext';
import { CustomerAuthProvider, useCustomerAuth } from './context/CustomerAuthContext';

// Initialize database
import { initializeDatabase } from './services/database';

// Constants
import { G, FONT, BRAND, TR, PRODUCTS, SOCIAL_MEDIA, STORE_WHATSAPP, buildWaUrl, isAvailable } from './constants/data';

// Layout
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Modals
import QuickViewModal from './modals/QuickViewModal';
import LoginModal     from './modals/LoginModal';
import Popup          from './modals/Popup';

// Pages
import Home         from './pages/Home';
import Shop         from './pages/Shop';
import Product      from './pages/Product';
import Cart         from './pages/Cart';
import Checkout     from './pages/Checkout';
import Confirmation from './pages/Confirmation';
import About        from './pages/About';
import Contact      from './pages/Contact';
import Wishlist     from './pages/Wishlist';
import MyOrders     from './pages/MyOrders';

// Admin Pages
import AdminLogin from './admin/pages/AdminLogin';
import AdminDashboard from './admin/pages/AdminDashboard';

// Utils
import { PrivateRoute } from './utils/PrivateRoute';

// ─── Loading Screen ───────────────────────────────────────────────────────────
import Logo from './components/ui/Logo';

// Persisted storage keys (cart & wishlist survive refresh).
// Guests use the base key; logged-in customers use `<base>_<customerId>`.
const CART_KEY = 'butterfly_gallery_cart';
const WISH_KEY = 'butterfly_gallery_wishlist';
// Welcome popup "seen" flag — shown once per browser (clear localStorage to reset for a demo).
const WELCOME_SEEN_KEY = 'butterfly_gallery_welcome_seen';
const cartKeyFor = (id) => (id ? `${CART_KEY}_${id}` : CART_KEY);
const wishKeyFor = (id) => (id ? `${WISH_KEY}_${id}` : WISH_KEY);
const loadStored = (key) => {
  try { return JSON.parse(localStorage.getItem(key) || '[]'); } catch { return []; }
};
// Merge guest data into a customer's stored data on login (no lost items).
const mergeCart = (a, b) => {
  const map = new Map();
  [...(a || []), ...(b || [])].forEach(it => {
    const ex = map.get(it.id);
    map.set(it.id, ex ? { ...ex, qty: ex.qty + it.qty } : { ...it });
  });
  return [...map.values()];
};
const mergeWish = (a, b) => {
  const map = new Map();
  [...(a || []), ...(b || [])].forEach(it => { if (!map.has(it.id)) map.set(it.id, it); });
  return [...map.values()];
};

function LoadingScreen({ lang }) {
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: G.pinkL, fontFamily: FONT }}>
      <Logo size={48} />
      <p style={{ marginTop: 20, color: G.gold, letterSpacing: '0.2em', fontSize: 13, fontFamily: BRAND }}>{TR[lang].brand.toUpperCase()}</p>
      <div style={{ marginTop: 24, display: 'flex', gap: 6 }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: G.gold, animation: `bounce 0.9s ${i * 0.2}s infinite`, opacity: 0.8 }} />
        ))}
      </div>
      <style>{`@keyframes bounce{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-8px)}}`}</style>
    </div>
  );
}

// ─── Toast ────────────────────────────────────────────────────────────────────
function Toast({ msg }) {
  if (!msg) return null;
  return (
    <div style={{ position: 'fixed', bottom: 88, left: '50%', transform: 'translateX(-50%)', background: G.text, color: G.goldL, padding: '12px 24px', borderRadius: 30, fontSize: 13, fontWeight: 500, zIndex: 9999, animation: 'slideUp 0.3s ease', whiteSpace: 'nowrap', letterSpacing: '0.03em', boxShadow: '0 4px 20px rgba(44,24,16,0.3)', fontFamily: FONT }}>
      {msg}
    </div>
  );
}

// ─── Main Website App ─────────────────────────────────────────────────────────
function Website() {
  // ── Shared product source (same store the admin reads/writes) ──
  const { products: dbProducts, addOrder, settings } = useAppData();
  // Fall back to the bundled catalog while the store loads, and make sure every
  // product has a `cat` field (admin-created products store it as `category`).
  const products = (dbProducts && dbProducts.length ? dbProducts : PRODUCTS)
    .map(p => ({ ...p, cat: p.cat || p.category }));

  // ── Single source of truth for contact/social (admin Settings override defaults) ──
  const social = { ...SOCIAL_MEDIA, ...(settings?.social || {}) };
  const waNumber = String(settings?.social?.whatsapp || STORE_WHATSAPP).replace(/[^0-9]/g, '') || STORE_WHATSAPP;

  // ── Logged-in customer (public account, separate from admin auth) ──
  const { customer } = useCustomerAuth();
  const customerId = customer?.id || null;
  const cartKey = cartKeyFor(customerId);
  const wishKey = wishKeyFor(customerId);

  // ── Language & routing ──
  const [lang, setLang]         = useState('ar');
  const [page, setPage]         = useState('home');
  const [selP, setSelP]         = useState(null);

  // ── UI state ──
  const [loading, setLoading]   = useState(true);
  const [menu, setMenu]         = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [loginOpen, setLoginOpen]   = useState(false);
  const [popup, setPopup]       = useState(false);
  const [toast, setToast]       = useState(null);
  const [qv, setQv]             = useState(null);

  // ── Shop state ──
  const [searchQ, setSearchQ]   = useState('');
  const [catF, setCatF]         = useState('all');
  const [sortF, setSortF]       = useState('newest');

  // ── Cart & Wishlist (restored from localStorage so they survive refresh) ──
  const [cart, setCart]         = useState(() => loadStored(cartKeyFor(customerId)));
  const [wish, setWish]         = useState(() => loadStored(wishKeyFor(customerId)));
  const [qty, setQty]           = useState(1);
  // Tracks which storage keys the current state belongs to (for safe switching).
  const storageRef = useRef({ cart: cartKey, wish: wishKey, id: customerId });

  // ── Last placed order (for the confirmation page / WhatsApp resend) ──
  const [lastOrder, setLastOrder] = useState(null);

  // ── Discount ──
  const [discCode, setDiscCode]     = useState('');
  const [discApplied, setDiscApplied] = useState(false);

  // ── Forms ──
  const [email, setEmail]       = useState('');
  const [coForm, setCoForm]     = useState({ name: '', email: '', phone: '', gov: '', area: '', pay: 'cod' });

  // Prefill checkout fields from the logged-in customer (without overwriting edits).
  useEffect(() => {
    if (customer) setCoForm(f => ({ ...f, name: f.name || customer.name || '', email: f.email || customer.email || '', phone: f.phone || customer.phone || '' }));
  }, [customerId]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Derived values ──
  const tr       = TR[lang];
  const isRTL    = lang === 'ar';
  const sub      = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const disc     = discApplied ? Math.round(sub * 0.15) : 0;
  const total    = sub - disc;
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  // ── Lifecycle ──
  useEffect(() => {
    // Load Google Fonts
    const link = document.createElement('link');
    link.rel  = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Jost:wght@300;400;500&family=Tajawal:wght@400;500;700&display=swap';
    document.head.appendChild(link);

    // Global UI font (covers <body> and anything portalled outside the app root).
    document.body.style.fontFamily = FONT;

    // Only surface the welcome popup once per browser (the "seen" flag persists in
    // localStorage). Clearing localStorage resets it for a fresh demo run.
    let welcomeSeen = false;
    try { welcomeSeen = localStorage.getItem(WELCOME_SEEN_KEY) === '1'; } catch { welcomeSeen = false; }
    setTimeout(() => { setLoading(false); if (!welcomeSeen) setTimeout(() => setPopup(true), 1500); }, 1800);
  }, []);

  // Dismiss the welcome popup and remember it so it never re-shows on refresh.
  const dismissPopup = () => {
    try { localStorage.setItem(WELCOME_SEEN_KEY, '1'); } catch { /* ignore storage errors */ }
    setPopup(false);
  };

  // On login/logout switch carts between guest and per-customer storage.
  // (Runs before the persist effects below, so storageRef points at the right
  // key by the time a cart/wish change is written.)
  useEffect(() => {
    if (storageRef.current.id === customerId) return;
    const newCartKey = cartKeyFor(customerId);
    const newWishKey = wishKeyFor(customerId);

    if (storageRef.current.id === null && customerId) {
      // Logging in: merge the guest cart/wishlist into the customer's stored data.
      const mc = mergeCart(loadStored(newCartKey), cart);
      const mw = mergeWish(loadStored(newWishKey), wish);
      storageRef.current = { cart: newCartKey, wish: newWishKey, id: customerId };
      setCart(mc);
      setWish(mw);
    } else {
      // Logging out (or switching account): load that bucket's saved data.
      storageRef.current = { cart: newCartKey, wish: newWishKey, id: customerId };
      setCart(loadStored(newCartKey));
      setWish(loadStored(newWishKey));
    }
  }, [customerId]); // eslint-disable-line react-hooks/exhaustive-deps

  // Persist cart & wishlist whenever they change (to the active bucket).
  useEffect(() => { localStorage.setItem(storageRef.current.cart, JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem(storageRef.current.wish, JSON.stringify(wish)); }, [wish]);

  // ── Helpers ──
  const showToast = msg => { setToast(msg); setTimeout(() => setToast(null), 2500); };

  const nav = (pg, prod = null) => {
    if (prod) setSelP(prod);
    setPage(pg);
    setMenu(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addCart = (p, q = 1) => {
    // Unavailable / out-of-stock products are not orderable in the demo.
    if (!isAvailable(p)) { showToast(tr.unavailable); return; }
    setCart(prev => {
      const existing = prev.find(i => i.id === p.id);
      return existing
        ? prev.map(i => i.id === p.id ? { ...i, qty: i.qty + q } : i)
        : [...prev, { ...p, qty: q }];
    });
    showToast(tr.addedCart);
  };

  const rmCart    = id => setCart(prev => prev.filter(i => i.id !== id));
  const updQty    = (id, q) => { if (q < 1) return; setCart(prev => prev.map(i => i.id === id ? { ...i, qty: q } : i)); };
  const toggleWish = p => {
    const exists = wish.find(i => i.id === p.id);
    setWish(prev => exists ? prev.filter(i => i.id !== p.id) : [...prev, p]);
    showToast(exists ? tr.rmWish : tr.addedWish);
  };
  const inWish = id => wish.some(i => i.id === id);

  // ── Common props passed to every page ──
  const sharedProps = { lang, tr, isRTL, nav };

  // ── Page map ──
  const pages = {
    home:         <Home         {...sharedProps} products={products} addCart={addCart} toggleWish={toggleWish} inWish={inWish} setQv={setQv} email={email} setEmail={setEmail} showToast={showToast} />,
    shop:         <Shop         {...sharedProps} products={products} catF={catF} setCatF={setCatF} sortF={sortF} setSortF={setSortF} searchQ={searchQ} setSearchQ={setSearchQ} addCart={addCart} toggleWish={toggleWish} inWish={inWish} setQv={setQv} />,
    product:      <Product      {...sharedProps} products={products} selP={selP} setSelP={setSelP} addCart={addCart} toggleWish={toggleWish} inWish={inWish} qty={qty} setQty={setQty} setQv={setQv} />,
    cart:         <Cart         {...sharedProps} cart={cart} rmCart={rmCart} updQty={updQty} sub={sub} disc={disc} discApplied={discApplied} setDiscApplied={setDiscApplied} total={total} discCode={discCode} setDiscCode={setDiscCode} showToast={showToast} />,
    checkout:     <Checkout     {...sharedProps} cart={cart} coForm={coForm} setCoForm={setCoForm} total={total} sub={sub} discApplied={discApplied} disc={disc} showToast={showToast} setCart={setCart} addOrder={addOrder} waNumber={waNumber} setLastOrder={setLastOrder} customer={customer} />,
    confirmation: <Confirmation {...sharedProps} lastOrder={lastOrder} waNumber={waNumber} />,
    about:        <About        {...sharedProps} />,
    contact:      <Contact      {...sharedProps} showToast={showToast} social={social} waNumber={waNumber} />,
    wishlist:     <Wishlist     {...sharedProps} wish={wish} addCart={addCart} toggleWish={toggleWish} setQv={setQv} />,
    myorders:     <MyOrders     {...sharedProps} onLogin={() => setLoginOpen(true)} />,
  };

  if (loading) return <LoadingScreen lang={lang} />;

  return (
    <div style={{ minHeight: '100vh', background: G.bg, display: 'flex', flexDirection: 'column', fontFamily: FONT }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        img { display: block; }
        input::placeholder, textarea::placeholder { color: ${G.textL}; }
        @keyframes fadeIn   { from { opacity: 0; transform: translateY(12px) } to { opacity: 1; transform: translateY(0) } }
        @keyframes slideUp  { from { opacity: 0; transform: translateY(20px) } to { opacity: 1; transform: translateY(0) } }
        @keyframes bounce   { 0%,80%,100% { transform: translateY(0) } 40% { transform: translateY(-10px) } }
      `}</style>

      <Navbar
        lang={lang} setLang={setLang} page={page} nav={nav}
        cartCount={cartCount} wishCount={wish.length}
        searchQ={searchQ} setSearchQ={setSearchQ}
        searchOpen={searchOpen} setSearchOpen={setSearchOpen}
        menu={menu} setMenu={setMenu}
        setLoginOpen={setLoginOpen}
        tr={tr} isRTL={isRTL} showToast={showToast}
      />

      <div style={{ flex: 1, animation: 'fadeIn 0.4s ease' }}>
        {pages[page] ?? pages.home}
      </div>

      <Footer lang={lang} nav={nav} tr={tr} isRTL={isRTL} social={social} waNumber={waNumber} />

      {/* Floating WhatsApp */}
      <a href={buildWaUrl(waNumber)} target="_blank" rel="noreferrer"
        aria-label={isRTL ? 'تواصلي معنا على واتساب' : 'Contact us on WhatsApp'} title={isRTL ? 'واتساب' : 'WhatsApp'}
        style={{ position: 'fixed', bottom: 24, insetInlineEnd: 24, background: '#25D366', borderRadius: '50%', width: 52, height: 52, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(37,211,102,0.45)', zIndex: 500, textDecoration: 'none', transition: 'transform .2s' }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
        <MessageCircle size={26} color="white" fill="white" />
      </a>

      <Toast msg={toast} />

      <QuickViewModal qv={qv} setQv={setQv} lang={lang} tr={tr} isRTL={isRTL} addCart={addCart} nav={nav} />
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} isRTL={isRTL} tr={tr} showToast={showToast} />
      <Popup
        show={popup} onClose={dismissPopup} tr={tr} isRTL={isRTL}
        onClaim={() => { setDiscCode(tr.popup.code); setDiscApplied(true); dismissPopup(); nav('shop'); }}
      />
    </div>
  );
}

// ─── App Root with Router ─────────────────────────────────────────────────────
export default function App() {
  useEffect(() => {
    initializeDatabase();
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
        <CustomerAuthProvider>
          <AppDataProvider>
            <ToastProvider>
              <Routes>
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin/dashboard/*"
                element={
                  <PrivateRoute>
                    <AdminDashboard />
                  </PrivateRoute>
                }
              />

              {/* Public Website Routes */}
              <Route path="/*" element={<Website />} />
              </Routes>
            </ToastProvider>
          </AppDataProvider>
        </CustomerAuthProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}