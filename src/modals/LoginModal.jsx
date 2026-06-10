import { useState } from 'react';
import { X } from 'lucide-react';
import { G, FONT, SERIF } from '../constants/data';
import { useCustomerAuth } from '../context/CustomerAuthContext';

// Maps service error codes to localized messages.
const errMsg = (code, a) => {
  switch (code) {
    case 'EMAIL_EXISTS':   return a.errEmailExists;
    case 'NO_EMAIL':       return a.errNoEmail;
    case 'WRONG_PASSWORD': return a.errWrongPass;
    case 'MISSING_FIELDS': return a.errFields;
    default:               return a.errFields;
  }
};

// Props: open, onClose, isRTL, tr, showToast
export default function LoginModal({ open, onClose, isRTL, tr, showToast }) {
  const { login, signup } = useCustomerAuth();
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);
  const a = tr.auth;

  if (!open) return null;

  const reset = () => { setForm({ name: '', email: '', phone: '', password: '' }); setError(null); };
  const close = () => { reset(); onClose(); };
  const set = (k, v) => { setForm(f => ({ ...f, [k]: v })); setError(null); };

  const submit = async () => {
    setBusy(true);
    setError(null);
    const res = isSignup
      ? await signup(form)
      : await login({ email: form.email, password: form.password });
    setBusy(false);

    if (res.success) {
      if (showToast) showToast(`${isSignup ? a.signupOk : a.loginOk}`);
      close();
    } else {
      setError(errMsg(res.error, a));
    }
  };

  const fields = isSignup
    ? [
        { key: 'name',     label: a.name,     type: 'text'     },
        { key: 'email',    label: a.email,    type: 'email'    },
        { key: 'phone',    label: a.phone,    type: 'tel'      },
        { key: 'password', label: a.password, type: 'password' },
      ]
    : [
        { key: 'email',    label: a.email,    type: 'email'    },
        { key: 'password', label: a.password, type: 'password' },
      ];

  return (
    <div onClick={close} style={{ position: 'fixed', inset: 0, background: 'rgba(44,24,16,0.5)', zIndex: 10001, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: G.white, borderRadius: 12, maxWidth: 380, width: '100%', padding: 32, direction: isRTL ? 'rtl' : 'ltr', fontFamily: FONT }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h2 style={{ fontFamily: SERIF, fontSize: 24, color: G.text, margin: 0 }}>
            {isSignup ? a.signup : a.login}
          </h2>
          <button onClick={close} style={{ background: 'none', border: 'none', cursor: 'pointer', color: G.textL }}><X size={18} /></button>
        </div>

        {fields.map(f => (
          <div key={f.key} style={{ marginBottom: 14 }}>
            <label style={{ display: 'block', color: G.textM, fontSize: 13, marginBottom: 6 }}>{f.label}</label>
            <input
              type={f.type}
              value={form[f.key]}
              onChange={e => set(f.key, e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') submit(); }}
              style={{ width: '100%', padding: '11px 12px', border: `1px solid ${G.bdr}`, borderRadius: 6, fontSize: 14, fontFamily: FONT, background: G.bg, color: G.text, outline: 'none', boxSizing: 'border-box' }}
            />
          </div>
        ))}

        {error && (
          <div style={{ background: '#FEE2E2', color: '#DC2626', border: '1px solid #FECACA', borderRadius: 6, padding: '8px 12px', fontSize: 13, marginBottom: 12 }}>
            {error}
          </div>
        )}

        <button
          onClick={submit}
          disabled={busy}
          style={{ width: '100%', background: G.gold, color: G.white, border: 'none', borderRadius: 4, padding: 13, fontWeight: 600, fontSize: 14, cursor: busy ? 'not-allowed' : 'pointer', opacity: busy ? 0.7 : 1, marginTop: 4, fontFamily: FONT }}
        >
          {isSignup ? a.signupBtn : a.loginBtn}
        </button>

        <p style={{ textAlign: 'center', fontSize: 13, color: G.textL, marginTop: 14 }}>
          {isSignup ? a.haveAcc : a.noAcc}
          <button onClick={() => { setIsSignup(s => !s); setError(null); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: G.gold, fontWeight: 600, fontFamily: FONT, fontSize: 13, marginInlineStart: 4 }}>
            {isSignup ? a.login : a.signup}
          </button>
        </p>
      </div>
    </div>
  );
}
