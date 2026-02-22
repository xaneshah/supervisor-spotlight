import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { DeptBadge } from '@/components/ui/DeptBadge';
import { StarDisplay } from '@/components/reviews/StarDisplay';
import { getTopRatedTeachers } from '@/services/teacherService';
import { Link } from 'react-router-dom';
import type { Teacher } from '@/types';
import { CardSkeleton } from '@/components/ui/SkeletonLoader';

const medals = ['🥇', '🥈', '🥉', '4', '5'];

export function TopRatedList() {
  const [top, setTop] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTopRatedTeachers().then(teachers => {
      setTop(teachers);
      setLoading(false);
    });
  }, []);

  return (
    <GlassCard className="p-5 h-full" hover={false}>
      <h3 className="font-display text-sm font-semibold text-foreground mb-4">Top Rated</h3>
      <div className="space-y-3">
        {loading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 p-2">
              <div className="h-6 w-6 rounded bg-secondary/50 animate-pulse" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-24 rounded bg-secondary/50 animate-pulse" />
                <div className="h-3 w-16 rounded bg-secondary/50 animate-pulse" />
              </div>
            </div>
          ))
        ) : (
          top.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.1 }}
            >
              <Link
                to={`/teacher/${t.id}`}
                className="flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-secondary/50"
              >
                <span className="w-6 text-center text-sm">
                  {i < 3 ? medals[i] : <span className="text-xs text-muted-foreground font-medium">#{i + 1}</span>}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{t.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <StarDisplay rating={t.rating} size={10} />
                    <DeptBadge department={t.department} />
                  </div>
                </div>
                <span className="text-sm font-bold text-foreground">{t.rating.toFixed(1)}</span>
              </Link>
            </motion.div>
          ))
        )}
        {!loading && top.length === 0 && (
          <div className="text-center text-xs text-muted-foreground py-4">No ratings yet</div>
        )}
      </div>
    </GlassCard>
  );
}
