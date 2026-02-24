import { cn } from '@/lib/utils';
import type { Department } from '@/types';
import { DEPARTMENT_COLORS, DEPARTMENT_SHORT } from '@/utils/constants';

interface DeptBadgeProps {
  department: Department;
  className?: string;
}

export function DeptBadge({ department, className }: DeptBadgeProps) {
  return (
    <span className={cn(
      'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold',
      DEPARTMENT_COLORS[department]?.bg || 'bg-muted',
      className
    )}>
      {DEPARTMENT_SHORT[department] || department?.toUpperCase() || 'General'}
    </span>
  );
}
