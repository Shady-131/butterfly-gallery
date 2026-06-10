import CustomSelect from './CustomSelect';
import { G, FONT } from '../../constants/data';

// Storefront-themed dropdown (brand pink/gold palette). Same API as CustomSelect.
const PUBLIC_THEME = {
  font: FONT,
  text: G.text,
  muted: G.textL,
  border: G.bdr,
  borderActive: G.gold,
  ring: 'rgba(201,168,76,0.15)',
  surface: G.white,
  optionActiveBg: G.pinkL,
  optionHoverBg: G.bg,
  accent: G.gold,
  radius: 6,
};

export default function PublicSelect(props) {
  return <CustomSelect {...props} theme={PUBLIC_THEME} />;
}
