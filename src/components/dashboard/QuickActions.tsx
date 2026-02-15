import { motion } from 'framer-motion';
import { Compass, PenLine } from 'lucide-react';
import { Link } from 'react-router-dom';

export function QuickActions() {
  const actions = [
    { label: 'Find a Supervisor', description: 'Browse and filter all available supervisors', icon: Compass, to: '/explore' },
    { label: 'Write a Review', description: 'Share your experience with a supervisor', icon: PenLine, to: '/explore' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {actions.map((a, i) => (
        <motion.div
          key={a.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 + i * 0.1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link
            to={a.to}
            className="block gradient-border rounded-lg p-5 hover:shadow-[var(--shadow-glow)] transition-shadow"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
                <a.icon size={20} className="text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-display text-sm font-semibold text-foreground">{a.label}</h3>
                <p className="text-xs text-muted-foreground">{a.description}</p>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
