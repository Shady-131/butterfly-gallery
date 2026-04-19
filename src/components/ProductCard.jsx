import { useState } from 'react';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import Stars from './ui/Stars';
import { G } from '../constants/data';

// Props: p (product), lang, tr, onNav, onCart, onWish, inWish (bool), onQV
export default function ProductCard({ p, lang, tr, onNav, onCart, onWish, inWish, onQV }) {
  const [hov, setHov] = useState(false);

  const name = lang === 'ar' ? p.ar : p.en;
  const save = p.old ? Math.round((1 - p.price / p.old) * 100) : 0;

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background:   G.white,
        borderRadius: 8,
        overflow:     'hidden',
        border:       `1px solid ${G.bdr}`,
        transition:   'box-shadow .25s',
        boxShadow:    hov ? '0 8px 32px rgba(44,24,16,0.10)' : '0 2px 8px rgba(44,24,16,0.04)',
        position:     'relative',
        cursor:       'pointer',
      }}
    >
      {/* ── Image ── */}
      <div
        onClick={() => onNav('product', p)}
        style={{ position: 'relative', overflow: 'hidden', height: 240, background: G.pinkL }}
      >
        <img
          src={p.img} alt={name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .4s', transform: hov ? 'scale(1.07)' : 'scale(1)' }}
        />

        {/* Badges */}
        <div style={{ position: 'absolute', top: 10, left: 10, display: 'flex', flexDirection: 'column', gap: 5 }}>
          {p.isNew && <span style={{ background: G.gold,    color: G.white, fontSize: 10, fontWeight: 600, padding: '3px 8px', borderRadius: 3 }}>{tr.badges.n}</span>}
          {p.best  && <span style={{ background: G.pinkD,   color: G.white, fontSize: 10, fontWeight: 600, padding: '3px 8px', borderRadius: 3 }}>{tr.badges.b}</span>}
          {p.old   && <span style={{ background: '#2C1810', color: G.white, fontSize: 10, fontWeight: 600, padding: '3px 8px', borderRadius: 3 }}>{save}% {tr.badges.s}</span>}
        </div>

        {/* Wishlist button */}
        <button
          onClick={e => { e.stopPropagation(); onWish(p); }}
          style={{ position: 'absolute', top: 10, right: 10, background: G.white, border: 'none', borderRadius: '50%', width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
        >
          <Heart size={16} fill={inWish ? G.pinkD : 'none'} stroke={inWish ? G.pinkD : G.textL} />
        </button>

        {/* Quick view on hover */}
        {hov && (
          <button
            onClick={e => { e.stopPropagation(); onQV(p); }}
            style={{ position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)', background: 'rgba(44,24,16,0.85)', color: G.white, border: 'none', borderRadius: 4, padding: '7px 18px', fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap' }}
          >
            <Eye size={13} />{tr.shop.qv}
          </button>
        )}
      </div>

      {/* ── Info ── */}
      <div style={{ padding: '14px 16px 16px' }}>
        <p style={{ color: G.textL, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', margin: '0 0 4px' }}>
          {lang === 'ar' ? (p.cat === 'jewelry' ? 'مجوهرات' : p.cat === 'handbags' ? 'حقائب' : 'إكسسوارات') : p.cat}
        </p>
        <p onClick={() => onNav('product', p)} style={{ color: G.text, fontWeight: 500, fontSize: 15, margin: '0 0 8px', cursor: 'pointer' }}>{name}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 10 }}>
          <Stars n={p.stars} />
          <span style={{ color: G.textL, fontSize: 11, marginInlineStart: 2 }}>({p.rc})</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <span style={{ color: G.gold, fontWeight: 600, fontSize: 16 }}>{p.price.toLocaleString()} {tr.curr}</span>
            {p.old && <span style={{ color: G.textL, fontSize: 12, textDecoration: 'line-through', marginInlineStart: 8 }}>{p.old.toLocaleString()}</span>}
          </div>
          <button
            onClick={e => { e.stopPropagation(); onCart(p); }}
            style={{ background: G.pink, border: 'none', borderRadius: 4, padding: '7px 12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: G.text, fontWeight: 500, transition: 'background .2s' }}
            onMouseEnter={e => e.currentTarget.style.background = G.pinkD}
            onMouseLeave={e => e.currentTarget.style.background = G.pink}
          >
            <ShoppingBag size={13} />{lang === 'ar' ? 'أضيفي' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
}