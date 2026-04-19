import { ShoppingBag, Minus, Plus, Trash2, Check } from 'lucide-react';
import Btn from '../components/ui/Btn';
import { G, FONT, SERIF } from '../constants/data';

// Props: lang, tr, isRTL, cart, rmCart, updQty, sub, disc,
//        discApplied, setDiscApplied, total, discCode, setDiscCode, showToast, nav
export default function Cart({ lang, tr, isRTL, cart, rmCart, updQty, sub, disc, discApplied, setDiscApplied, total, discCode, setDiscCode, showToast, nav }) {
  const handleDiscount = () => {
    if (discCode === 'BUTTERFLY15') { setDiscApplied(true); showToast(tr.discOk); }
    else showToast(tr.discFail);
  };

  if (cart.length === 0) return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '40px 20px', fontFamily: FONT, direction: isRTL ? 'rtl' : 'ltr' }}>
      <h1 style={{ fontFamily: SERIF, fontSize: 34, fontWeight: 600, color: G.text, marginBottom: 6 }}>{tr.cart.title}</h1>
      <div style={{ height: 2, width: 40, background: G.gold, marginBottom: 32 }} />
      <div style={{ textAlign: 'center', padding: '80px 20px' }}>
        <ShoppingBag size={60} style={{ color: G.pink, marginBottom: 16 }} />
        <p style={{ fontFamily: SERIF, fontSize: 24, color: G.text, marginBottom: 8 }}>{tr.cart.empty}</p>
        <p style={{ color: G.textL, fontSize: 14, marginBottom: 24 }}>{tr.cart.emptySub}</p>
        <Btn onClick={() => nav('shop')}>{tr.cart.cont}</Btn>
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '40px 20px', fontFamily: FONT, direction: isRTL ? 'rtl' : 'ltr' }}>
      <h1 style={{ fontFamily: SERIF, fontSize: 34, fontWeight: 600, color: G.text, marginBottom: 6 }}>{tr.cart.title}</h1>
      <div style={{ height: 2, width: 40, background: G.gold, marginBottom: 32 }} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 28, alignItems: 'start' }}>

        {/* Items */}
        <div>
          {cart.map(item => (
            <div key={item.id} style={{ display: 'flex', gap: 16, padding: '16px 0', borderBottom: `1px solid ${G.bdr}`, alignItems: 'center' }}>
              <img src={item.img} alt="" style={{ width: 80, height: 80, borderRadius: 8, objectFit: 'cover', border: `1px solid ${G.bdr}`, cursor: 'pointer' }} onClick={() => nav('product', item)} />
              <div style={{ flex: 1 }}>
                <p style={{ color: G.text, fontWeight: 500, fontSize: 15, margin: '0 0 4px', cursor: 'pointer' }} onClick={() => nav('product', item)}>{lang === 'ar' ? item.ar : item.en}</p>
                <p style={{ color: G.gold, fontWeight: 600, fontSize: 15, margin: '0 0 10px' }}>{item.price.toLocaleString()} {tr.curr}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', border: `1px solid ${G.bdr}`, borderRadius: 5 }}>
                    <button onClick={() => updQty(item.id, item.qty - 1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px 10px', color: G.textM }}><Minus size={12} /></button>
                    <span style={{ padding: '6px 10px', fontSize: 13, color: G.text, minWidth: 30, textAlign: 'center' }}>{item.qty}</span>
                    <button onClick={() => updQty(item.id, item.qty + 1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px 10px', color: G.textM }}><Plus size={12} /></button>
                  </div>
                  <button onClick={() => rmCart(item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#E57373', display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, fontFamily: FONT, padding: 0 }}>
                    <Trash2 size={13} />{lang === 'ar' ? 'حذف' : 'Remove'}
                  </button>
                </div>
              </div>
              <p style={{ color: G.text, fontWeight: 600, fontSize: 15 }}>{(item.price * item.qty).toLocaleString()} {tr.curr}</p>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div style={{ background: G.pinkL, borderRadius: 10, padding: 24, border: `1px solid ${G.bdr}`, position: 'sticky', top: 80 }}>
          <p style={{ fontFamily: SERIF, fontSize: 20, fontWeight: 600, color: G.text, marginBottom: 20 }}>{tr.cart.sum}</p>
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            <input value={discCode} onChange={e => setDiscCode(e.target.value.toUpperCase())} placeholder={tr.cart.disc}
              style={{ flex: 1, padding: '10px 12px', border: `1px solid ${G.bdr}`, borderRadius: 6, fontSize: 13, fontFamily: FONT, background: G.white, color: G.text, outline: 'none' }} />
            <button onClick={handleDiscount} style={{ background: G.gold, border: 'none', borderRadius: 6, padding: '10px 14px', color: G.white, fontSize: 13, cursor: 'pointer', fontFamily: FONT, fontWeight: 500 }}>
              {tr.cart.apply}
            </button>
          </div>
          {discApplied && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#2E7D32', fontSize: 12, marginBottom: 12, background: '#E8F5E9', borderRadius: 4, padding: '6px 10px' }}>
              <Check size={13} />{tr.cart.saved}: {disc.toLocaleString()} {tr.curr}
            </div>
          )}
          <div style={{ fontSize: 14, color: G.textM }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}><span>{tr.cart.subtotal}</span><span style={{ fontWeight: 500 }}>{sub.toLocaleString()} {tr.curr}</span></div>
            {discApplied && <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', color: '#2E7D32' }}><span>{tr.cart.saved}</span><span>-{disc.toLocaleString()} {tr.curr}</span></div>}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}><span>{tr.cart.ship}</span><span style={{ color: '#2E7D32', fontWeight: 500 }}>{tr.cart.free}</span></div>
          </div>
          <div style={{ borderTop: `1px solid ${G.bdr}`, marginTop: 12, paddingTop: 12, display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
            <span style={{ fontFamily: SERIF, fontSize: 18, fontWeight: 600, color: G.text }}>{isRTL ? 'الإجمالي' : 'Total'}</span>
            <span style={{ fontFamily: SERIF, fontSize: 18, fontWeight: 600, color: G.gold }}>{total.toLocaleString()} {tr.curr}</span>
          </div>
          <Btn onClick={() => nav('checkout')} style={{ width: '100%', boxSizing: 'border-box', textAlign: 'center' }}>{tr.cart.checkout} →</Btn>
          <button onClick={() => nav('shop')} style={{ display: 'block', width: '100%', textAlign: 'center', background: 'none', border: 'none', cursor: 'pointer', color: G.textL, fontSize: 13, marginTop: 12, fontFamily: FONT, padding: '8px 0' }}>
            ← {tr.cart.cont}
          </button>
        </div>
      </div>
    </div>
  );
}