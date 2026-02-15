import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface StarRatingProps {
  value: number;
  onChange: (v: number) => void;
  size?: number;
}

export function StarRating({ value, onChange, size = 28 }: StarRatingProps) {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex items-center gap-1" role="radiogroup" aria-label="Rating">
      {Array.from({ length: 5 }).map((_, i) => {
        const star = i + 1;
        const active = star <= (hover || value);
        return (
          <button
            key={i}
            type="button"
            aria-label={`${star} star${star > 1 ? 's' : ''}`}
            className={cn(
              'transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded',
              active ? 'scale-110' : 'hover:scale-105'
            )}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            onClick={() => onChange(star)}
          >
            <Star
              size={size}
              className={cn(
                'transition-colors duration-150',
                active ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground/40'
              )}
            />
          </button>
        );
      })}
    </div>
  );
}
