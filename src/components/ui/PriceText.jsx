import { FONT, CURRENCY } from '../../constants/data';

/**
 * Consistent price rendering across the whole app.
 * Always: "1,850 جنيه" (ar) / "1,850 EGP" (en) — Western digits, thousands
 * separators, clean sans font (never the decorative serif), tabular numerals,
 * and dir="ltr" so the number always reads before the currency in RTL too.
 *
 * Props: amount, lang, size, color, weight, old (struck-through), style.
 */
export default function PriceText({ amount, lang = 'ar', size, color, weight = 600, old = false, style = {} }) {
  const num = Number(amount || 0).toLocaleString('en-US');
  const cur = lang === 'ar' ? CURRENCY.ar : CURRENCY.en;

  return (
    <span
      dir="ltr"
      className={old ? 'old-price' : 'price-text'}
      style={{
        fontFamily: FONT,
        fontVariantNumeric: 'tabular-nums',
        letterSpacing: 0,
        whiteSpace: 'nowrap',
        fontWeight: old ? 400 : weight,
        textDecoration: old ? 'line-through' : undefined,
        ...(size ? { fontSize: size } : {}),
        ...(color ? { color } : {}),
        ...style,
      }}
    >
      {num}
      <span className="currency-text" style={{ fontSize: '0.78em', fontWeight: old ? 400 : 500, marginInlineStart: '0.3em', opacity: 0.82 }}>{cur}</span>
    </span>
  );
}
