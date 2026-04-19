import { Star } from 'lucide-react';
import { G } from '../../constants/data';

export default function Stars({ n }) {
  return (
    <>
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={12}
          fill={i < Math.floor(n) ? G.gold : 'none'}
          stroke={G.gold}
          strokeWidth={1.5}
        />
      ))}
    </>
  );
}