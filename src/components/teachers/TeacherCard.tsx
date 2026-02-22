import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import type { Teacher } from '@/types';
import { DeptBadge } from '@/components/ui/DeptBadge';
import { StarDisplay } from '@/components/reviews/StarDisplay';
import { BookmarkButton } from './BookmarkButton';
import { DEPARTMENT_COLORS } from '@/utils/constants';
import { ArrowRight } from 'lucide-react';

interface TeacherCardProps {
  teacher: Teacher;
  index?: number;
}

function getInitials(name: string) {
  return name.split(' ').filter(Boolean).map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

export function TeacherCard({ teacher, index = 0 }: TeacherCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.08, duration: 0.3 }}
    >
      <Link to={`/teacher/${teacher.id}`} className="group block">
        <div className={cn(
          'glass-hover rounded-lg p-5 border-t-2 space-y-4 h-full',
          DEPARTMENT_COLORS[teacher.department].border
        )}>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-sm font-bold text-primary-foreground">
                {getInitials(teacher.name)}
              </div>
              <div>
                <h3 className="font-display text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                  {teacher.name}
                </h3>
                <p className="text-xs text-muted-foreground">{teacher.role}</p>
              </div>
            </div>
            <BookmarkButton teacherId={teacher.id} />
          </div>

          <div className="flex flex-wrap gap-2">
            <DeptBadge department={teacher.department} />
            <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
              {teacher.subject}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <StarDisplay rating={teacher.rating} size={14} showValue />
            <div className="flex items-center gap-2">
              {teacher.isAvailable ? (
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse-dot" />
                  Available
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                  <span className="h-2 w-2 rounded-full bg-muted-foreground" />
                  Unavailable
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground group-hover:text-primary transition-colors">
            View Profile <ArrowRight size={12} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
