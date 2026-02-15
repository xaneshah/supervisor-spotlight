import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { GraduationCap, LayoutDashboard, Compass, Rss, Bookmark, ChevronLeft, ChevronRight } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { useFilterStore } from '@/stores/useFilterStore';
import type { Department } from '@/types';
import { DEPARTMENT_SHORT } from '@/utils/constants';
import { motion } from 'framer-motion';

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/explore', label: 'Explore', icon: Compass },
  { path: '/feed', label: 'Live Feed', icon: Rss },
  { path: '/bookmarks', label: 'Bookmarks', icon: Bookmark },
];

const departments: Department[] = ['ai', 'cs', 'ee'];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const location = useLocation();
  const { department, setDepartment } = useFilterStore();

  return (
    <aside className={cn(
      'hidden md:flex flex-col border-r border-border bg-card/50 backdrop-blur-xl transition-all duration-300 h-screen sticky top-0',
      collapsed ? 'w-[72px]' : 'w-[280px]'
    )}>
      {/* Logo */}
      <div className="flex items-center gap-3 border-b border-border px-4 py-5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
          <GraduationCap size={20} className="text-primary-foreground" />
        </div>
        {!collapsed && (
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-display text-lg font-bold gradient-text">
            SupervisorHub
          </motion.span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map(item => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all',
                active
                  ? 'bg-primary/10 text-primary border-l-2 border-primary'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              )}
            >
              <item.icon size={18} />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Department filters */}
      {!collapsed && (
        <div className="border-t border-border px-4 py-4 space-y-2">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Department</span>
          <div className="flex gap-1.5">
            {departments.map(d => (
              <button
                key={d}
                onClick={() => setDepartment(department === d ? 'all' : d)}
                className={cn(
                  'rounded-full px-3 py-1 text-xs font-semibold transition-all',
                  department === d
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                )}
              >
                {DEPARTMENT_SHORT[d]}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="border-t border-border px-3 py-3 flex items-center justify-between">
        <ThemeToggle />
        <button
          onClick={onToggle}
          className="rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>
    </aside>
  );
}
