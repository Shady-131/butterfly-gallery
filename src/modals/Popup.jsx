import { X } from 'lucide-react';
import Logo from '../components/ui/Logo';
import Btn  from '../components/ui/Btn';
import { G, FONT, SERIF } from '../constants/data';

// Props: show, onClose, tr, isRTL, onClaim (fn called when user clicks CTA)
export default function Popup({ show, onClose, tr, isRTL, onClaim }) {
  if (!show) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(44,24,16,0.5)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ background: G.white, borderRadius: 16, maxWidth: 380, width: '100%', padding: 36, textAlign: 'center', direction: isRTL ? 'rtl' : 'ltr', position: 'relative', border: `2px solid ${G.goldL}`, fontFamily: FONT }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 12, right: 12, background: 'none', border: 'none', cursor: 'pointer', color: G.textL }}>
          <X size={16} />
        </button>
        <Logo size={36} />
        <h2 style={{ fontFamily: SERIF, fontSize: 26, color: G.text, margin: '14px 0 8px' }}>{tr.popup.title}</h2>
        <p style={{ color: G.textM, fontSize: 14, marginBottom: 20 }}>{tr.popup.sub}</p>
        <div style={{ background: G.goldL, border: `1.5px dashed ${G.gold}`, borderRadius: 8, padding: '12px 20px', marginBottom: 20 }}>
          <span style={{ fontFamily: SERIF, fontSize: 22, fontWeight: 600, color: G.gold, letterSpacing: '0.1em' }}>{tr.popup.code}</span>
        </div>
        <Btn onClick={onClaim} style={{ width: '100%', boxSizing: 'border-box', textAlign: 'center' }}>{tr.popup.cta}</Btn>
        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: G.textL, fontSize: 12, marginTop: 12, fontFamily: FONT, display: 'block', width: '100%' }}>
          {tr.popup.close}
        </button>
      </div>
    </div>
  );
}