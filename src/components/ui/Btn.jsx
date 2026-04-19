import { G } from '../../constants/data';

export default function Btn({ children, onClick, style = {}, outline = false, small = false }) {
  return (
    <button
      onClick={onClick}
      style={{
        background:    outline ? 'transparent' : G.gold,
        color:         outline ? G.gold : G.white,
        border:        `1.5px solid ${G.gold}`,
        borderRadius:  4,
        cursor:        'pointer',
        padding:       small ? '8px 16px' : '12px 28px',
        fontSize:      small ? 13 : 14,
        fontWeight:    500,
        letterSpacing: '0.05em',
        transition:    'all .2s',
        ...style,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background   = outline ? G.goldL : G.nudeD;
        e.currentTarget.style.borderColor  = G.nudeD;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background   = outline ? 'transparent' : G.gold;
        e.currentTarget.style.borderColor  = G.gold;
      }}
    >
      {children}
    </button>
  );
}