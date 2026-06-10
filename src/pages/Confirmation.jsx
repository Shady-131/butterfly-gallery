import { Check } from 'lucide-react';
import Btn from '../components/ui/Btn';
import PriceText from '../components/ui/PriceText';
import { G, FONT, SERIF, statusLabel, statusColor } from '../constants/data';

// Props: lang, tr, isRTL, nav, lastOrder
export default function Confirmation({ lang, tr, isRTL, nav, lastOrder }) {
  return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, direction: isRTL ? 'rtl' : 'ltr', padding: 40 }}>
      <div style={{ textAlign: 'center', maxWidth: 520, width: '100%' }}>
        <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#E8F5E9', border: '3px solid #4CAF50', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
          <Check size={36} color="#4CAF50" strokeWidth={2.5} />
        </div>
        <h1 style={{ fontFamily: SERIF, fontSize: 34, color: G.text, marginBottom: 8 }}>{tr.conf.title}</h1>
        <p style={{ color: G.textM, fontSize: 16, fontWeight: 500, marginBottom: 8 }}>{tr.conf.sub}</p>
        <p style={{ color: G.textL, fontSize: 14, lineHeight: 1.7, marginBottom: 24 }}>{tr.conf.msg}</p>

        {lastOrder && (
          <div style={{ background: G.pinkL, border: `1px solid ${G.bdr}`, borderRadius: 12, padding: 20, marginBottom: 24, textAlign: isRTL ? 'right' : 'left' }}>
            {/* Order number + customer */}
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, marginBottom: 14 }}>
              <div>
                <p style={{ color: G.textL, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 2px' }}>{isRTL ? 'رقم الطلب' : 'Order Number'}</p>
                <p style={{ color: G.text, fontSize: 14, fontWeight: 600, margin: 0 }}>{lastOrder.id}</p>
              </div>
              {lastOrder.customer?.name && (
                <div style={{ textAlign: isRTL ? 'left' : 'right' }}>
                  <p style={{ color: G.textL, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 2px' }}>{isRTL ? 'الاسم' : 'Name'}</p>
                  <p style={{ color: G.text, fontSize: 14, fontWeight: 600, margin: 0 }}>{lastOrder.customer.name}</p>
                </div>
              )}
            </div>

            {/* Items */}
            <div style={{ borderTop: `1px solid ${G.bdr}`, paddingTop: 12 }}>
              {(lastOrder.items || []).map(i => (
                <div key={i.id} style={{ display: 'flex', justifyContent: 'space-between', gap: 10, fontSize: 13, color: G.textM, marginBottom: 6 }}>
                  <span>{(lang === 'ar' ? i.ar : i.en)} ×{i.qty}</span>
                  <PriceText amount={i.price * i.qty} lang={lang} />
                </div>
              ))}
            </div>

            {/* Payment + status */}
            <div style={{ borderTop: `1px solid ${G.bdr}`, marginTop: 10, paddingTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
              <span style={{ color: G.textM, fontSize: 13 }}>
                {tr.co.pay}: {lastOrder.paymentMethod === 'instapay' ? tr.co.instapay : tr.co.cod}
              </span>
              <span style={{ background: `${statusColor(lastOrder.status)}22`, color: statusColor(lastOrder.status), border: `1px solid ${statusColor(lastOrder.status)}`, borderRadius: 20, padding: '3px 12px', fontSize: 12, fontWeight: 600 }}>
                {statusLabel(lastOrder.status, lang)}
              </span>
            </div>

            {/* Total */}
            <div style={{ borderTop: `1px solid ${G.bdr}`, marginTop: 10, paddingTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontFamily: SERIF, fontSize: 17, fontWeight: 600, color: G.text }}>{tr.co.total}</span>
              <PriceText amount={lastOrder.total} lang={lang} size={18} weight={600} color={G.gold} />
            </div>
          </div>
        )}

        {/* Order created note — track status from My Orders */}
        <p style={{ color: G.textM, fontSize: 13, lineHeight: 1.7, marginBottom: 16 }}>
          {tr.conf.created}
        </p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Btn onClick={() => nav('myorders')}>{tr.myOrders.title}</Btn>
          <Btn outline onClick={() => nav('shop')}>{isRTL ? 'متابعة التسوق' : 'Continue Shopping'}</Btn>
        </div>
      </div>
    </div>
  );
}
