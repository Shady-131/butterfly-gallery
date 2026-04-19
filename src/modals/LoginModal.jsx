import { useState } from 'react';
import { X } from 'lucide-react';
import { G, FONT, SERIF } from '../constants/data';

// Props: open, onClose, isRTL, tr
export default function LoginModal({ open, onClose, isRTL, tr }) {
  const [isSignup, setIsSignup] = useState(false);
  if (!open) return null;

  const fields = [
    { key: 'email',    label: isRTL ? 'البريد الإلكتروني' : 'Email',    type: 'email'    },
    { key: 'password', label: isRTL ? 'كلمة المرور'        : 'Password', type: 'password' },
  ];

  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(44,24,16,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: G.white, borderRadius: 12, maxWidth: 360, width: '100%', padding: 32, direction: isRTL ? 'rtl' : 'ltr', fontFamily: FONT }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h2 style={{ fontFamily: SERIF, fontSize: 24, color: G.text, margin: 0 }}>
            {isSignup ? (isRTL ? 'إنشاء حساب' : 'Create Account') : (isRTL ? 'تسجيل الدخول' : 'Login')}
          </h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: G.textL }}><X size={18} /></button>
        </div>

        {fields.map(f => (
          <div key={f.key} style={{ marginBottom: 14 }}>
            <label style={{ display: 'block', color: G.textM, fontSize: 13, marginBottom: 6 }}>{f.label}</label>
            <input type={f.type} style={{ width: '100%', padding: '11px 12px', border: `1px solid ${G.bdr}`, borderRadius: 6, fontSize: 14, fontFamily: FONT, background: G.bg, outline: 'none', boxSizing: 'border-box' }} />
          </div>
        ))}

        <button
          onClick={onClose}
          style={{ width: '100%', background: G.gold, color: G.white, border: 'none', borderRadius: 4, padding: 13, fontWeight: 600, fontSize: 14, cursor: 'pointer', marginTop: 8, fontFamily: FONT }}
        >
          {isSignup ? (isRTL ? 'إنشاء الحساب' : 'Create Account') : (isRTL ? 'دخول' : 'Login')}
        </button>

        <p style={{ textAlign: 'center', fontSize: 13, color: G.textL, marginTop: 14 }}>
          {isSignup ? (isRTL ? 'لديكِ حساب؟' : 'Have an account?') : (isRTL ? 'ليس لديكِ حساب؟' : 'No account?')}
          <button onClick={() => setIsSignup(s => !s)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: G.gold, fontWeight: 600, fontFamily: FONT, fontSize: 13, marginInlineStart: 4 }}>
            {isSignup ? (isRTL ? 'تسجيل الدخول' : 'Login') : (isRTL ? 'إنشاء حساب' : 'Sign up')}
          </button>
        </p>
      </div>
    </div>
  );
}