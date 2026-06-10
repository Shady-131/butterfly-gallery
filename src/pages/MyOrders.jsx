import { useEffect } from 'react';
import { Package, LogIn } from 'lucide-react';
import Btn from '../components/ui/Btn';
import PriceText from '../components/ui/PriceText';
import { G, FONT, SERIF, statusLabel, statusColor } from '../constants/data';
import { useAppData } from '../context/AppDataContext';
import { useCustomerAuth } from '../context/CustomerAuthContext';

// Props: lang, tr, isRTL, nav, onLogin
export default function MyOrders({ lang, tr, isRTL, nav, onLogin }) {
  const { orders, refreshData } = useAppData();
  const { customer, isLoggedIn } = useCustomerAuth();

  // Pull the latest orders from localStorage (e.g. after admin status changes).
  useEffect(() => { refreshData(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!isLoggedIn) {
    return (
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '60px 20px', fontFamily: FONT, direction: isRTL ? 'rtl' : 'ltr', textAlign: 'center' }}>
        <h1 style={{ fontFamily: SERIF, fontSize: 34, color: G.text, marginBottom: 6 }}>{tr.myOrders.title}</h1>
        <div style={{ height: 2, width: 40, background: G.gold, margin: '0 auto 32px' }} />
        <Package size={56} style={{ color: G.pink, marginBottom: 16 }} />
        <p style={{ color: G.textM, fontSize: 16, marginBottom: 24 }}>{tr.myOrders.loginNeeded}</p>
        <Btn onClick={onLogin} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <LogIn size={16} />{tr.nav.login}
        </Btn>
      </div>
    );
  }

  const myOrders = (orders || [])
    .filter(o => (o.customerId && o.customerId === customer.id) ||
                 (o.customer?.email && o.customer.email === customer.email))
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div style={{ maxWidth: 820, margin: '0 auto', padding: '40px 20px', fontFamily: FONT, direction: isRTL ? 'rtl' : 'ltr' }}>
      <h1 style={{ fontFamily: SERIF, fontSize: 34, color: G.text, marginBottom: 6 }}>{tr.myOrders.title}</h1>
      <p style={{ color: G.textL, fontSize: 13, marginBottom: 4 }}>{customer.name} · {customer.email}</p>
      <div style={{ height: 2, width: 40, background: G.gold, marginBottom: 28 }} />

      {myOrders.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '64px 20px' }}>
          <Package size={56} style={{ color: G.pink, marginBottom: 16 }} />
          <p style={{ color: G.text, fontFamily: SERIF, fontSize: 22, marginBottom: 8 }}>{tr.myOrders.empty}</p>
          <p style={{ color: G.textL, fontSize: 14, marginBottom: 24 }}>{tr.myOrders.emptySub}</p>
          <Btn onClick={() => nav('shop')}>{tr.cart.cont}</Btn>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: 18 }}>
          {myOrders.map(o => (
            <div key={o.id} style={{ background: G.white, border: `1px solid ${G.bdr}`, borderRadius: 12, padding: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, alignItems: 'center', marginBottom: 14 }}>
                <div>
                  <p style={{ color: G.text, fontWeight: 600, fontSize: 15, margin: 0 }}>{o.id}</p>
                  <p style={{ color: G.textL, fontSize: 12, margin: '2px 0 0' }}>{new Date(o.createdAt).toLocaleString(lang === 'ar' ? 'ar-EG' : 'en-GB')}</p>
                </div>
                <span style={{ background: `${statusColor(o.status)}22`, color: statusColor(o.status), border: `1px solid ${statusColor(o.status)}`, borderRadius: 20, padding: '4px 14px', fontSize: 12, fontWeight: 600 }}>
                  {statusLabel(o.status, lang)}
                </span>
              </div>

              <div style={{ borderTop: `1px solid ${G.bdr}`, paddingTop: 12 }}>
                {(o.items || []).map(i => (
                  <div key={i.id} style={{ display: 'flex', justifyContent: 'space-between', gap: 10, fontSize: 13, color: G.textM, marginBottom: 6 }}>
                    <span>{(lang === 'ar' ? i.ar : i.en)} ×{i.qty}</span>
                    <PriceText amount={i.price * i.qty} lang={lang} />
                  </div>
                ))}
              </div>

              <div style={{ borderTop: `1px solid ${G.bdr}`, marginTop: 10, paddingTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                <span style={{ color: G.textL, fontSize: 12 }}>
                  {tr.co.pay}: {o.paymentMethod === 'instapay' ? tr.co.instapay : tr.co.cod}
                </span>
                <PriceText amount={o.total} lang={lang} size={17} weight={600} color={G.gold} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
