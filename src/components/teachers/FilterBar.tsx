import { cn } from '@/lib/utils';
import { useFilterStore } from '@/stores/useFilterStore';
import { LayoutGrid, List } from 'lucide-react';
import type { Department } from '@/types';
import { DEPARTMENT_SHORT } from '@/utils/constants';
import { getAllTeachers } from '@/services/teacherService';
import { useMemo, useState, useEffect } from 'react';
import type { Teacher } from '@/types';

const departments: (Department | 'all')[] = ['all', 'ai', 'cs', 'ee', 'se', 'cysec', 'it', 'ds', 'me', 'ce', 'cen', 'ie'];

export function FilterBar() {
  const { department, setDepartment, sort, setSort, viewMode, setViewMode } = useFilterStore();
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  useEffect(() => {
    getAllTeachers().then(setTeachers);
  }, []);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: teachers.length };
    // Initialize all departments with 0
    departments.forEach(d => { if (d !== 'all') c[d] = 0; });

    teachers.forEach(t => {
      if (t.department) {
        const deptKey = t.department.toLowerCase();
        c[deptKey] = (c[deptKey] || 0) + 1;
      }
    });
    return c;
  }, [teachers]);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex flex-wrap gap-2">
        {departments.map(d => (
          <button
            key={d}
            onClick={() => setDepartment(d)}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all',
              department === d
                ? 'bg-primary text-primary-foreground shadow-md shadow-primary/25'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            )}
          >
            {d === 'all' ? 'All' : (DEPARTMENT_SHORT[d as Department] || String(d).toUpperCase() || 'Other')}
            <span className={cn(
              'rounded-full px-1.5 py-0.5 text-[10px]',
              department === d ? 'bg-primary-foreground/20' : 'bg-background'
            )}>
              {counts[d] || 0}
            </span>
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <select
          value={sort}
          onChange={e => setSort(e.target.value as any)}
          className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          aria-label="Sort by"
        >
          <option value="highest">Highest Rated</option>
          <option value="most-reviewed">Most Reviewed</option>
          <option value="name-az">Name A-Z</option>
          <option value="available">Available First</option>
        </select>

        <div className="flex rounded-lg border border-border bg-secondary p-0.5">
          <button
            onClick={() => setViewMode('grid')}
            className={cn('rounded-md p-1.5 transition-colors', viewMode === 'grid' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground')}
            aria-label="Grid view"
          >
            <LayoutGrid size={14} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={cn('rounded-md p-1.5 transition-colors', viewMode === 'list' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground')}
            aria-label="List view"
          >
            <List size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
