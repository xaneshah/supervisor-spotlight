import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { subscribeToReviews } from '@/services/reviewService';
import { getAllTeachers } from '@/services/teacherService';
import { StarDisplay } from '@/components/reviews/StarDisplay';
import { formatDistanceToNow } from '@/utils/formatDate';
import { DeptBadge } from '@/components/ui/DeptBadge';
import { CardSkeleton } from '@/components/ui/SkeletonLoader';
import { useFilterStore } from '@/stores/useFilterStore';
import { cn } from '@/lib/utils';
import { DEPARTMENT_SHORT } from '@/utils/constants';
import type { Review, Department, Teacher } from '@/types';

const departments: (Department | 'all')[] = ['all', 'ai', 'cs', 'ee'];

export default function LiveFeed() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(10);
  const [deptFilter, setDeptFilter] = useState<Department | 'all'>('all');

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    getAllTeachers().then(t => {
      setTeachers(t);

      // Setup real-time listener for reviews
      unsubscribe = subscribeToReviews((r) => {
        setReviews(r);
        setLoading(false);
      }, 50); // Fetch up to 50 recent reviews for the feed
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const getTeacher = (id: string) => teachers.find(t => t.id === id);

  const filtered = useMemo(() => {
    if (deptFilter === 'all') return reviews;
    return reviews.filter(r => getTeacher(r.teacherId)?.department === deptFilter);
  }, [reviews, teachers, deptFilter]);

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => <CardSkeleton key={i} />)}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Live Feed</h1>
        <p className="text-sm text-muted-foreground">Latest reviews across all supervisors</p>
      </div>

      <div className="flex gap-2">
        {departments.map(d => (
          <button
            key={d}
            onClick={() => setDeptFilter(d)}
            className={cn(
              'rounded-full px-3 py-1.5 text-xs font-medium transition-all',
              deptFilter === d
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            )}
          >
            {d === 'all' ? 'All' : DEPARTMENT_SHORT[d]}
          </button>
        ))}
      </div>

      <div className="space-y-3 max-w-2xl">
        {filtered.slice(0, visibleCount).map((r, i) => {
          const teacher = getTeacher(r.teacherId);
          return (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={cn(
                'rounded-lg border border-border bg-card p-4 transition-colors hover:bg-secondary/20',
                i === 0 && 'ring-1 ring-primary/20'
              )}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {teacher && (
                    <Link to={`/teacher/${teacher.id}`} className="text-sm font-medium text-primary hover:underline">
                      {teacher.name}
                    </Link>
                  )}
                  {teacher && <DeptBadge department={teacher.department} />}
                </div>
                <span className="text-xs text-muted-foreground">{formatDistanceToNow(r.timestamp)}</span>
              </div>
              <StarDisplay rating={r.rating} size={12} className="mb-2" />
              <p className="text-sm text-foreground/80">{r.comment}</p>
            </motion.div>
          );
        })}
      </div>

      {visibleCount < filtered.length && (
        <button
          onClick={() => setVisibleCount(v => v + 10)}
          className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
        >
          Load More
        </button>
      )}
    </div>
  );
}
