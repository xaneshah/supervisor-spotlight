import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { GraduationCap, LayoutDashboard, Compass, Rss, Bookmark, Menu, ChevronLeft, ChevronRight } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { useFilterStore } from '@/stores/useFilterStore';
import type { Department } from '@/types';
import { DEPARTMENT_SHORT } from '@/utils/constants';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/explore', label: 'Explore', icon: Compass },
  { path: '/feed', label: 'Live Feed', icon: Rss },
  { path: '/bookmarks', label: 'Bookmarks', icon: Bookmark },
];

const departments: Department[] = ['ai', 'cs', 'ee', 'se', 'cysec', 'it', 'ds', 'me', 'ce', 'cen', 'ie'];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { department, setDepartment } = useFilterStore();

  const handleDeptClick = (dept: Department) => {
    setDepartment(dept);
    navigate('/explore');
  };

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 80 : 280 }}
      transition={{ type: 'spring', damping: 20, stiffness: 150 }}
      className={cn(
        'hidden md:flex flex-col border-r h-screen sticky top-0 z-50 transition-all duration-300',
        'bg-white/70 dark:bg-zinc-900/60 backdrop-blur-xl border-slate-200/50 dark:border-white/10 shadow-2xl'
      )}
    >
      {/* Top Header Section */}
      <div className="flex flex-col border-b border-slate-200/50 dark:border-white/5">
        <div className={cn(
          "flex items-center justify-between p-4 px-5",
          collapsed ? "flex-col gap-4" : "flex-row"
        )}>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/20">
              <GraduationCap size={22} className="text-primary-foreground" />
            </div>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="font-display text-lg font-bold tracking-tight bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent"
              >
                SupervisorHub
              </motion.span>
            )}
          </div>

          <button
            onClick={onToggle}
            className={cn(
              "group relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-300",
              "bg-slate-100/50 dark:bg-white/5 hover:bg-primary/10 text-muted-foreground hover:text-primary",
              collapsed && "mt-2"
            )}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-primary/20 transition-colors" />
            <Menu size={22} className={cn("transition-transform duration-500 ease-in-out", collapsed && "rotate-90")} />
          </button>
        </div>
      </div>

      {/* Navigation Scroll Area */}
      <div className="flex-1 overflow-y-auto scrollbar-none py-6 px-4 space-y-8">
        {/* Main Menu */}
        <div className="space-y-1.5">
          {!collapsed && (
            <p className="px-4 text-[11px] font-bold uppercase tracking-wider text-muted-foreground/50 mb-3">
              Main Menu
            </p>
          )}
          {navItems.map(item => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-300 relative',
                  active
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-slate-200/50 dark:hover:bg-white/5 hover:text-foreground'
                )}
              >
                <item.icon size={20} className={cn("transition-transform group-hover:scale-110", active && "text-primary")} />
                {!collapsed && (
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                    {item.label}
                  </motion.span>
                )}
                {active && !collapsed && (
                  <motion.div layoutId="active-pill" className="absolute left-0 w-1 h-6 bg-primary rounded-r-full" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Departments (Desktop only when expanded) */}
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <p className="px-4 text-[11px] font-bold uppercase tracking-wider text-muted-foreground/50">
              Department Quick-Filter
            </p>
            <div className="grid grid-cols-2 gap-2 px-1">
              {departments.map(d => (
                <button
                  key={d}
                  onClick={() => handleDeptClick(d)}
                  className={cn(
                    'rounded-xl px-3 py-2.5 text-[11px] font-bold transition-all duration-300 border',
                    department === d && location.pathname === '/explore'
                      ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20 scale-105'
                      : 'bg-slate-100/50 dark:bg-white/5 border-transparent text-muted-foreground hover:border-slate-300 dark:hover:border-white/10 hover:text-foreground'
                  )}
                >
                  {DEPARTMENT_SHORT[d]}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Footer / Theme Toggle */}
      <div className="mt-auto p-4 border-t border-slate-200/50 dark:border-white/5">
        <div className={cn(
          "flex items-center bg-slate-100/50 dark:bg-white/5 rounded-2xl p-2",
          collapsed ? "justify-center" : "justify-between px-3"
        )}>
          {!collapsed && (
            <span className="text-xs font-medium text-muted-foreground">Dark mode</span>
          )}
          <ThemeToggle />
        </div>
      </div>
    </motion.aside>
  );
}

