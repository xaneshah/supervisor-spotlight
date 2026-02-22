import { useState, useMemo } from 'react';
import { ReviewCard } from './ReviewCard';
import type { Review, ReviewSort } from '@/types';
import { cn } from '@/lib/utils';

interface ReviewListProps {
  reviews: Review[];
}

export function ReviewList({ reviews }: ReviewListProps) {
  const [sort, setSort] = useState<ReviewSort>('newest');
  const [visibleCount, setVisibleCount] = useState(5);

  const sorted = useMemo(() => {
    const s = [...reviews];
    switch (sort) {
      case 'newest': return s.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
      case 'highest': return s.sort((a, b) => b.rating - a.rating);
      case 'lowest': return s.sort((a, b) => a.rating - b.rating);
    }
  }, [reviews, sort]);

  const visible = sorted.slice(0, visibleCount);
  const tabs: { key: ReviewSort; label: string }[] = [
    { key: 'newest', label: 'Newest' },
    { key: 'highest', label: 'Highest' },
    { key: 'lowest', label: 'Lowest' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex gap-1 rounded-lg bg-secondary p-1">
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setSort(t.key)}
            className={cn(
              'flex-1 rounded-md px-3 py-1.5 text-xs font-medium transition-all',
              sort === t.key
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {visible.map((r, i) => (
          <ReviewCard key={r.id} review={r} index={i} />
        ))}
      </div>

      {visibleCount < sorted.length && (
        <button
          onClick={() => setVisibleCount(v => v + 5)}
          className="w-full rounded-lg border border-border py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          Load More ({sorted.length - visibleCount} remaining)
        </button>
      )}
    </div>
  );
}
