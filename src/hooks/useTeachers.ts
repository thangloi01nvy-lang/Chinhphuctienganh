import { useState, useEffect } from 'react';
import { TEACHERS as defaultTeachers } from '../constants';
import { Teacher } from '../types';

export function useTeachers() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  useEffect(() => {
    const loadTeachers = () => {
      const stored = localStorage.getItem('app_teachers_v3');
      if (stored) {
        try {
          setTeachers(JSON.parse(stored));
        } catch (e) {
          setTeachers(defaultTeachers);
        }
      } else {
        setTeachers(defaultTeachers);
        localStorage.setItem('app_teachers_v3', JSON.stringify(defaultTeachers));
      }
    };

    loadTeachers();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'app_teachers_v3') {
        loadTeachers();
      }
    };

    const handleCustomChange = () => {
      loadTeachers();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('app_teachers_changed', handleCustomChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('app_teachers_changed', handleCustomChange);
    };
  }, []);

  const updateTeacher = (updatedTeacher: Teacher) => {
    const newTeachers = teachers.map(t => t.id === updatedTeacher.id ? updatedTeacher : t);
    setTeachers(newTeachers);
    try {
      localStorage.setItem('app_teachers_v3', JSON.stringify(newTeachers));
      window.dispatchEvent(new Event('app_teachers_changed'));
    } catch (e) {
      console.error("Failed to save to localStorage", e);
      alert("Không thể lưu thay đổi. Kích thước ảnh có thể quá lớn.");
    }
  };

  const addTeacher = (newTeacher: Teacher) => {
    const newTeachers = [...teachers, newTeacher];
    setTeachers(newTeachers);
    try {
      localStorage.setItem('app_teachers_v3', JSON.stringify(newTeachers));
      window.dispatchEvent(new Event('app_teachers_changed'));
    } catch (e) {
      console.error("Failed to save to localStorage", e);
      alert("Không thể lưu thay đổi. Kích thước ảnh có thể quá lớn.");
    }
  };

  const deleteTeacher = (id: string) => {
    const newTeachers = teachers.filter(t => t.id !== id);
    setTeachers(newTeachers);
    try {
      localStorage.setItem('app_teachers_v3', JSON.stringify(newTeachers));
      window.dispatchEvent(new Event('app_teachers_changed'));
    } catch (e) {
      console.error("Failed to save to localStorage", e);
      alert("Không thể lưu thay đổi.");
    }
  };

  return { teachers, updateTeacher, addTeacher, deleteTeacher };
}
