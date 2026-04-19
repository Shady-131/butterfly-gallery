import { InstagramIcon } from '../components/ui/SocialIcons';
import ProductCard from '../components/ProductCard';
import Stars       from '../components/ui/Stars';
import Btn         from '../components/ui/Btn';
import Logo        from '../components/ui/Logo';
import { G, FONT, SERIF, PRODUCTS, REVIEWS_DATA } from '../constants/data';

// Props: lang, tr, isRTL, nav, addCart, toggleWish, inWish, setQv, email, setEmail, showToast
export default function Home({ lang, tr, isRTL, nav, addCart, toggleWish, inWish, setQv, email, setEmail, showToast }) {
  const CATEGORIES = [
    { k: 'jewelry',     img: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80' },
    { k: 'accessories', img: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80' },
    { k: 'handbags',    img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80'   },
  ];

  return (
    <div style={{ fontFamily: FONT, direction: isRTL ? 'rtl' : 'ltr' }}>
      <style>{`
        @media (max-width: 767px) {
          .hero-grid {
            display: grid !important;
            grid-template-columns: 1fr !important;
            gap: 24px !important;
            align-items: center !important;
          }
          .hero-images {
            grid-template-columns: 1fr 1fr !important;
            gap: 8px !important;
          }
          .hero-text {
            text-align: center !important;
            padding: 40px 0 !important;
          }
        }
        @media (min-width: 768px) {
          .hero-grid {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 40px !important;
            align-items: center !important;
          }
          .hero-images {
            grid-template-columns: 1fr 1fr !important;
            gap: 12px !important;
          }
        }
        @media (max-width: 767px) {
          .categories-grid {
            grid-template-columns: 1fr !important;
          }
          .cat-height {
            height: 180px !important;
          }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .categories-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .cat-height {
            height: 200px !important;
          }
        }
        @media (min-width: 1024px) {
          .categories-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
          .cat-height {
            height: 280px !important;
          }
        }
        @media (max-width: 767px) {
          .instagram-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 6px !important;
          }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .instagram-grid {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 8px !important;
          }
        }
        @media (min-width: 1024px) {
          .instagram-grid {
            grid-template-columns: repeat(4, 1fr) !important;
            gap: 8px !important;
          }
        }
        @media (max-width: 640px) {
          .newsletter-input {
            flex-direction: column !important;
            gap: 12px !important;
          }
          .newsletter-input input,
          .newsletter-input button {
            width: 100% !important;
          }
        }
      `}</style>

      {/* ── Hero ── */}
      <div style={{ background: `linear-gradient(135deg,${G.pinkL} 0%,${G.goldL} 50%,${G.nude} 100%)`, minHeight: 580, display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at ${isRTL ? '30%' : '70%'} 50%,${G.pink}40 0%,transparent 60%)` }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(40px,6vw,60px) 20px', position: 'relative', zIndex: 1, width: '100%' }}>
          <div className="hero-grid">
            <div className="hero-text" style={{ textAlign: 'left' }}>
              <span style={{ display: 'inline-block', background: G.goldL, color: G.textM, fontSize: 12, fontWeight: 500, letterSpacing: '0.12em', padding: '6px 16px', borderRadius: 20, border: `1px solid ${G.gold}`, marginBottom: 20 }}>{tr.hero.badge}</span>
              <h1 style={{ fontFamily: SERIF, fontSize: 'clamp(32px,6vw,80px)', fontWeight: 600, color: G.text, lineHeight: 1.05, margin: '0 0 16px' }}>
                {tr.hero.t1}<br /><span style={{ color: G.gold }}>{tr.hero.t2}</span>
              </h1>
              <p style={{ color: G.textM, fontSize: 'clamp(14px,2.5vw,16px)', lineHeight: 1.7, marginBottom: 28, maxWidth: 440 }}>{tr.hero.sub}</p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', textAlign: 'center' }} className="hero-buttons">
                <Btn onClick={() => nav('shop')}>{tr.hero.cta} →</Btn>
                <Btn outline onClick={() => nav('shop')}>{tr.hero.cta2}</Btn>
              </div>
            </div>
            <div className="hero-images" style={{ display: 'grid' }}>
              {PRODUCTS.slice(0, 4).map((p, i) => (
                <div key={p.id} onClick={() => nav('product', p)} style={{ borderRadius: 8, overflow: 'hidden', cursor: 'pointer', height: i === 0 ? 240 : 180, background: G.pinkL, border: `1px solid ${G.bdr}`, transition: 'transform .2s' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                  <img src={p.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Stats bar ── */}
      <div style={{ background: G.text, color: G.goldL, padding: '14px 20px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'center', gap: 'clamp(20px,4vw,60px)', flexWrap: 'wrap' }}>
          {(isRTL
            ? ['✦ توصيل مجاني فوق ٥٠٠ ج.م', '✦ جودة مضمونة ١٠٠٪', '✦ دفع آمن ومضمون']
            : ['✦ Free delivery over 500 EGP', '✦ 100% quality guaranteed', '✦ Secure payment']
          ).map(t => <span key={t} style={{ fontSize: 12, letterSpacing: '0.05em', fontWeight: 500 }}>{t}</span>)}
        </div>
      </div>

      {/* ── Categories ── */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(40px,6vw,60px) 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(28px,5vw,36px)', fontWeight: 600, color: G.text, margin: '0 0 8px' }}>{tr.cats.title}</h2>
          <div style={{ width: 48, height: 2, background: G.gold, margin: '0 auto' }} />
        </div>
        <div className="categories-grid" style={{ display: 'grid', gap: 20 }}>
          {CATEGORIES.map(c => (
            <div key={c.k} onClick={() => nav('shop')} className="cat-height" style={{ position: 'relative', borderRadius: 10, overflow: 'hidden', cursor: 'pointer', border: `1px solid ${G.bdr}` }}
              onMouseEnter={e => { e.currentTarget.querySelector('img').style.transform = 'scale(1.06)'; e.currentTarget.querySelector('.cat-ov').style.background = 'rgba(44,24,16,0.45)'; }}
              onMouseLeave={e => { e.currentTarget.querySelector('img').style.transform = 'scale(1)'; e.currentTarget.querySelector('.cat-ov').style.background = 'rgba(44,24,16,0.28)'; }}
            >
              <img src={c.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .4s' }} />
              <div className="cat-ov" style={{ position: 'absolute', inset: 0, background: 'rgba(44,24,16,0.28)', transition: 'background .3s', display: 'flex', alignItems: 'flex-end', padding: 20 }}>
                <div>
                  <p style={{ color: G.white, fontFamily: SERIF, fontSize: 'clamp(20px,4vw,26px)', fontWeight: 600, margin: '0 0 4px' }}>{tr.cats[c.k]}</p>
                  <span style={{ color: G.goldL, fontSize: 12, letterSpacing: '0.08em' }}>{isRTL ? 'تسوقي الآن →' : 'Shop Now →'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Featured Products ── */}
      <div style={{ background: G.pinkL, padding: 'clamp(40px,6vw,60px) 20px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 36, flexWrap: 'wrap', gap: 12 }}>
            <div>
              <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(28px,5vw,36px)', fontWeight: 600, color: G.text, margin: '0 0 4px' }}>{tr.feat.title}</h2>
              <p style={{ color: G.textL, fontSize: 13, margin: 0 }}>{tr.feat.sub}</p>
            </div>
            <Btn small outline onClick={() => nav('shop')}>{tr.feat.all} →</Btn>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 20 }}>
            {PRODUCTS.slice(0, 8).map(p => (
              <ProductCard key={p.id} p={p} lang={lang} tr={tr} onNav={nav} onCart={addCart} onWish={toggleWish} inWish={inWish(p.id)} onQV={setQv} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Reviews ── */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(40px,6vw,60px) 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(28px,5vw,36px)', fontWeight: 600, color: G.text, margin: '0 0 8px' }}>{tr.rev.title}</h2>
          <p style={{ color: G.textL, fontSize: 14, margin: '0 0 12px' }}>{tr.rev.sub}</p>
          <div style={{ width: 48, height: 2, background: G.gold, margin: '0 auto' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 20 }}>
          {REVIEWS_DATA.map((r, i) => (
            <div key={i} style={{ background: G.white, borderRadius: 10, padding: 24, border: `1px solid ${G.bdr}` }}>
              <div style={{ display: 'flex', gap: 2, marginBottom: 12 }}><Stars n={r.stars} /></div>
              <p style={{ color: G.textM, fontSize: 14, lineHeight: 1.7, marginBottom: 16, fontStyle: 'italic' }}>
                "{lang === 'ar' ? r.textAr : r.textEn}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: G.pink, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: SERIF, fontWeight: 600, color: G.textM, fontSize: 14 }}>
                  {(lang === 'ar' ? r.nameAr : r.nameEn)[0]}
                </div>
                <div>
                  <p style={{ color: G.text, fontWeight: 500, fontSize: 14, margin: 0 }}>{lang === 'ar' ? r.nameAr : r.nameEn}</p>
                  <p style={{ color: G.textL, fontSize: 12, margin: 0 }}>{lang === 'ar' ? r.cityAr : r.cityEn}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Instagram Gallery ── */}
      <div style={{ padding: '0 20px clamp(40px,6vw,60px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <p style={{ color: G.textL, fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 8 }}>{isRTL ? 'تابعينا على انستغرام' : 'Follow us on Instagram'}</p>
            <h3 style={{ fontFamily: SERIF, fontSize: 'clamp(24px,4vw,28px)', color: G.text, margin: 0 }}>@butterfly.gallery</h3>
          </div>
          <div className="instagram-grid" style={{ display: 'grid' }}>
            {PRODUCTS.slice(4, 12).map(p => (
              <div key={p.id} style={{ borderRadius: 6, overflow: 'hidden', aspectRatio: '1', cursor: 'pointer', position: 'relative' }}
                onMouseEnter={e => e.currentTarget.querySelector('.ig-ov').style.opacity = 1}
                onMouseLeave={e => e.currentTarget.querySelector('.ig-ov').style.opacity = 0}>
                <img src={p.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div className="ig-ov" style={{ position: 'absolute', inset: 0, background: 'rgba(201,168,76,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity .3s' }}>
                  <InstagramIcon size={24} color={G.white} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Newsletter ── */}
      <div style={{ background: `linear-gradient(135deg,${G.text} 0%,#4A2C1A 100%)`, padding: 'clamp(40px,6vw,60px) 20px', textAlign: 'center' }}>
        <div style={{ maxWidth: 500, margin: '0 auto' }}>
          <Logo size={32} />
          <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(28px,5vw,32px)', fontWeight: 600, color: G.goldL, margin: '16px 0 8px' }}>{tr.news.title}</h2>
          <p style={{ color: 'rgba(253,248,245,0.7)', fontSize: 14, marginBottom: 24 }}>{tr.news.sub}</p>
          <div className="newsletter-input" style={{ display: 'flex', gap: 8, maxWidth: 400, margin: '0 auto', direction: isRTL ? 'rtl' : 'ltr' }}>
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder={tr.news.ph}
              style={{ flex: 1, padding: '12px 16px', border: `1px solid rgba(201,168,76,0.4)`, borderRadius: 6, background: 'rgba(255,255,255,0.08)', color: G.white, fontSize: 13, fontFamily: FONT, outline: 'none' }} />
            <button onClick={() => { if (email) { showToast(tr.subOk); setEmail(''); } }}
              style={{ background: G.gold, border: 'none', borderRadius: 6, padding: '12px 20px', color: G.white, fontSize: 13, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}>
              {tr.news.btn}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}