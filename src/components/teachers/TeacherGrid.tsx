import { TeacherCard } from './TeacherCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { CardSkeleton } from '@/components/ui/SkeletonLoader';
import type { Teacher, Department } from '@/types';
import { useFilterStore } from '@/stores/useFilterStore';
import { DeptBadge } from '@/components/ui/DeptBadge';
import { StarDisplay } from '@/components/reviews/StarDisplay';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DEPARTMENT_COLORS } from '@/utils/constants';

interface TeacherGridProps {
  teachers: Teacher[];
  loading?: boolean;
}

function getInitials(name: string) {
  if (!name || typeof name !== 'string') return 'U';
  const parts = name.split(' ').filter(Boolean);
  if (parts.length === 0) return 'U';
  return parts.map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

export function TeacherGrid({ teachers, loading }: TeacherGridProps) {
  const { viewMode } = useFilterStore();

  if (loading) {
    return (
      <div className={cn(
        "grid gap-4",
        viewMode === 'grid' ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
      )}>
        {Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}
      </div>
    );
  }

  if (teachers.length === 0) {
    return <EmptyState title="No supervisors found" description="Try adjusting your filters or search query." />;
  }

  if (viewMode === 'list') {
    return (
      <div className="flex flex-col gap-3">
        {teachers.map((t) => (
          <Link
            key={t.id}
            to={`/teacher/${t.id}`}
            className={cn(
              "flex items-center justify-between p-4 rounded-xl border-l-4 bg-card/50 backdrop-blur-sm border border-border hover:border-primary/30 transition-all group",
              DEPARTMENT_COLORS[t.department?.toLowerCase() as Department]?.border || 'border-border'
            )}
          >
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-xs font-bold text-primary-foreground">
                {getInitials(t.name || 'Unknown')}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{t.name || 'Unknown Teacher'}</h3>
                <p className="text-xs text-muted-foreground">{t.subject || 'General'}</p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="hidden sm:block">
                {t.department && <DeptBadge department={t.department.toLowerCase() as Department} />}
              </div>
              <div className="flex flex-col items-end gap-1">
                <StarDisplay rating={t.rating || 0} size={12} showValue />
                <span className={cn(
                  "text-[10px] font-medium",
                  (t.isAvailable ?? t.availableForFyp ?? true) ? "text-emerald-400" : "text-muted-foreground"
                )}>
                  {(t.isAvailable ?? t.availableForFyp ?? true) ? "Available" : "Busy"}
                </span>
              </div>
              <ArrowRight size={16} className="text-muted-foreground group-hover:text-primary transition-all translate-x-0 group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {teachers.map((t, i) => (
        <TeacherCard key={t.id} teacher={t} index={i} />
      ))}
    </div>
  );
}
