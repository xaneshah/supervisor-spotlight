// TODO: Connect to Firebase
import type { Teacher, Review, Department } from '@/types';
import { mockTeachers, mockReviews } from '@/utils/mockData';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getAllTeachers(): Promise<Teacher[]> {
  await delay(800);
  return mockTeachers;
}

export async function getTeacherById(id: string): Promise<Teacher | undefined> {
  await delay(600);
  return mockTeachers.find(t => t.id === id);
}

export async function getTeachersByDepartment(dept: Department): Promise<Teacher[]> {
  await delay(800);
  return mockTeachers.filter(t => t.department === dept);
}

export async function searchTeachers(query: string): Promise<Teacher[]> {
  await delay(300);
  const q = query.toLowerCase();
  return mockTeachers.filter(t =>
    t.name.toLowerCase().includes(q) || t.subject.toLowerCase().includes(q)
  ).slice(0, 5);
}

export function getTeacherReviewCount(teacherId: string): number {
  return mockReviews.filter(r => r.teacherId === teacherId).length;
}
