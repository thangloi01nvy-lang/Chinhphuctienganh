import { useState, useEffect } from 'react';
import { DOCUMENTS as defaultDocuments } from '../constants';
import { DocumentItem } from '../types';

export function useDocuments() {
  const [documents, setDocuments] = useState<DocumentItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('app_documents');
    if (stored) {
      try {
        setDocuments(JSON.parse(stored));
      } catch (e) {
        setDocuments(defaultDocuments);
      }
    } else {
      setDocuments(defaultDocuments);
    }
  }, []);

  const updateDocument = (updatedDocument: DocumentItem) => {
    const newDocuments = documents.map(d => d.id === updatedDocument.id ? updatedDocument : d);
    setDocuments(newDocuments);
    localStorage.setItem('app_documents', JSON.stringify(newDocuments));
  };

  const addDocument = (newDocument: DocumentItem) => {
    const newDocuments = [...documents, newDocument];
    setDocuments(newDocuments);
    localStorage.setItem('app_documents', JSON.stringify(newDocuments));
  };

  const deleteDocument = (id: string) => {
    const newDocuments = documents.filter(d => d.id !== id);
    setDocuments(newDocuments);
    localStorage.setItem('app_documents', JSON.stringify(newDocuments));
  };

  return { documents, updateDocument, addDocument, deleteDocument };
}
