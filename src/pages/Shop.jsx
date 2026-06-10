import { Search } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import PublicSelect from '../components/ui/PublicSelect';
import { G, FONT, SERIF, PRODUCTS } from '../constants/data';

// Props: lang, tr, isRTL, products, catF, setCatF, sortF, setSortF,
//        searchQ, setSearchQ, nav, addCart, toggleWish, inWish, setQv
export default function Shop({ lang, tr, isRTL, products, catF, setCatF, sortF, setSortF, searchQ, setSearchQ, nav, addCart, toggleWish, inWish, setQv }) {
  const list = products && products.length ? products : PRODUCTS;
  const filtered = list
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
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: '1 1 150px', minWidth: 0, maxWidth: 220 }}>
            <Search size={14} style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', insetInlineStart: 10, color: G.textL }} />
            <input value={searchQ} onChange={e => setSearchQ(e.target.value)} placeholder={tr.nav.ph}
              style={{ padding: `9px 12px 9px ${isRTL ? '12px' : '32px'}`, border: `1px solid ${G.bdr}`, borderRadius: 6, fontSize: 13, fontFamily: FONT, outline: 'none', background: G.bg, color: G.text, width: '100%', boxSizing: 'border-box' }} />
          </div>
          <PublicSelect
            value={sortF}
            onChange={setSortF}
            isRTL={isRTL}
            minWidth={168}
            size="sm"
            ariaLabel={tr.shop.title}
            options={[
              { value: 'newest', label: tr.shop.newest },
              { value: 'best', label: tr.shop.best },
              { value: 'pAsc', label: tr.shop.pAsc },
              { value: 'pDesc', label: tr.shop.pDesc },
            ]}
          />
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