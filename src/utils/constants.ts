import type { Department } from '@/types';

export const DEPARTMENT_LABELS: Record<Department, string> = {
  ai: 'Artificial Intelligence',
  cs: 'Computer Science',
  ee: 'Electrical Engineering',
  se: 'Software Engineering',
  cysec: 'Cyber Security',
  it: 'Information Technology',
  ds: 'Data Science',
  me: 'Mechanical Engineering',
  ce: 'Civil Engineering',
  cen: 'Computer Engineering',
  ie: 'Industrial Engineering',
};

export const DEPARTMENT_SHORT: Record<Department, string> = {
  ai: 'AI',
  cs: 'CS',
  ee: 'EE',
  se: 'SE',
  cysec: 'CySec',
  it: 'IT',
  ds: 'DS',
  me: 'ME',
  ce: 'CE',
  cen: 'CEN',
  ie: 'IE',
};

export const DEPARTMENT_COLORS: Record<Department, { text: string; bg: string; border: string }> = {
  ai: { text: 'dept-ai', bg: 'dept-ai-bg', border: 'dept-ai-border' },
  cs: { text: 'dept-cs', bg: 'dept-cs-bg', border: 'dept-cs-border' },
  ee: { text: 'dept-ee', bg: 'dept-ee-bg', border: 'dept-ee-border' },
  se: { text: 'dept-se', bg: 'dept-se-bg', border: 'dept-se-border' },
  cysec: { text: 'dept-cysec', bg: 'dept-cysec-bg', border: 'dept-cysec-border' },
  it: { text: 'dept-it', bg: 'dept-it-bg', border: 'dept-it-border' },
  ds: { text: 'dept-ds', bg: 'dept-ds-bg', border: 'dept-ds-border' },
  me: { text: 'dept-me', bg: 'dept-me-bg', border: 'dept-me-border' },
  ce: { text: 'dept-ce', bg: 'dept-ce-bg', border: 'dept-ce-border' },
  cen: { text: 'dept-cen', bg: 'dept-cen-bg', border: 'dept-cen-border' },
  ie: { text: 'dept-ie', bg: 'dept-ie-bg', border: 'dept-ie-border' },
};
