import type { Department } from '@/types';

export const DEPARTMENT_LABELS: Record<Department, string> = {
  ai: 'Artificial Intelligence',
  cs: 'Computer Science',
  ee: 'Electrical Engineering',
};

export const DEPARTMENT_SHORT: Record<Department, string> = {
  ai: 'AI',
  cs: 'CS',
  ee: 'EE',
};

export const DEPARTMENT_COLORS: Record<Department, { text: string; bg: string; border: string }> = {
  ai: { text: 'dept-ai', bg: 'dept-ai-bg', border: 'dept-ai-border' },
  cs: { text: 'dept-cs', bg: 'dept-cs-bg', border: 'dept-cs-border' },
  ee: { text: 'dept-ee', bg: 'dept-ee-bg', border: 'dept-ee-border' },
};
