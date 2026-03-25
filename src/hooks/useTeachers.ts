import { useState, useEffect } from 'react';
import { Teacher } from '../types';
import { db } from '../firebase';
import { collection, onSnapshot, doc, setDoc, deleteDoc } from 'firebase/firestore';

export function useTeachers() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  useEffect(() => {
    const teachersRef = collection(db, 'teachers');
    const unsubscribe = onSnapshot(teachersRef, async (snapshot) => {
      if (snapshot.empty) {
        const localData = localStorage.getItem('app_teachers');
        if (localData) {
          try {
            const parsed = JSON.parse(localData);
            if (Array.isArray(parsed) && parsed.length > 0) {
              console.log('Migrating teachers from local storage to Firebase...');
              for (const teacher of parsed) {
                const { id, ...data } = teacher;
                await setDoc(doc(db, 'teachers', id), data);
              }
            }
          } catch (e) {
            console.error('Migration failed', e);
          }
        }
      }

      const loadedTeachers = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Teacher[];
      setTeachers(loadedTeachers);
    }, (error) => {
      console.error('Firestore Error: ', error);
    });

    return () => unsubscribe();
  }, []);

  const updateTeacher = async (updatedTeacher: Teacher) => {
    try {
      const { id, ...data } = updatedTeacher;
      await setDoc(doc(db, 'teachers', id), data);
    } catch (e) {
      console.error("Failed to save to Firestore", e);
      alert("Không thể lưu thay đổi. Vui lòng kiểm tra quyền.");
    }
  };

  const addTeacher = async (newTeacher: Teacher) => {
    try {
      const { id, ...data } = newTeacher;
      await setDoc(doc(db, 'teachers', id), data);
    } catch (e) {
      console.error("Failed to save to Firestore", e);
      alert("Không thể lưu thay đổi. Vui lòng kiểm tra quyền.");
    }
  };

  const deleteTeacher = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'teachers', id));
    } catch (e) {
      console.error("Failed to delete from Firestore", e);
      alert("Không thể lưu thay đổi.");
    }
  };

  return { teachers, updateTeacher, addTeacher, deleteTeacher };
}
