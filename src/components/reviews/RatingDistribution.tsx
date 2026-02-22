import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';
import type { Review } from '@/types';

interface RatingDistributionProps {
  reviews: Review[];
}

export function RatingDistribution({ reviews }: RatingDistributionProps) {
  const data = useMemo(() => {
    const counts = [0, 0, 0, 0, 0];
    reviews.forEach(r => { if (r.rating >= 1 && r.rating <= 5) counts[r.rating - 1]++; });
    return [5, 4, 3, 2, 1].map(star => ({
      star: `${star}★`,
      count: counts[star - 1],
      pct: reviews.length ? (counts[star - 1] / reviews.length) * 100 : 0,
    }));
  }, [reviews]);

  const maxCount = Math.max(...data.map(d => d.count), 1);

  return (
    <div className="space-y-2">
      {data.map(d => (
        <div key={d.star} className="flex items-center gap-3 text-sm">
          <span className="w-8 text-right text-muted-foreground font-medium">{d.star}</span>
          <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
              style={{ width: `${(d.count / maxCount) * 100}%` }}
            />
          </div>
          <span className="w-6 text-right text-xs text-muted-foreground">{d.count}</span>
        </div>
      ))}
    </div>
  );
}
