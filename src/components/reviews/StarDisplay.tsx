import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarDisplayProps {
  rating: number;
  size?: number;
  className?: string;
  showValue?: boolean;
}

export function StarDisplay({ rating, size = 16, className, showValue = false }: StarDisplayProps) {
  return (
    <div className={cn('flex items-center gap-1', className)}>
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < Math.floor(rating);
        const half = !filled && i < rating;
        return (
          <Star
            key={i}
            size={size}
            className={cn(
              'transition-colors',
              filled ? 'fill-amber-400 text-amber-400' : half ? 'fill-amber-400/50 text-amber-400' : 'text-muted-foreground/30'
            )}
          />
        );
      })}
      {showValue && (
        <span className="ml-1 text-sm font-medium text-foreground">{rating.toFixed(1)}</span>
      )}
    </div>
  );
}
