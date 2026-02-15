// TODO: Connect to Firebase
import type { Review } from '@/types';
import { mockReviews } from '@/utils/mockData';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

let localReviews = [...mockReviews];

export async function getReviewsByTeacher(teacherId: string): Promise<Review[]> {
  await delay(800);
  return localReviews
    .filter(r => r.teacherId === teacherId)
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
}

export async function getAllReviews(): Promise<Review[]> {
  await delay(800);
  return localReviews.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
}

export async function addReview(review: Omit<Review, 'id' | 'timestamp'>): Promise<Review> {
  await delay(500);
  const newReview: Review = {
    ...review,
    id: `r${Date.now()}`,
    timestamp: new Date(),
  };
  localReviews = [newReview, ...localReviews];
  return newReview;
}
