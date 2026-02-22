import { TeacherCard } from './TeacherCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { CardSkeleton } from '@/components/ui/SkeletonLoader';
import type { Teacher } from '@/types';

interface TeacherGridProps {
  teachers: Teacher[];
  loading?: boolean;
}

export function TeacherGrid({ teachers, loading }: TeacherGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}
      </div>
    );
  }

  if (teachers.length === 0) {
    return <EmptyState title="No supervisors found" description="Try adjusting your filters or search query." />;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {teachers.map((t, i) => (
        <TeacherCard key={t.id} teacher={t} index={i} />
      ))}
    </div>
  );
}
