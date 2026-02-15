import { useState, useEffect, useMemo } from 'react';
import { FilterBar } from '@/components/teachers/FilterBar';
import { TeacherGrid } from '@/components/teachers/TeacherGrid';
import { useFilterStore } from '@/stores/useFilterStore';
import { getAllTeachers, getTeacherReviewCount } from '@/services/teacherService';
import type { Teacher } from '@/types';

export default function Explore() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const { department, sort } = useFilterStore();

  useEffect(() => {
    setLoading(true);
    getAllTeachers().then(t => { setTeachers(t); setLoading(false); });
  }, []);

  const filtered = useMemo(() => {
    let list = department === 'all' ? teachers : teachers.filter(t => t.department === department);

    switch (sort) {
      case 'highest': return [...list].sort((a, b) => b.rating - a.rating);
      case 'most-reviewed': return [...list].sort((a, b) => getTeacherReviewCount(b.id) - getTeacherReviewCount(a.id));
      case 'name-az': return [...list].sort((a, b) => a.name.localeCompare(b.name));
      case 'available': return [...list].sort((a, b) => (b.isAvailable ? 1 : 0) - (a.isAvailable ? 1 : 0));
      default: return list;
    }
  }, [teachers, department, sort]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Explore Supervisors</h1>
        <p className="text-sm text-muted-foreground">Find the perfect supervisor for your FYP</p>
      </div>
      <FilterBar />
      <TeacherGrid teachers={filtered} loading={loading} />
    </div>
  );
}
