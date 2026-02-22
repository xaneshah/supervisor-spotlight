import { motion } from 'framer-motion';
import { User, EyeOff } from 'lucide-react';
import { StarDisplay } from './StarDisplay';
import { formatDistanceToNow } from '@/utils/formatDate';
import type { Review } from '@/types';

interface ReviewCardProps {
  review: Review;
  index?: number;
}

export function ReviewCard({ review, index = 0 }: ReviewCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.3 }}
      className="rounded-lg border border-border bg-card p-4 space-y-3"
    >
      <div className="flex items-center justify-between">
        <StarDisplay rating={review.rating} size={14} />
        <span className="text-xs text-muted-foreground">
          {formatDistanceToNow(review.timestamp)}
        </span>
      </div>
      <p className="text-sm leading-relaxed text-foreground/90">{review.comment}</p>
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        {review.isAnonymous ? (
          <>
            <EyeOff size={12} />
            <span>Anonymous Student</span>
          </>
        ) : (
          <>
            <User size={12} />
            <span>Student</span>
          </>
        )}
      </div>
    </motion.div>
  );
}
