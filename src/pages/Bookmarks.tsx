import { useState, useEffect, useMemo } from 'react';
import { useBookmarkStore } from '@/stores/useBookmarkStore';
import { TeacherGrid } from '@/components/teachers/TeacherGrid';
import { EmptyState } from '@/components/ui/EmptyState';
import { getAllTeachers } from '@/services/teacherService';
import type { Teacher } from '@/types';

export default function Bookmarks() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const { bookmarks } = useBookmarkStore();

  useEffect(() => {
    getAllTeachers().then(t => { setTeachers(t); setLoading(false); });
  }, []);

  const bookmarked = useMemo(
    () => teachers.filter(t => bookmarks.includes(t.id)),
    [teachers, bookmarks]
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Bookmarks</h1>
        <p className="text-sm text-muted-foreground">Your saved supervisors</p>
      </div>

      {!loading && bookmarked.length === 0 ? (
        <EmptyState
          title="No bookmarks yet"
          description="Explore supervisors and bookmark your favorites to see them here."
        />
      ) : (
        <TeacherGrid teachers={bookmarked} loading={loading} />
      )}
    </div>
  );
}
