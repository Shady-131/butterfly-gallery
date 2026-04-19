import { useState } from 'react';
import { MessageCircle, Mail, MapPin } from 'lucide-react';
import Btn from '../components/ui/Btn';
import { InstagramIcon, FacebookIcon, TikTokIcon } from '../components/ui/SocialIcons';
import { G, FONT, SERIF, SOCIAL_MEDIA } from '../constants/data';

// Props: lang, tr, isRTL, showToast
export default function Contact({ lang, tr, isRTL, showToast }) {
  const [form, setForm] = useState({ name: '', email: '', msg: '' });

  const handleSubmit = () => {
    if (form.name && form.email && form.msg) {
      showToast(isRTL ? 'تم إرسال رسالتك ✓' : 'Message sent ✓');
      setForm({ name: '', email: '', msg: '' });
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '60px 20px', fontFamily: FONT, direction: isRTL ? 'rtl' : 'ltr' }}>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <h1 style={{ fontFamily: SERIF, fontSize: 40, fontWeight: 600, color: G.text, marginBottom: 8 }}>{tr.contact.title}</h1>
        <div style={{ width: 48, height: 2, background: G.gold, margin: '0 auto' }} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'start' }}>

        {/* Form */}
        <div>
          {[
            { label: tr.contact.name,  key: 'name',  type: 'text'  },
            { label: tr.contact.email, key: 'email', type: 'email' },
          ].map(({ label, key, type }) => (
            <div key={key} style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', color: G.textM, fontSize: 13, fontWeight: 500, marginBottom: 6 }}>{label}</label>
              <input value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} type={type}
                style={{ width: '100%', padding: '11px 14px', border: `1px solid ${G.bdr}`, borderRadius: 6, fontSize: 14, fontFamily: FONT, background: G.bg, color: G.text, outline: 'none', boxSizing: 'border-box' }} />
            </div>
          ))}
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', color: G.textM, fontSize: 13, fontWeight: 500, marginBottom: 6 }}>{tr.contact.msg}</label>
            <textarea value={form.msg} onChange={e => setForm(f => ({ ...f, msg: e.target.value }))} rows={4}
              style={{ width: '100%', padding: '11px 14px', border: `1px solid ${G.bdr}`, borderRadius: 6, fontSize: 14, fontFamily: FONT, background: G.bg, color: G.text, outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
          </div>
          <Btn onClick={handleSubmit} style={{ width: '100%', boxSizing: 'border-box', textAlign: 'center' }}>{tr.contact.send}</Btn>
        </div>

        {/* Info */}
        <div>
          <div style={{ background: G.pinkL, borderRadius: 10, padding: 28, border: `1px solid ${G.bdr}`, marginBottom: 16 }}>
            {[
              { icon: <MessageCircle size={18} color={G.gold} />, text: '01000000000' },
              { icon: <Mail         size={18} color={G.gold} />, text: 'hello@butterflygallery.com' },
              ...(tr.contact.addr ? [{ icon: <MapPin size={18} color={G.gold} />, text: tr.contact.addr }] : []),
            ].map(item => (
              <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: 12, color: G.textM, fontSize: 14, marginBottom: 12 }}>
                {item.icon}{item.text}
              </div>
            ))}
          </div>
          <a href="https://wa.me/201000000000" target="_blank" rel="noreferrer"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: '#25D366', color: G.white, borderRadius: 8, padding: 14, textDecoration: 'none', fontSize: 15, fontFamily: FONT, fontWeight: 500, marginBottom: 10 }}>
            <MessageCircle size={18} />{tr.contact.wa}
          </a>
          <div style={{ display: 'flex', gap: 10 }}>
            {[
              { bg: '#E1306C', icon: <InstagramIcon size={18} />, label: 'Instagram', href: SOCIAL_MEDIA.instagram },
              { bg: '#1877F2', icon: <FacebookIcon  size={18} />, label: 'Facebook',  href: SOCIAL_MEDIA.facebook  },
              { bg: '#000',    icon: <TikTokIcon    size={18} />, label: 'TikTok',    href: SOCIAL_MEDIA.tiktok    },
            ].map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, background: s.bg, color: G.white, borderRadius: 8, padding: 12, textDecoration: 'none', fontSize: 12, fontFamily: FONT, fontWeight: 500, transition: 'all .2s' }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = `0 4px 12px rgba(0,0,0,0.2)`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}>
                {s.icon}{s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}