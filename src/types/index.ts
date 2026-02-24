export type Department = 'ai' | 'cs' | 'ee' | 'se' | 'cysec' | 'it' | 'ds' | 'me' | 'ce' | 'cen' | 'ie';

export interface Teacher {
  id: string;
  name: string;
  department: Department;
  role: string;
  subject: string;
  rating: number;
  isAvailable?: boolean;
  availableForFyp?: boolean;
}

export interface Review {
  id: string;
  teacherId: string;
  comment: string;
  rating: number;
  isAnonymous: boolean;
  timestamp: Date;
}

export type SortOption = 'highest' | 'most-reviewed' | 'name-az' | 'available';
export type ViewMode = 'grid' | 'list';
export type ReviewSort = 'newest' | 'highest' | 'lowest';
