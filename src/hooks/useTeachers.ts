import { useState, useEffect } from 'react';
import { TEACHERS as defaultTeachers } from '../constants';
import { Teacher } from '../types';

export function useTeachers() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('app_teachers_v2');
    if (stored) {
      try {
        setTeachers(JSON.parse(stored));
      } catch (e) {
        setTeachers(defaultTeachers);
      }
    } else {
      setTeachers(defaultTeachers);
    }
  }, []);

  const updateTeacher = (updatedTeacher: Teacher) => {
    const newTeachers = teachers.map(t => t.id === updatedTeacher.id ? updatedTeacher : t);
    setTeachers(newTeachers);
    localStorage.setItem('app_teachers_v2', JSON.stringify(newTeachers));
  };

  const addTeacher = (newTeacher: Teacher) => {
    const newTeachers = [...teachers, newTeacher];
    setTeachers(newTeachers);
    localStorage.setItem('app_teachers_v2', JSON.stringify(newTeachers));
  };

  const deleteTeacher = (id: string) => {
    const newTeachers = teachers.filter(t => t.id !== id);
    setTeachers(newTeachers);
    localStorage.setItem('app_teachers_v2', JSON.stringify(newTeachers));
  };

  return { teachers, updateTeacher, addTeacher, deleteTeacher };
}
