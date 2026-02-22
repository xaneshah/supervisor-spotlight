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
    let list = department === 'all' ? teachers : teachers.filter(t => t.department === department);

    if (debouncedQuery.trim()) {
      const q = debouncedQuery.toLowerCase();
      list = list.filter(t =>
        t.name.toLowerCase().includes(q) ||
        t.subject.toLowerCase().includes(q)
      );
    }

    switch (sort) {
      case 'highest': return [...list].sort((a, b) => b.rating - a.rating);
      case 'most-reviewed': return [...list].sort((a, b) => (reviewCounts[b.id] || 0) - (reviewCounts[a.id] || 0));
      case 'name-az': return [...list].sort((a, b) => a.name.localeCompare(b.name));
      case 'available': return [...list].sort((a, b) => (b.isAvailable ? 1 : 0) - (a.isAvailable ? 1 : 0));
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
