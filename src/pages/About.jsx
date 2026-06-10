import { Sparkles, Target } from 'lucide-react';
import Logo from '../components/ui/Logo';
import Btn  from '../components/ui/Btn';
import { G, FONT, SERIF } from '../constants/data';

// Props: lang, tr, isRTL, nav
export default function About({ lang, tr, isRTL, nav }) {
  return (
    <div style={{ fontFamily: FONT, direction: isRTL ? 'rtl' : 'ltr' }}>
      <div style={{ background: `linear-gradient(135deg,${G.pinkL},${G.goldL})`, padding: '80px 20px', textAlign: 'center' }}>
        <Logo size={44} />
        <h1 style={{ fontFamily: SERIF, fontSize: 48, fontWeight: 600, color: G.text, margin: '16px 0 12px' }}>{tr.about.title}</h1>
        <div style={{ width: 48, height: 2, background: G.gold, margin: '0 auto' }} />
      </div>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '60px 20px' }}>
        <div style={{ background: G.white, borderRadius: 12, padding: 40, border: `1px solid ${G.bdr}`, marginBottom: 24, textAlign: 'center' }}>
          <p style={{ color: G.textM, fontSize: 16, lineHeight: 1.9 }}>{tr.about.story}</p>
        </div>
        <style>{`
          .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
          @media (max-width: 600px) { .about-grid { grid-template-columns: 1fr; } }
        `}</style>
        <div className="about-grid">
          {[
            { title: tr.about.vis, text: tr.about.visT, Icon: Sparkles },
            { title: tr.about.mis, text: tr.about.misT, Icon: Target },
          ].map(({ title, text, Icon }) => (
            <div key={title} style={{ background: G.pinkL, borderRadius: 10, padding: 28, border: `1px solid ${G.bdr}` }}>
              <div style={{ marginBottom: 12 }}><Icon size={28} color={G.gold} strokeWidth={1.75} /></div>
              <h3 style={{ fontFamily: SERIF, fontSize: 22, color: G.text, marginBottom: 10 }}>{title}</h3>
              <p style={{ color: G.textM, fontSize: 14, lineHeight: 1.8, margin: 0 }}>{text}</p>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <Btn onClick={() => nav('shop')}>{isRTL ? 'تسوقي الآن' : 'Shop Now'} →</Btn>
        </div>
      </div>
    </div>
  );
}