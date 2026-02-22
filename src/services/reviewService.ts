import { db } from '@/lib/firebase';
import { collection, getDocs, query, where, addDoc, orderBy, limit, collectionGroup, getCountFromServer } from 'firebase/firestore';
import type { Review } from '@/types';

export async function getReviewsByTeacher(teacherId: string): Promise<Review[]> {
  try {
    // Query the sub-collection: teachers/{teacherId}/reviews
    const q = query(
      collection(db, "teachers", teacherId, "reviews"),
      orderBy("timestamp", "desc")
    );
    const querySnapshot = await getDocs(q);
    const reviews = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      timestamp: doc.data().timestamp.toDate()
    })) as Review[];

    return reviews;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }
}

export async function getAllReviews(): Promise<Review[]> {
  try {
    // Use collectionGroup to query all 'reviews' instances across all teachers
    const q = query(collectionGroup(db, 'reviews'), orderBy("timestamp", "desc"), limit(20));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      timestamp: doc.data().timestamp.toDate()
    })) as Review[];
  } catch (error) {
    console.error("Error fetching all reviews:", error);
    return [];
  }
}

export async function addReview(review: Omit<Review, 'id' | 'timestamp'>): Promise<Review> {
  try {
    const newReview = {
      ...review,
      timestamp: new Date()
    };
    // Add to the specific teacher's reviews sub-collection
    const docRef = await addDoc(collection(db, "teachers", review.teacherId, "reviews"), newReview);
    return { id: docRef.id, ...newReview } as Review;
  } catch (error) {
    console.error("Error adding review:", error);
    throw error;
  }
}

export async function getTotalReviewCount(): Promise<number> {
  try {
    const q = query(collectionGroup(db, 'reviews'));
    const snapshot = await getCountFromServer(q);
    return snapshot.data().count;
  } catch (error) {
    console.error("Error getting total review count:", error);
    return 0;
  }
}

export async function getGlobalAverageRating(): Promise<number> {
  try {
    const reviews = await getAllReviews(); // Re-using getAllReviews (limit 20) might allow for approximation, but for accurate average we need all. 
    // For a scalable app, this should be an aggregated field on a 'stats' document.
    // For this size, fetching all might be okay, but let's stick to the visible ones or fetch headers.

    // Better approach for "live-update" without heavy reads: 
    // 1. Fetch a reasonable batch or use an aggregator.
    // 2. Client-side calc for the demo.

    // Let's query collectionGroup without limit for calculation (careful with reads) or keeps it simple.
    // Given the requirement "sum of all reviews", let's use collectionGroup.

    const q = query(collectionGroup(db, 'reviews'));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) return 0;

    const totalRating = querySnapshot.docs.reduce((acc, doc) => acc + doc.data().rating, 0);
    return totalRating / querySnapshot.size;
  } catch (error) {
    console.error("Error getting global average:", error);
    return 0;
  }
}
