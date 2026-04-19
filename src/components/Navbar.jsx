import { Search, Globe, Heart, ShoppingBag, Menu, X, User } from 'lucide-react';
import Logo from './ui/Logo';
import { G, FONT } from '../constants/data';

// Props: lang, setLang, page, nav, cartCount, wishCount,
//        searchQ, setSearchQ, searchOpen, setSearchOpen,
//        menu, setMenu, setLoginOpen, tr, isRTL
export default function Navbar({
  lang, setLang, page, nav, cartCount, wishCount,
  searchQ, setSearchQ, searchOpen, setSearchOpen,
  menu, setMenu, setLoginOpen, tr, isRTL,
}) {
  return (
    <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(253,248,245,0.96)', backdropFilter: 'blur(8px)', borderBottom: `1px solid ${G.bdr}`, fontFamily: FONT }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', direction: isRTL ? 'rtl' : 'ltr' }}>

        {/* Brand */}
        <button onClick={() => nav('home')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}>
          <Logo size={26} />
          <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 20, fontWeight: 600, color: G.text, letterSpacing: '0.05em' }}>{tr.brand}</span>
        </button>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
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

      {/* Side menu */}
      {menu && (
        <>
          <div
            style={{ position: 'fixed', top: 0, right: isRTL ? 'auto' : 0, left: isRTL ? 0 : 'auto', bottom: 0, width: 280, background: G.white, zIndex: 200, boxShadow: '-4px 0 24px rgba(44,24,16,0.12)', padding: 24, direction: isRTL ? 'rtl' : 'ltr' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
              <Logo size={22} />
              <button onClick={() => setMenu(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: G.textM }}><X size={20} /></button>
            </div>
            {['home', 'shop', 'about', 'contact', 'wishlist'].map(p => (
              <button key={p} onClick={() => nav(p)} style={{ display: 'block', width: '100%', textAlign: isRTL ? 'right' : 'left', background: 'none', border: 'none', cursor: 'pointer', color: G.text, fontFamily: FONT, fontSize: 16, padding: '14px 0', borderBottom: `1px solid ${G.bdr}`, fontWeight: 500 }}>
                {tr.nav[p]}
              </button>
            ))}
            <div style={{ marginTop: 20 }}>
              <button onClick={() => setLoginOpen(true)} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: `1px solid ${G.bdr}`, borderRadius: 6, cursor: 'pointer', color: G.textM, fontFamily: FONT, fontSize: 13, padding: '10px 16px', width: '100%', justifyContent: 'center' }}>
                <User size={14} />{tr.nav.login}
              </button>
            </div>
          </div>
          <div onClick={() => setMenu(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', zIndex: 190 }} />
        </>
      )}
    </nav>
  );
}