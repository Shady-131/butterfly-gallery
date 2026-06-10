import { Heart, ShoppingBag, Minus, Plus } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import Stars from '../components/ui/Stars';
import Btn   from '../components/ui/Btn';
import PriceText from '../components/ui/PriceText';
import { G, FONT, SERIF, PRODUCTS, isAvailable } from '../constants/data';

const catLabel = (cat, lang) =>
  lang === 'ar'
    ? (cat === 'jewelry' ? 'مجوهرات' : cat === 'handbags' ? 'حقائب' : 'إكسسوارات')
    : cat;

// Props: lang, tr, isRTL, nav, products, selP, setSelP, addCart, toggleWish, inWish, qty, setQty, setQv
export default function Product({ lang, tr, isRTL, nav, products, selP, setSelP, addCart, toggleWish, inWish, qty, setQty, setQv }) {
  const list = products && products.length ? products : PRODUCTS;

  // No product selected (e.g. navigated here directly) — guide the user back.
  if (!selP) return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 20px', textAlign: 'center', fontFamily: FONT, direction: isRTL ? 'rtl' : 'ltr' }}>
      <p style={{ fontFamily: SERIF, fontSize: 22, color: G.text, marginBottom: 20 }}>
        {isRTL ? 'لم يتم اختيار منتج' : 'No product selected'}
      </p>
      <Btn onClick={() => nav('shop')}>{isRTL ? 'تصفحي المتجر' : 'Browse Shop'}</Btn>
    </div>
  );

  const name = lang === 'ar' ? selP.ar : selP.en;
  const desc = lang === 'ar' ? selP.dAr : selP.dEn;
  const save = selP.old ? Math.round((1 - selP.price / selP.old) * 100) : 0;
  const inW  = inWish(selP.id);
  const avail = isAvailable(selP);

  const related = list.filter(p => p.cat === selP.cat && p.id !== selP.id).slice(0, 4);

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 20px', fontFamily: FONT, direction: isRTL ? 'rtl' : 'ltr' }}>
      <style>{`
        @media (max-width: 767px) {
          .product-layout { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 768px) {
          .product-layout { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>

      {/* Back */}
      <button onClick={() => nav('shop')} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', color: G.textM, fontSize: 13, marginBottom: 24, fontFamily: FONT, padding: 0 }}>
        {isRTL ? '→' : '←'} {isRTL ? 'رجوع للمتجر' : 'Back to Shop'}
      </button>

      <div className="product-layout" style={{ display: 'grid', gap: 36, alignItems: 'start' }}>
        {/* Image */}
        <div style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', background: G.pinkL, border: `1px solid ${G.bdr}` }}>
          <img src={selP.img} alt={name} decoding="async" style={{ width: '100%', height: '100%', maxHeight: 520, objectFit: 'cover', display: 'block' }} />
          <div style={{ position: 'absolute', top: 14, insetInlineStart: 14, display: 'flex', flexDirection: 'column', gap: 5 }}>
            {selP.isNew && <span style={{ background: G.gold,    color: G.white, fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 3 }}>{tr.badges.n}</span>}
            {selP.best  && <span style={{ background: G.pinkD,   color: G.white, fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 3 }}>{tr.badges.b}</span>}
            {selP.old   && <span style={{ background: '#2C1810', color: G.white, fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 3 }}>{save}% {tr.badges.s}</span>}
          </div>
        </div>

        {/* Details */}
        <div>
          <p style={{ color: G.textL, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.12em', margin: '0 0 8px' }}>
            {catLabel(selP.cat, lang)}
          </p>
          <h1 style={{ fontFamily: SERIF, fontSize: 'clamp(26px,4vw,36px)', fontWeight: 600, color: G.text, margin: '0 0 12px' }}>{name}</h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 16 }}>
            <Stars n={selP.stars} />
            <span style={{ color: G.textL, fontSize: 12 }}>({selP.rc})</span>
            {avail
              ? <span style={{ color: '#2E7D32', fontSize: 12, marginInlineStart: 10 }}>● {tr.prod.inStock}</span>
              : <span style={{ color: '#C0392B', fontSize: 12, marginInlineStart: 10 }}>● {tr.unavailable}</span>}
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 20 }}>
            <PriceText amount={selP.price} lang={lang} size={28} color={G.gold} />
            {selP.old && <PriceText amount={selP.old} lang={lang} size={16} color={G.textL} old />}
          </div>

          {desc && <p style={{ color: G.textM, fontSize: 14, lineHeight: 1.9, marginBottom: 28 }}>{desc}</p>}

          {/* Quantity */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
            <span style={{ color: G.textM, fontSize: 13, fontWeight: 500 }}>{tr.prod.qty}</span>
            <div style={{ display: 'flex', alignItems: 'center', border: `1px solid ${G.bdr}`, borderRadius: 6 }}>
              <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px 12px', color: G.textM }}><Minus size={14} /></button>
              <span style={{ padding: '8px 14px', fontSize: 14, color: G.text, minWidth: 34, textAlign: 'center' }}>{qty}</span>
              <button onClick={() => setQty(q => q + 1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px 12px', color: G.textM }}><Plus size={14} /></button>
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {avail ? (
              <Btn onClick={() => { addCart(selP, qty); setQty(1); }} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <ShoppingBag size={16} />{tr.prod.addCart}
              </Btn>
            ) : (
              <button disabled style={{ display: 'flex', alignItems: 'center', gap: 8, background: G.bdr, color: G.textL, border: `1.5px solid ${G.bdr}`, borderRadius: 4, padding: '12px 28px', fontSize: 14, fontWeight: 500, cursor: 'not-allowed', fontFamily: FONT }}>
                <ShoppingBag size={16} />{tr.unavailable}
              </button>
            )}
            <button
              onClick={() => toggleWish(selP)}
              style={{ display: 'flex', alignItems: 'center', gap: 8, background: inW ? G.pinkL : 'transparent', border: `1.5px solid ${inW ? G.pinkD : G.bdr}`, borderRadius: 4, padding: '12px 20px', cursor: 'pointer', color: inW ? G.pinkD : G.textM, fontSize: 14, fontFamily: FONT, fontWeight: 500 }}
            >
              <Heart size={16} fill={inW ? G.pinkD : 'none'} stroke={inW ? G.pinkD : G.textM} />{tr.prod.addWish}
            </button>
          </div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div style={{ marginTop: 64 }}>
          <h2 style={{ fontFamily: SERIF, fontSize: 26, fontWeight: 600, color: G.text, margin: '0 0 6px' }}>{tr.prod.related}</h2>
          <div style={{ width: 40, height: 2, background: G.gold, marginBottom: 24 }} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 20 }}>
            {related.map(p => (
              <ProductCard key={p.id} p={p} lang={lang} tr={tr} onNav={nav} onCart={addCart} onWish={toggleWish} inWish={inWish(p.id)} onQV={setQv} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
