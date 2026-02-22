// TODO: Connect to Firebase
import type { Teacher, Review, Department } from '@/types';


import { db } from '@/lib/firebase';
import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  orderBy,
  limit,
  where,
  getCountFromServer
} from 'firebase/firestore';

export async function getAllTeachers(): Promise<Teacher[]> {
  try {
    const querySnapshot = await getDocs(collection(db, "teachers"));
    if (querySnapshot.empty) {
      console.log("Firebase connected but 'teachers' collection is empty.");
      return [];
    }
    const teachers = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Teacher));
    console.log("Firebase connected successfully, fetched teachers:", teachers);
    return teachers;
  } catch (error) {
    console.error("Error connecting to Firebase:", error);
    return [];
  }
}



export async function getTeacherById(id: string): Promise<Teacher | undefined> {
  try {
    const docRef = doc(db, "teachers", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Teacher;
    } else {
      console.log("No such teacher!");
      return undefined;
    }
  } catch (error) {
    console.error("Error fetching teacher:", error);
    return undefined;
  }
}

export async function getTeachersByDepartment(dept: Department): Promise<Teacher[]> {
  try {
    const q = query(collection(db, "teachers"), where("department", "==", dept));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Teacher));
  } catch (error) {
    console.error("Error fetching teachers by department:", error);
    return [];
  }
}

export async function searchTeachers(queryText: string): Promise<Teacher[]> {
  try {
    // For this size of app, fetching all key fields or using a client-side index is acceptable.
    // To ensure case-insensitive substring search without a dedicated search service (like Algolia),
    // we fetch all teachers and filter in memory. This ensures 'Asif' matches 'asif'.
    const teachers = await getAllTeachers();
    const q = queryText.toLowerCase();

    return teachers.filter(t =>
      t.name.toLowerCase().includes(q) ||
      t.subject.toLowerCase().includes(q)
    ).slice(0, 5);
  } catch (error) {
    console.error("Error searching teachers:", error);
    return [];
  }
}



export async function getTopRatedTeachers(): Promise<Teacher[]> {
  try {
    const q = query(
      collection(db, "teachers"),
      orderBy("rating", "desc"),
      limit(5)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Teacher));
  } catch (error) {
    console.error("Error fetching top rated teachers:", error);
    return [];
  }
}

export async function getDepartmentCounts(): Promise<Record<string, number>> {
  const departments: Department[] = ['ai', 'cs', 'ee'];
  const counts: Record<string, number> = {};

  try {
    await Promise.all(departments.map(async (dept) => {
      const q = query(collection(db, "teachers"), where("department", "==", dept));
      const snapshot = await getCountFromServer(q);
      counts[dept] = snapshot.data().count;
    }));
    return counts;
  } catch (error) {
    console.error("Error fetching department counts:", error);
    return { ai: 0, cs: 0, ee: 0 };
  }
}

export async function getTeacherReviewCount(teacherId: string): Promise<number> {
  try {
    const q = query(collection(db, "teachers", teacherId, "reviews"));
    const snapshot = await getCountFromServer(q);
    return snapshot.data().count;
  } catch (error) {
    console.error("Error getting review count:", error);
    return 0;
  }
}
