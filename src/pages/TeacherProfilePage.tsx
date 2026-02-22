import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { BackButton } from '@/components/ui/BackButton';
import { GlassCard } from '@/components/ui/GlassCard';
import { DeptBadge } from '@/components/ui/DeptBadge';
import { StarDisplay } from '@/components/reviews/StarDisplay';
import { ReviewList } from '@/components/reviews/ReviewList';
import { ReviewForm } from '@/components/reviews/ReviewForm';
import { RatingDistribution } from '@/components/reviews/RatingDistribution';
import { BookmarkButton } from '@/components/teachers/BookmarkButton';
import { CardSkeleton } from '@/components/ui/SkeletonLoader';
import { getTeacherById } from '@/services/teacherService';
import { getReviewsByTeacher } from '@/services/reviewService';
import type { Teacher, Review } from '@/types';
import { DEPARTMENT_COLORS } from '@/utils/constants';
import { cn } from '@/lib/utils';

function getInitials(name: string) {
  return name.split(' ').filter(Boolean).map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

export default function TeacherProfilePage() {
  const { id } = useParams<{ id: string }>();
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    const [t, r] = await Promise.all([getTeacherById(id), getReviewsByTeacher(id)]);
    setTeacher(t ?? null);
    setReviews(r);
    setLoading(false);
  }, [id]);

  useEffect(() => { loadData(); }, [loadData]);

  if (loading) {
    return (
      <div className="flex h-[50vh] w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!teacher) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <h2 className="text-xl font-bold text-foreground">Teacher not found</h2>
        <p className="text-muted-foreground text-center max-w-md">
          The supervisor you are looking for might have been removed or the link is incorrect.
        </p>
        <Link
          to="/explore"
          className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <ArrowLeft size={16} className="mr-2" />
          Return to Explore
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <BackButton />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        {/* Left column */}
        <div className="lg:col-span-3 space-y-6">
          <GlassCard
            className={cn('p-6 border-t-2', DEPARTMENT_COLORS[teacher.department].border)}
            hover={false}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-xl font-bold text-primary-foreground">
                  {getInitials(teacher.name)}
                </div>
                <div>
                  <h1 className="font-display text-xl font-bold text-foreground">{teacher.name}</h1>
                  <p className="text-sm text-muted-foreground">{teacher.role}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <DeptBadge department={teacher.department} />
                    <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">{teacher.subject}</span>
                  </div>
                </div>
              </div>
              <BookmarkButton teacherId={teacher.id} />
            </div>

            <div className="mt-6 flex items-center gap-6">
              <div className="text-center">
                <motion.p
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-3xl font-display font-bold text-foreground"
                >
                  {teacher.rating.toFixed(1)}
                </motion.p>
                <StarDisplay rating={teacher.rating} size={14} className="mt-1 justify-center" />
                <p className="text-xs text-muted-foreground mt-1">{reviews.length} review{reviews.length !== 1 ? 's' : ''}</p>
              </div>
              <div className="h-16 w-px bg-border" />
              {teacher.isAvailable ? (
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1.5 text-sm font-medium text-emerald-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse-dot" />
                  Available for FYP
                </span>
              ) : (
                <span className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1.5 text-sm font-medium text-muted-foreground">
                  <span className="h-2 w-2 rounded-full bg-muted-foreground" />
                  Not Available
                </span>
              )}
            </div>
          </GlassCard>

          <GlassCard className="p-6" hover={false}>
            <h2 className="font-display text-sm font-semibold text-foreground mb-4">Rating Distribution</h2>
            <RatingDistribution reviews={reviews} />
          </GlassCard>

          <GlassCard className="p-6" hover={false}>
            <h2 className="font-display text-sm font-semibold text-foreground mb-4">Write a Review</h2>
            <ReviewForm teacherId={teacher.id} onSubmitted={loadData} />
          </GlassCard>
        </div>

        {/* Right column */}
        <div className="lg:col-span-2">
          <div className="sticky top-20">
            <h2 className="font-display text-sm font-semibold text-foreground mb-4">Reviews ({reviews.length})</h2>
            <ReviewList reviews={reviews} />
          </div>
        </div>
      </div>
    </div>
  );
}
