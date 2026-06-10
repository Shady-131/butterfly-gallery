import { X } from 'lucide-react';
import Stars from '../components/ui/Stars';
import Btn   from '../components/ui/Btn';
import PriceText from '../components/ui/PriceText';
import { G, SERIF, FONT, isAvailable } from '../constants/data';

// Props: qv (product|null), setQv, lang, tr, isRTL, addCart, nav
export default function QuickViewModal({ qv, setQv, lang, tr, isRTL, addCart, nav }) {
  if (!qv) return null;

  const name = lang === 'ar' ? qv.ar : qv.en;
  const desc = lang === 'ar' ? qv.dAr : qv.dEn;
  const avail = isAvailable(qv);

  return (
    <div
      onClick={() => setQv(null)}
      style={{ position: 'fixed', inset: 0, background: 'rgba(44,24,16,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}
    >
      <style>{`
        .qv-modal { display: grid; grid-template-columns: 1fr 1fr; }
        @media (max-width: 560px) { .qv-modal { grid-template-columns: 1fr; } }
      `}</style>
      <div
        onClick={e => e.stopPropagation()}
        className="qv-modal"
        style={{ background: G.white, borderRadius: 12, maxWidth: 700, width: '100%', maxHeight: '90vh', overflowY: 'auto', direction: isRTL ? 'rtl' : 'ltr' }}
      >
        <div style={{ height: 340, background: G.pinkL }}>
          <img src={qv.img} alt={name} loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ padding: 28, fontFamily: FONT }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 12 }}>
            <p style={{ color: G.textL, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', margin: 0 }}>
              {lang === 'ar' ? (qv.cat === 'jewelry' ? 'مجوهرات' : qv.cat === 'handbags' ? 'حقائب' : 'إكسسوارات') : qv.cat}
            </p>
            <button onClick={() => setQv(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: G.textL, padding: 0 }}>
              <X size={18} />
            </button>
          </div>
          <h2 style={{ fontFamily: SERIF, fontSize: 22, color: G.text, margin: '0 0 8px' }}>{name}</h2>
          <div style={{ display: 'flex', gap: 2, marginBottom: 8 }}><Stars n={qv.stars} /></div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'baseline', marginBottom: 12 }}>
            <PriceText amount={qv.price} lang={lang} size={22} color={G.gold} />
            {qv.old && <PriceText amount={qv.old} lang={lang} size={13} color={G.textL} old />}
          </div>
          <p style={{ color: G.textM, fontSize: 13, lineHeight: 1.7, marginBottom: 20 }}>{desc}</p>
          <div style={{ display: 'flex', gap: 8, flexDirection: 'column' }}>
            {avail ? (
              <Btn onClick={() => { addCart(qv); setQv(null); }} style={{ width: '100%', textAlign: 'center', boxSizing: 'border-box' }}>
                {tr.prod.addCart}
              </Btn>
            ) : (
              <button disabled style={{ width: '100%', textAlign: 'center', background: G.bdr, color: G.textL, border: `1.5px solid ${G.bdr}`, borderRadius: 4, padding: '12px 28px', fontSize: 14, fontWeight: 500, cursor: 'not-allowed', fontFamily: FONT }}>
                {tr.unavailable}
              </button>
            )}
            <button
              onClick={() => { nav('product', qv); setQv(null); }}
              style={{ background: 'none', border: `1px solid ${G.bdr}`, borderRadius: 4, padding: 10, cursor: 'pointer', color: G.textM, fontSize: 13, fontFamily: FONT }}
            >
              {isRTL ? 'عرض التفاصيل' : 'View Details'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}