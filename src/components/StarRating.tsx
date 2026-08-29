import { Star } from 'lucide-react';

interface Props {
  rating: number;
  size?: number;
  showValue?: boolean;
  reviewCount?: number;
}

export function StarRating({ rating, size = 14, showValue = false, reviewCount }: Props) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map(i => (
          <Star
            key={i}
            size={size}
            className={i <= Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'fill-ink-200 text-ink-200'}
          />
        ))}
      </div>
      {showValue && (
        <span className="text-xs font-semibold text-ink-600">{rating.toFixed(1)}</span>
      )}
      {reviewCount !== undefined && (
        <span className="text-xs text-ink-400">({reviewCount})</span>
      )}
    </div>
  );
}
