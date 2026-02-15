import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { StarDisplay } from '@/components/reviews/StarDisplay';
import { formatDistanceToNow } from '@/utils/formatDate';
import { mockReviews, mockTeachers } from '@/utils/mockData';
import { Link } from 'react-router-dom';

export function RecentReviews() {
  const recent = useMemo(
    () => [...mockReviews].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()).slice(0, 3),
    []
  );

  const getTeacherName = (id: string) => mockTeachers.find(t => t.id === id)?.name ?? 'Unknown';

  return (
    <GlassCard className="p-5 h-full" hover={false}>
      <h3 className="font-display text-sm font-semibold text-foreground mb-4">Recent Reviews</h3>
      <div className="space-y-3">
        {recent.map((r, i) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
          >
            <Link
              to={`/teacher/${r.teacherId}`}
              className="block rounded-lg border border-border p-3 transition-colors hover:bg-secondary/30"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-primary">{getTeacherName(r.teacherId)}</span>
                <span className="text-[10px] text-muted-foreground">{formatDistanceToNow(r.timestamp)}</span>
              </div>
              <StarDisplay rating={r.rating} size={10} className="mb-1" />
              <p className="text-xs text-muted-foreground line-clamp-2">{r.comment}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </GlassCard>
  );
}
