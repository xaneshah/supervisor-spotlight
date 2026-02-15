export type Department = 'ai' | 'cs' | 'ee';

export interface Teacher {
  id: string;
  name: string;
  department: Department;
  role: string;
  subject: string;
  rating: number;
  isAvailable: boolean;
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
