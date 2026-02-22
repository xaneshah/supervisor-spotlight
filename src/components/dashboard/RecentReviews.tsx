import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { StarDisplay } from '@/components/reviews/StarDisplay';
import { formatDistanceToNow } from '@/utils/formatDate';

import { getAllReviews } from '@/services/reviewService';
import { getTeacherById } from '@/services/teacherService';
import { Link } from 'react-router-dom';
import type { Review } from '@/types';
import { CardSkeleton } from '@/components/ui/SkeletonLoader';

export function RecentReviews() {
  const [recent, setRecent] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllReviews().then(async (reviews) => {
      const limitedReviews = reviews.slice(0, 5);

      // Fetch teacher details for each review
      const reviewsWithNames = await Promise.all(
        limitedReviews.map(async (review) => {
          try {
            const teacher = await getTeacherById(review.teacherId);
            return {
              ...review,
              teacherName: teacher?.name ?? 'Unknown Teacher'
            };
          } catch (e) {
            return {
              ...review,
              teacherName: 'Unknown Teacher'
            };
          }
        })
      );

      setRecent(reviewsWithNames);
      setLoading(false);
    });
  }, []);

  return (
    <GlassCard className="p-5 h-full" hover={false}>
      <h3 className="font-display text-sm font-semibold text-foreground mb-4">Recent Reviews</h3>

      {loading ? (
        <div className="space-y-3">
          <CardSkeleton />
          <CardSkeleton />
        </div>
      ) : (
        <div className="space-y-3">
          {recent.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.1 }}
            >
              <Link
                to={`/teacher/${r.teacherId}`}
                className="block rounded-lg border border-border p-3 transition-colors hover:bg-secondary/30"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-primary">{(r as any).teacherName}</span>
                  <span className="text-[10px] text-muted-foreground">{formatDistanceToNow(r.timestamp)}</span>
                </div>
                <StarDisplay rating={r.rating} size={10} className="mb-1" />
                <p className="text-xs text-muted-foreground line-clamp-2">{r.comment}</p>
              </Link>
            </motion.div>
          ))}
          {recent.length === 0 && (
            <div className="text-center text-xs text-muted-foreground py-4">No reviews yet</div>
          )}
        </div>
      )}
    </GlassCard>
  );
}
