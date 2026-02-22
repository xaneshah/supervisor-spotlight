import { GlassCard } from '@/components/ui/GlassCard';
import { getAllTeachers } from '@/services/teacherService';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import type { Teacher } from '@/types';

export function AvailabilityMap() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  useEffect(() => {
    getAllTeachers().then(setTeachers);
  }, []);

  return (
    <GlassCard className="p-5 h-full" hover={false}>
      <h3 className="font-display text-sm font-semibold text-foreground mb-4">Availability</h3>
      <div className="flex flex-wrap gap-2">
        {teachers.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 + i * 0.05 }}
            className="relative group"
            onMouseEnter={() => setHovered(t.id)}
            onMouseLeave={() => setHovered(null)}
          >
            <div className={cn(
              'h-7 w-7 rounded-full transition-all cursor-pointer',
              t.isAvailable
                ? 'bg-emerald-500/20 border-2 border-emerald-500 shadow-[0_0_8px_hsl(160_84%_40%/0.3)]'
                : 'bg-muted border-2 border-muted-foreground/20'
            )} />
            {hovered === t.id && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap rounded-md bg-card border border-border px-2 py-1 text-[10px] font-medium text-foreground shadow-lg z-10">
                {t.name}
                <div className="absolute top-full left-1/2 -translate-x-1/2 h-0 w-0 border-x-4 border-t-4 border-x-transparent border-t-border" />
              </div>
            )}
          </motion.div>
        ))}
      </div>
      <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded-full bg-emerald-500/20 border border-emerald-500" />
          Available
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded-full bg-muted border border-muted-foreground/20" />
          Unavailable
        </div>
      </div>
    </GlassCard>
  );
}
