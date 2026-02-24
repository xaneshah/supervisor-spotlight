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
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Teacher));
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
      (t.name || "").toLowerCase().includes(q) ||
      (t.subject || "").toLowerCase().includes(q)
    );
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
  const departments: Department[] = ['ai', 'cs', 'ee', 'se', 'cysec', 'it', 'ds', 'me', 'ce', 'cen', 'ie'];
  const counts: Record<string, number> = {};
  departments.forEach(d => counts[d] = 0);

  try {
    const teachers = await getAllTeachers();
    teachers.forEach(t => {
      if (t.department) {
        const deptKey = t.department.toLowerCase();
        if (counts.hasOwnProperty(deptKey)) {
          counts[deptKey]++;
        }
      }
    });
    return counts;
  } catch (error) {
    console.error("Error fetching department counts:", error);
    return counts;
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
