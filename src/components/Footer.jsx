import { MessageCircle, Mail, MapPin } from 'lucide-react';
import Logo from './ui/Logo';
import { InstagramIcon, FacebookIcon, TikTokIcon } from './ui/SocialIcons';
import { G, FONT, SERIF, SOCIAL_MEDIA } from '../constants/data';

// Props: lang, nav, tr, isRTL
export default function Footer({ lang, nav, tr, isRTL }) {

  // تم حذف تعريف TikTokIcon الداخلي لأنه موجود فعلاً في SocialIcons

  const SOCIAL_LINKS = [
    { icon: <InstagramIcon size={16} />, label: 'Instagram', href: SOCIAL_MEDIA.instagram },
    { icon: <FacebookIcon  size={16} />, label: 'Facebook',  href: SOCIAL_MEDIA.facebook  },
    { icon: <TikTokIcon size={16} />,    label: 'TikTok',    href: SOCIAL_MEDIA.tiktok   },
  ];

  return (
    <footer style={{ background: '#2C1810', color: 'rgba(253,248,245,0.9)', fontFamily: FONT, direction: isRTL ? 'rtl' : 'ltr' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 20px 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 32 }}>

        {/* Brand */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <Logo size={22} />
            <span style={{ fontFamily: SERIF, fontSize: 18, fontWeight: 600, color: G.goldL }}>{tr.brand}</span>
          </div>
          <p style={{ fontSize: 13, lineHeight: 1.7, color: 'rgba(253,248,245,0.65)', marginBottom: 16 }}>{tr.tagline}</p>
          <div style={{ display: 'flex', gap: 10 }}>
            {SOCIAL_LINKS.map(s => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                target="_blank"
                rel="noreferrer"
                style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 6, padding: 8, color: 'rgba(253,248,245,0.7)', display: 'flex', textDecoration: 'none', transition: 'all .25s ease, transform .25s ease', cursor: 'pointer' }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.18)';
                  e.currentTarget.style.color = G.goldL;
                  e.currentTarget.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                  e.currentTarget.style.color = 'rgba(253,248,245,0.7)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Links */}
        <div>
          <p style={{ color: G.goldL, fontWeight: 500, fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>{isRTL ? 'تصفحي' : 'Explore'}</p>
          {['home', 'shop', 'about', 'contact'].map(p => (
            <button key={p} onClick={() => nav(p)} style={{ display: 'block', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(253,248,245,0.65)', fontFamily: FONT, fontSize: 13, padding: '5px 0', textAlign: isRTL ? 'right' : 'left', transition: 'color .2s' }}
              onMouseEnter={e => e.currentTarget.style.color = G.goldL}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(253,248,245,0.65)'}>
              {tr.nav[p]}
            </button>
          ))}
        </div>

        {/* Contact */}
        <div>
          <p style={{ color: G.goldL, fontWeight: 500, fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>{isRTL ? 'تواصلي' : 'Contact'}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { icon: <MessageCircle size={14} />, text: 'WhatsApp' },
              { icon: <Mail size={14} />,          text: 'hello@butterflygallery.com' },
              ...(tr.contact.addr ? [{ icon: <MapPin size={14} />, text: tr.contact.addr }] : []),
            ].map(item => (
              <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(253,248,245,0.65)', fontSize: 13 }}>
                {item.icon}{item.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', textAlign: 'center', padding: '16px 20px', fontSize: 12, color: 'rgba(253,248,245,0.4)' }}>
        © 2025 Butterfly Gallery. {isRTL ? 'جميع الحقوق محفوظة' : 'All rights reserved.'}
      </div>
    </footer>
  );
}