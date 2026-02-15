import { Bookmark } from 'lucide-react';
import { useBookmarkStore } from '@/stores/useBookmarkStore';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface BookmarkButtonProps {
  teacherId: string;
  className?: string;
}

export function BookmarkButton({ teacherId, className }: BookmarkButtonProps) {
  const { toggle, isBookmarked } = useBookmarkStore();
  const active = isBookmarked(teacherId);

  return (
    <motion.button
      whileTap={{ scale: 0.85 }}
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggle(teacherId); }}
      className={cn(
        'rounded-full p-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        active ? 'text-primary' : 'text-muted-foreground hover:text-foreground',
        className
      )}
      aria-label={active ? 'Remove bookmark' : 'Add bookmark'}
    >
      <Bookmark size={18} className={cn(active && 'fill-primary')} />
    </motion.button>
  );
}
