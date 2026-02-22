import { Link, useLocation, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const { department, setDepartment } = useFilterStore();

  const handleDeptClick = (dept: Department) => {
    setDepartment(dept);
    navigate('/explore');
  };

  return (
    <aside className={cn(
      'hidden md:flex flex-col border-r border-white/10 bg-black/40 backdrop-blur-xl transition-all duration-300 h-screen sticky top-0 shadow-xl',
      collapsed ? 'w-[72px]' : 'w-[280px]'
    )}>
      {/* Logo */}
      <div className="flex items-center gap-3 border-b border-white/5 px-4 py-5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/25">
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
                'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200',
                active
                  ? 'bg-primary/20 text-primary shadow-inner shadow-primary/10'
                  : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'
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
        <div className="border-t border-white/5 px-4 py-6 space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70">Departments</span>
          <div className="flex flex-wrap gap-2">
            {departments.map(d => (
              <button
                key={d}
                onClick={() => handleDeptClick(d)}
                className={cn(
                  'rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-200 border border-transparent',
                  department === d && location.pathname === '/explore'
                    ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
                    : 'bg-white/5 text-muted-foreground hover:bg-white/10 hover:border-white/10'
                )}
              >
                {DEPARTMENT_SHORT[d]}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="border-t border-white/5 px-3 py-4">
        <div className="flex items-center justify-between">
          <ThemeToggle />
          <button
            onClick={onToggle}
            className="rounded-lg p-2 text-muted-foreground hover:bg-white/5 hover:text-foreground transition-colors"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>
      </div>
    </aside>
  );
}

