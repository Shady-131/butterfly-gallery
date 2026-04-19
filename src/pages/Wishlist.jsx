import { Heart } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import Btn         from '../components/ui/Btn';
import { G, FONT, SERIF } from '../constants/data';

// Props: lang, tr, isRTL, wish, nav, addCart, toggleWish, setQv
export default function Wishlist({ lang, tr, isRTL, wish, nav, addCart, toggleWish, setQv }) {
  if (wish.length === 0) return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 20px', fontFamily: FONT, direction: isRTL ? 'rtl' : 'ltr' }}>
      <h1 style={{ fontFamily: SERIF, fontSize: 36, color: G.text, marginBottom: 6 }}>{tr.wish.title}</h1>
      <div style={{ height: 2, width: 40, background: G.gold, marginBottom: 28 }} />
      <div style={{ textAlign: 'center', padding: '80px 20px' }}>
        <Heart size={60} style={{ color: G.pink, marginBottom: 16 }} />
        <p style={{ fontFamily: SERIF, fontSize: 24, color: G.text, marginBottom: 8 }}>{tr.wish.empty}</p>
        <p style={{ color: G.textL, fontSize: 14, marginBottom: 24 }}>{tr.wish.emptySub}</p>
        <Btn onClick={() => nav('shop')}>{tr.wish.shop}</Btn>
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 20px', fontFamily: FONT, direction: isRTL ? 'rtl' : 'ltr' }}>
      <h1 style={{ fontFamily: SERIF, fontSize: 36, color: G.text, marginBottom: 6 }}>{tr.wish.title}</h1>
      <div style={{ height: 2, width: 40, background: G.gold, marginBottom: 28 }} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 20 }}>
        {wish.map(p => (
          <ProductCard key={p.id} p={p} lang={lang} tr={tr} onNav={nav} onCart={addCart} onWish={toggleWish} inWish={true} onQV={setQv} />
        ))}
      </div>
    </div>
  );
}