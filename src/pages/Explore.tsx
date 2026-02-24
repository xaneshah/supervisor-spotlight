import { useState, useEffect, useMemo } from 'react';
import { FilterBar } from '@/components/teachers/FilterBar';
import { TeacherGrid } from '@/components/teachers/TeacherGrid';
import { useFilterStore } from '@/stores/useFilterStore';
import { useSearchStore } from '@/stores/useSearchStore';
import { useDebounce } from '@/hooks/useDebounce';
import { getAllTeachers, getTeacherReviewCount } from '@/services/teacherService';
import { BackButton } from '@/components/ui/BackButton';
import type { Teacher } from '@/types';

export default function Explore() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const { department, sort } = useFilterStore();
  const { query } = useSearchStore();
  const debouncedQuery = useDebounce(query, 300);

  const [reviewCounts, setReviewCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    setLoading(true);
    getAllTeachers().then(async (t) => {
      setTeachers(t);
      // Fetch review counts for all teachers
      const counts: Record<string, number> = {};
      await Promise.all(t.map(async (teacher) => {
        counts[teacher.id] = await getTeacherReviewCount(teacher.id);
      }));
      setReviewCounts(counts);
      setLoading(false);
    });
  }, []);

  const filtered = useMemo(() => {
    let list = department === 'all'
      ? teachers
      : teachers.filter(t => t.department?.toLowerCase() === department.toLowerCase());

    const q = (debouncedQuery || "").trim().toLowerCase();
    if (q) {
      list = list.filter(t => {
        const tName = (t.name || "").toLowerCase();
        const tSubj = (t.subject || "").toLowerCase();
        return tName.includes(q) || tSubj.includes(q);
      });
    }

    switch (sort) {
      case 'highest': return [...list].sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case 'most-reviewed': return [...list].sort((a, b) => (reviewCounts[b.id] || 0) - (reviewCounts[a.id] || 0));
      case 'name-az': return [...list].sort((a, b) => (a.name || "").localeCompare(b.name || ""));
      case 'available': return [...list].sort((a, b) => {
        const aAvail = a.isAvailable ?? a.availableForFyp ?? true ? 1 : 0;
        const bAvail = b.isAvailable ?? b.availableForFyp ?? true ? 1 : 0;
        return bAvail - aAvail;
      });
      default: return list;
    }
  }, [teachers, department, sort, debouncedQuery, reviewCounts]);

  return (
    <div className="space-y-6">
      <BackButton />
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Explore Supervisors</h1>
        <p className="text-sm text-muted-foreground">Find the perfect supervisor for your FYP</p>
      </div>
      <FilterBar />
      <TeacherGrid teachers={filtered} loading={loading} />
    </div>
  );
}
