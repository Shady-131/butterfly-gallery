import { Check } from 'lucide-react';
import Btn from '../components/ui/Btn';
import { G, FONT, SERIF } from '../constants/data';

// Props: lang, tr, isRTL, nav
export default function Confirmation({ lang, tr, isRTL, nav }) {
  return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, direction: isRTL ? 'rtl' : 'ltr', padding: 40 }}>
      <div style={{ textAlign: 'center', maxWidth: 480 }}>
        <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#E8F5E9', border: '3px solid #4CAF50', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
          <Check size={36} color="#4CAF50" strokeWidth={2.5} />
        </div>
        <h1 style={{ fontFamily: SERIF, fontSize: 34, color: G.text, marginBottom: 8 }}>{tr.conf.title}</h1>
        <p style={{ color: G.textM, fontSize: 16, fontWeight: 500, marginBottom: 8 }}>{tr.conf.sub}</p>
        <p style={{ color: G.textL, fontSize: 14, lineHeight: 1.7, marginBottom: 32 }}>{tr.conf.msg}</p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Btn onClick={() => nav('home')}>{isRTL ? 'الرئيسية' : 'Home'}</Btn>
          <Btn outline onClick={() => nav('shop')}>{isRTL ? 'متابعة التسوق' : 'Continue Shopping'}</Btn>
        </div>
      </div>
    </div>
  );
}