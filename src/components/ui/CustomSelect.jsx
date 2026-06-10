import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

/**
 * Reusable branded dropdown that replaces the native <select> everywhere.
 * Theme-driven so the same behavior powers both the public storefront
 * (PublicSelect) and the admin dashboard (AdminSelect).
 *
 * Props:
 *   value      current value
 *   onChange   (newValue) => void
 *   options    [{ value, label, color? }]
 *   placeholder text shown when nothing matches
 *   isRTL      right-align + flip text direction
 *   fullWidth  stretch to container width
 *   minWidth   trigger min width (px) when not fullWidth
 *   size       'sm' | 'md'
 *   ariaLabel  accessible label for the trigger
 *   theme      colour/typography tokens (see DEFAULT_THEME)
 */
const DEFAULT_THEME = {
  font: 'inherit',
  text: '#2C1810',
  muted: '#9B8878',
  border: '#F0E0D8',
  borderActive: '#C9A84C',
  ring: 'rgba(201,168,76,0.12)',
  surface: '#FFFFFF',
  optionActiveBg: '#FDF0F3',
  optionHoverBg: '#FDF8F5',
  accent: '#C9A84C',
  radius: 8,
};

export default function CustomSelect({
  value,
  onChange,
  options = [],
  placeholder = 'Select…',
  isRTL = false,
  fullWidth = false,
  minWidth = 150,
  size = 'md',
  ariaLabel,
  theme,
}) {
  const t = { ...DEFAULT_THEME, ...(theme || {}) };
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const selected = options.find(o => o.value === value);
  const pad = size === 'sm' ? '8px 12px' : '10px 14px';
  const fontSize = size === 'sm' ? 13 : 14;

  useEffect(() => {
    if (!open) return undefined;
    const onPointer = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const dot = (color) => color
    ? <span style={{ width: 8, height: 8, borderRadius: '50%', background: color, flexShrink: 0 }} />
    : null;

  return (
    <div ref={ref} style={{ position: 'relative', display: fullWidth ? 'block' : 'inline-block', width: fullWidth ? '100%' : 'auto' }}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 10,
          width: fullWidth ? '100%' : 'auto',
          minWidth: fullWidth ? undefined : minWidth,
          boxSizing: 'border-box',
          padding: pad,
          background: t.surface,
          border: `1px solid ${open ? t.borderActive : t.border}`,
          boxShadow: open ? `0 0 0 3px ${t.ring}` : 'none',
          borderRadius: t.radius,
          fontSize,
          fontFamily: t.font,
          color: selected ? t.text : t.muted,
          cursor: 'pointer',
          transition: 'border-color .15s, box-shadow .15s',
          direction: isRTL ? 'rtl' : 'ltr',
        }}
        onMouseEnter={(e) => { if (!open) e.currentTarget.style.borderColor = t.borderActive; }}
        onMouseLeave={(e) => { if (!open) e.currentTarget.style.borderColor = t.border; }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: 8, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {dot(selected?.color)}
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown size={16} style={{ flexShrink: 0, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .15s', color: t.muted }} />
      </button>

      {open && (
        <div
          role="listbox"
          style={{
            position: 'absolute',
            top: 'calc(100% + 6px)',
            left: 0,
            right: 0,
            minWidth: '100%',
            background: t.surface,
            border: `1px solid ${t.border}`,
            borderRadius: t.radius,
            boxShadow: '0 12px 32px rgba(44,24,16,0.16)',
            zIndex: 4000,
            overflowY: 'auto',
            maxHeight: 280,
            padding: 4,
            animation: 'csFade .14s ease',
          }}
        >
          <style>{`@keyframes csFade{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}}`}</style>
          {options.map(o => {
            const active = o.value === value;
            return (
              <button
                key={String(o.value)}
                type="button"
                role="option"
                aria-selected={active}
                onClick={() => { onChange(o.value); setOpen(false); }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 8,
                  width: '100%',
                  boxSizing: 'border-box',
                  textAlign: isRTL ? 'right' : 'left',
                  direction: isRTL ? 'rtl' : 'ltr',
                  background: active ? t.optionActiveBg : t.surface,
                  color: t.text,
                  border: 'none',
                  borderRadius: t.radius - 2,
                  padding: '10px 12px',
                  fontSize,
                  fontFamily: t.font,
                  fontWeight: active ? 600 : 400,
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = t.optionHoverBg; }}
                onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = t.surface; }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>{dot(o.color)}{o.label}</span>
                {active && <Check size={15} color={t.accent} style={{ flexShrink: 0 }} />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
