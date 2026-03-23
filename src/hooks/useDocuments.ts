import { useState, useEffect } from 'react';
import { DOCUMENTS as defaultDocuments } from '../constants';
import { DocumentItem } from '../types';

export function useDocuments() {
  const [documents, setDocuments] = useState<DocumentItem[]>([]);

  useEffect(() => {
    const loadDocuments = () => {
      const stored = localStorage.getItem('app_documents_v3');
      if (stored) {
        try {
          setDocuments(JSON.parse(stored));
        } catch (e) {
          setDocuments(defaultDocuments);
        }
      } else {
        setDocuments(defaultDocuments);
        localStorage.setItem('app_documents_v3', JSON.stringify(defaultDocuments));
      }
    };

    loadDocuments();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'app_documents_v3') {
        loadDocuments();
      }
    };

    const handleCustomChange = () => {
      loadDocuments();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('app_documents_changed', handleCustomChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('app_documents_changed', handleCustomChange);
    };
  }, []);

  const updateDocument = (updatedDocument: DocumentItem) => {
    const newDocuments = documents.map(d => d.id === updatedDocument.id ? updatedDocument : d);
    setDocuments(newDocuments);
    try {
      localStorage.setItem('app_documents_v3', JSON.stringify(newDocuments));
      window.dispatchEvent(new Event('app_documents_changed'));
    } catch (e) {
      console.error("Failed to save to localStorage", e);
      alert("Không thể lưu thay đổi. Kích thước ảnh có thể quá lớn.");
    }
  };

  const addDocument = (newDocument: DocumentItem) => {
    const newDocuments = [...documents, newDocument];
    setDocuments(newDocuments);
    try {
      localStorage.setItem('app_documents_v3', JSON.stringify(newDocuments));
      window.dispatchEvent(new Event('app_documents_changed'));
    } catch (e) {
      console.error("Failed to save to localStorage", e);
      alert("Không thể lưu thay đổi. Kích thước ảnh có thể quá lớn.");
    }
  };

  const deleteDocument = (id: string) => {
    const newDocuments = documents.filter(d => d.id !== id);
    setDocuments(newDocuments);
    try {
      localStorage.setItem('app_documents_v3', JSON.stringify(newDocuments));
      window.dispatchEvent(new Event('app_documents_changed'));
    } catch (e) {
      console.error("Failed to save to localStorage", e);
      alert("Không thể lưu thay đổi.");
    }
  };

  return { documents, updateDocument, addDocument, deleteDocument };
}
