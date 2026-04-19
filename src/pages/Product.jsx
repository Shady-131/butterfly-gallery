import { Search } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { G, FONT, SERIF, PRODUCTS } from '../constants/data';

// Props: lang, tr, isRTL, catF, setCatF, sortF, setSortF,
//        searchQ, setSearchQ, nav, addCart, toggleWish, inWish, setQv
export default function Shop({ lang, tr, isRTL, catF, setCatF, sortF, setSortF, searchQ, setSearchQ, nav, addCart, toggleWish, inWish, setQv }) {
  const filtered = PRODUCTS
    .filter(p => catF === 'all' || p.cat === catF)
    .filter(p => {
      if (!searchQ) return true;
      return (lang === 'ar' ? p.ar : p.en).toLowerCase().includes(searchQ.toLowerCase());
    })
    .sort((a, b) =>
      sortF === 'newest' ? b.id - a.id :
      sortF === 'best'   ? b.rc - a.rc :
      sortF === 'pAsc'   ? a.price - b.price : b.price - a.price
    );

  const CATS = ['all', 'jewelry', 'accessories', 'handbags'];

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 20px', fontFamily: FONT, direction: isRTL ? 'rtl' : 'ltr' }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: SERIF, fontSize: 38, fontWeight: 600, color: G.text, margin: '0 0 4px' }}>{tr.shop.title}</h1>
        <div style={{ width: 40, height: 2, background: G.gold }} />
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 28, alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {CATS.map(c => (
            <button key={c} onClick={() => setCatF(c)}
              style={{ background: catF === c ? G.gold : G.white, color: catF === c ? G.white : G.textM, border: `1px solid ${catF === c ? G.gold : G.bdr}`, borderRadius: 20, padding: '7px 16px', fontSize: 13, cursor: 'pointer', fontWeight: catF === c ? 600 : 400, fontFamily: FONT, transition: 'all .2s' }}>
              {tr.shop[c]}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <Search size={14} style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', insetInlineStart: 10, color: G.textL }} />
            <input value={searchQ} onChange={e => setSearchQ(e.target.value)} placeholder={tr.nav.ph}
              style={{ padding: `9px 12px 9px ${isRTL ? '12px' : '32px'}`, border: `1px solid ${G.bdr}`, borderRadius: 6, fontSize: 13, fontFamily: FONT, outline: 'none', background: G.bg, color: G.text, width: 180 }} />
          </div>
          <select value={sortF} onChange={e => setSortF(e.target.value)}
            style={{ padding: '9px 12px', border: `1px solid ${G.bdr}`, borderRadius: 6, fontSize: 13, fontFamily: FONT, background: G.bg, color: G.text, outline: 'none', cursor: 'pointer' }}>
            <option value="newest">{tr.shop.newest}</option>
            <option value="best">{tr.shop.best}</option>
            <option value="pAsc">{tr.shop.pAsc}</option>
            <option value="pDesc">{tr.shop.pDesc}</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0
        ? <div style={{ textAlign: 'center', padding: '80px 20px', color: G.textL }}><Search size={40} style={{ opacity: .3, marginBottom: 12 }} /><p>{tr.shop.noRes}</p></div>
        : <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 20 }}>
            {filtered.map(p => <ProductCard key={p.id} p={p} lang={lang} tr={tr} onNav={nav} onCart={addCart} onWish={toggleWish} inWish={inWish(p.id)} onQV={setQv} />)}
          </div>
      }
    </div>
  );
}