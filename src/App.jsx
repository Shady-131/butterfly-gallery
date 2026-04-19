import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';

// Providers
import { AuthProvider } from './context/AuthContext';
import { AppDataProvider } from './context/AppDataContext';
import { ToastProvider } from './context/ToastContext';

// Initialize database
import { initializeDatabase } from './services/database';

// Constants
import { G, FONT, SERIF, TR } from './constants/data';

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

// Admin Pages
import AdminLogin from './admin/pages/AdminLogin';
import AdminDashboard from './admin/pages/AdminDashboard';

// Utils
import { PrivateRoute } from './utils/PrivateRoute';

// ─── Loading Screen ───────────────────────────────────────────────────────────
import Logo from './components/ui/Logo';

function LoadingScreen({ lang }) {
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: G.pinkL, fontFamily: FONT }}>
      <Logo size={48} />
      <p style={{ marginTop: 20, color: G.gold, letterSpacing: '0.2em', fontSize: 13, fontFamily: SERIF }}>{TR[lang].brand.toUpperCase()}</p>
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

  // ── Cart & Wishlist ──
  const [cart, setCart]         = useState([]);
  const [wish, setWish]         = useState([]);
  const [qty, setQty]           = useState(1);

  // ── Discount ──
  const [discCode, setDiscCode]     = useState('');
  const [discApplied, setDiscApplied] = useState(false);

  // ── Forms ──
  const [email, setEmail]       = useState('');
  const [coForm, setCoForm]     = useState({ name: '', phone: '', gov: '', area: '', pay: 'cod' });

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
    link.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Jost:wght@300;400;500&display=swap';
    document.head.appendChild(link);

    setTimeout(() => { setLoading(false); setTimeout(() => setPopup(true), 1500); }, 1800);
  }, []);

  // ── Helpers ──
  const showToast = msg => { setToast(msg); setTimeout(() => setToast(null), 2500); };

  const nav = (pg, prod = null) => {
    if (prod) setSelP(prod);
    setPage(pg);
    setMenu(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addCart = (p, q = 1) => {
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
    home:         <Home         {...sharedProps} addCart={addCart} toggleWish={toggleWish} inWish={inWish} setQv={setQv} email={email} setEmail={setEmail} showToast={showToast} />,
    shop:         <Shop         {...sharedProps} catF={catF} setCatF={setCatF} sortF={sortF} setSortF={setSortF} searchQ={searchQ} setSearchQ={setSearchQ} addCart={addCart} toggleWish={toggleWish} inWish={inWish} setQv={setQv} />,
    product:      <Product      {...sharedProps} selP={selP} setSelP={setSelP} addCart={addCart} toggleWish={toggleWish} inWish={inWish} qty={qty} setQty={setQty} />,
    cart:         <Cart         {...sharedProps} cart={cart} rmCart={rmCart} updQty={updQty} sub={sub} disc={disc} discApplied={discApplied} setDiscApplied={setDiscApplied} total={total} discCode={discCode} setDiscCode={setDiscCode} showToast={showToast} />,
    checkout:     <Checkout     {...sharedProps} cart={cart} coForm={coForm} setCoForm={setCoForm} total={total} discApplied={discApplied} disc={disc} showToast={showToast} setCart={setCart} />,
    confirmation: <Confirmation {...sharedProps} />,
    about:        <About        {...sharedProps} />,
    contact:      <Contact      {...sharedProps} showToast={showToast} />,
    wishlist:     <Wishlist     {...sharedProps} wish={wish} addCart={addCart} toggleWish={toggleWish} setQv={setQv} />,
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
        tr={tr} isRTL={isRTL}
      />

      <div style={{ flex: 1, animation: 'fadeIn 0.4s ease' }}>
        {pages[page] ?? pages.home}
      </div>

      <Footer lang={lang} nav={nav} tr={tr} isRTL={isRTL} />

      {/* Floating WhatsApp */}
      <a href="https://wa.me/201000000000" target="_blank" rel="noreferrer"
        style={{ position: 'fixed', bottom: 24, right: 24, background: '#25D366', borderRadius: '50%', width: 52, height: 52, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(37,211,102,0.45)', zIndex: 500, textDecoration: 'none', transition: 'transform .2s' }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
        <MessageCircle size={26} color="white" fill="white" />
      </a>

      <Toast msg={toast} />

      <QuickViewModal qv={qv} setQv={setQv} lang={lang} tr={tr} isRTL={isRTL} addCart={addCart} nav={nav} />
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} isRTL={isRTL} tr={tr} />
      <Popup
        show={popup} onClose={() => setPopup(false)} tr={tr} isRTL={isRTL}
        onClaim={() => { setDiscCode(tr.popup.code); setDiscApplied(true); setPopup(false); nav('shop'); }}
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
      </AuthProvider>
    </BrowserRouter>
  );
}