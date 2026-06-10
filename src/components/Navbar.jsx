import { createPortal } from 'react-dom';
import { Search, Globe, Heart, ShoppingBag, Menu, X, User, Package, LogOut } from 'lucide-react';
import Logo from './ui/Logo';
import { G, FONT, BRAND } from '../constants/data';
import { useCustomerAuth } from '../context/CustomerAuthContext';

// Props: lang, setLang, page, nav, cartCount, wishCount,
//        searchQ, setSearchQ, searchOpen, setSearchOpen,
//        menu, setMenu, setLoginOpen, tr, isRTL, showToast
export default function Navbar({
  lang, setLang, page, nav, cartCount, wishCount,
  searchQ, setSearchQ, searchOpen, setSearchOpen,
  menu, setMenu, setLoginOpen, tr, isRTL, showToast,
}) {
  const { customer, isLoggedIn, logout } = useCustomerAuth();

  const handleLogout = () => {
    logout();
    setMenu(false);
    if (showToast) showToast(tr.auth.logoutOk);
  };

  const openLogin = () => { setMenu(false); setLoginOpen(true); };

  // Menu links — My Orders only appears for logged-in customers.
  const links = ['home', 'shop', 'about', 'contact', 'wishlist', ...(isLoggedIn ? ['myorders'] : [])];

  // The drawer + overlay render through a portal on document.body so they sit
  // above the sticky navbar, sticky cart/checkout summaries and the floating
  // WhatsApp button (no stacking-context / z-index bleed-through).
  const drawer = menu ? createPortal(
    <>
      <div onClick={() => setMenu(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 100000 }} />
      <div style={{ position: 'fixed', top: 0, bottom: 0, [isRTL ? 'left' : 'right']: 0, width: 'min(82vw, 300px)', background: '#FFFBF8', zIndex: 100001, boxShadow: '0 0 30px rgba(44,24,16,0.25)', padding: 24, direction: isRTL ? 'rtl' : 'ltr', overflowY: 'auto', fontFamily: FONT }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <Logo size={22} />
          <button onClick={() => setMenu(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: G.textM }}><X size={20} /></button>
        </div>

        {isLoggedIn && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: G.pinkL, border: `1px solid ${G.bdr}`, borderRadius: 8, padding: '10px 12px', marginBottom: 16 }}>
            <div style={{ width: 34, height: 34, borderRadius: '50%', background: G.gold, color: G.white, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
              {customer.name?.[0]?.toUpperCase() || 'U'}
            </div>
            <div style={{ overflow: 'hidden' }}>
              <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: G.text, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{customer.name}</p>
              <p style={{ margin: 0, fontSize: 11, color: G.textL, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{customer.email}</p>
            </div>
          </div>
        )}

        {links.map(p => (
          <button key={p} onClick={() => nav(p)} style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%', textAlign: isRTL ? 'right' : 'left', background: 'none', border: 'none', cursor: 'pointer', color: G.text, fontFamily: FONT, fontSize: 16, padding: '13px 0', borderBottom: `1px solid ${G.bdr}`, fontWeight: 500 }}>
            {p === 'myorders' && <Package size={16} />}{tr.nav[p]}
          </button>
        ))}

        <div style={{ marginTop: 20 }}>
          {isLoggedIn ? (
            <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: `1px solid ${G.bdr}`, borderRadius: 6, cursor: 'pointer', color: '#C0392B', fontFamily: FONT, fontSize: 13, padding: '10px 16px', width: '100%', justifyContent: 'center' }}>
              <LogOut size={14} />{tr.nav.logout}
            </button>
          ) : (
            <button onClick={openLogin} style={{ display: 'flex', alignItems: 'center', gap: 8, background: G.gold, border: `1px solid ${G.gold}`, borderRadius: 6, cursor: 'pointer', color: G.white, fontFamily: FONT, fontSize: 13, padding: '10px 16px', width: '100%', justifyContent: 'center', fontWeight: 600 }}>
              <User size={14} />{tr.nav.login} / {tr.nav.signup}
            </button>
          )}
        </div>
      </div>
    </>,
    document.body,
  ) : null;

  return (
    <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(253,248,245,0.96)', backdropFilter: 'blur(8px)', borderBottom: `1px solid ${G.bdr}`, fontFamily: FONT }}>
      <style>{`
        /* Keep the bar on one line at every width: the action cluster never
           shrinks, and the brand wordmark drops on small phones (logo stays). */
        .nav-actions { flex-shrink: 0; }
        @media (max-width: 600px) { .nav-brand-text { display: none !important; } }
        @media (max-width: 380px) { .nav-actions { gap: 8px !important; } }
        @media (max-width: 340px) { .nav-actions { gap: 6px !important; } }
      `}</style>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, direction: isRTL ? 'rtl' : 'ltr' }}>

        {/* Brand */}
        <button onClick={() => nav('home')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
          <Logo size={26} />
          <span className="nav-brand-text" style={{ fontFamily: BRAND, fontSize: 20, fontWeight: 600, color: G.text, letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{tr.brand}</span>
        </button>

        {/* Actions */}
        <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => setSearchOpen(s => !s)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: G.textM, display: 'flex', padding: 6 }}>
            <Search size={18} />
          </button>

          {/* Language toggle */}
          <button
            onClick={() => setLang(l => l === 'ar' ? 'en' : 'ar')}
            style={{ background: G.goldL, border: `1px solid ${G.gold}`, borderRadius: 20, cursor: 'pointer', padding: '4px 10px', fontSize: 11, fontWeight: 600, color: G.textM, display: 'flex', alignItems: 'center', gap: 4 }}
          >
            <Globe size={12} />{lang === 'ar' ? 'EN' : 'ع'}
          </button>

          {/* Account indicator (logged-in only) → opens My Orders */}
          {isLoggedIn && (
            <button onClick={() => nav('myorders')} title={customer.name} style={{ background: G.gold, color: G.white, border: 'none', borderRadius: '50%', width: 30, height: 30, cursor: 'pointer', fontWeight: 700, fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {customer.name?.[0]?.toUpperCase() || 'U'}
            </button>
          )}

          {/* Wishlist */}
          <button onClick={() => nav('wishlist')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: G.textM, display: 'flex', padding: 6, position: 'relative' }}>
            <Heart size={18} fill={wishCount > 0 ? G.pinkD : 'none'} stroke={wishCount > 0 ? G.pinkD : G.textM} />
            {wishCount > 0 && <span style={{ position: 'absolute', top: 0, right: 0, background: G.pinkD, color: G.white, borderRadius: '50%', width: 15, height: 15, fontSize: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>{wishCount}</span>}
          </button>

          {/* Cart */}
          <button onClick={() => nav('cart')} style={{ background: G.pink, border: `1px solid ${G.bdr}`, borderRadius: 6, cursor: 'pointer', color: G.text, display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', fontSize: 13, fontWeight: 500, position: 'relative' }}>
            <ShoppingBag size={16} />
            {cartCount > 0 && <span style={{ background: G.gold, color: G.white, borderRadius: '50%', width: 18, height: 18, fontSize: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, position: 'absolute', top: -7, right: -7 }}>{cartCount}</span>}
          </button>

          {/* Hamburger */}
          <button onClick={() => setMenu(m => !m)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: G.textM, padding: 6 }}>
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* Search bar */}
      {searchOpen && (
        <div style={{ borderTop: `1px solid ${G.bdr}`, padding: '10px 20px', background: G.white, direction: isRTL ? 'rtl' : 'ltr' }}>
          <div style={{ maxWidth: 600, margin: '0 auto', position: 'relative' }}>
            <Search size={15} style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', insetInlineStart: 12, color: G.textL }} />
            <input
              value={searchQ}
              onChange={e => setSearchQ(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') { nav('shop'); setSearchOpen(false); } }}
              placeholder={tr.nav.ph}
              style={{ width: '100%', padding: `10px 12px 10px ${isRTL ? '12px' : '36px'}`, border: `1px solid ${G.bdr}`, borderRadius: 6, fontSize: 14, fontFamily: FONT, background: G.bg, color: G.text, outline: 'none', boxSizing: 'border-box' }}
            />
          </div>
        </div>
      )}

      {drawer}
    </nav>
  );
}
