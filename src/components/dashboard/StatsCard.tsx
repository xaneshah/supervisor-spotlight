import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Users, Star, CheckCircle } from 'lucide-react';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { GlassCard } from '@/components/ui/GlassCard';
import { mockTeachers } from '@/utils/mockData';

export function StatsCard() {
  const stats = useMemo(() => {
    const total = mockTeachers.length;
    const avgRating = mockTeachers.reduce((s, t) => s + t.rating, 0) / total;
    const available = mockTeachers.filter(t => t.isAvailable).length;
    return { total, avgRating, available };
  }, []);

  const items = [
    { label: 'Total Supervisors', value: stats.total, icon: Users, decimals: 0 },
    { label: 'Average Rating', value: stats.avgRating, icon: Star, decimals: 1, suffix: ' ★' },
    { label: 'Available for FYP', value: stats.available, icon: CheckCircle, decimals: 0 },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {items.map((item, i) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <GlassCard className="p-5 text-center" hover={false}>
            <div className="mb-2 mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <item.icon size={20} className="text-primary" />
            </div>
            <AnimatedCounter
              target={item.value}
              decimals={item.decimals}
              suffix={item.suffix}
              className="text-2xl font-display font-bold text-foreground"
            />
            <p className="mt-1 text-xs text-muted-foreground">{item.label}</p>
          </GlassCard>
        </motion.div>
      ))}
    </div>
  );
}
