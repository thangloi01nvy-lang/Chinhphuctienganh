import { useState, useEffect } from 'react';
import { DocumentItem } from '../types';
import { db } from '../firebase';
import { collection, onSnapshot, doc, setDoc, deleteDoc } from 'firebase/firestore';

export function useDocuments() {
  const [documents, setDocuments] = useState<DocumentItem[]>([]);

  useEffect(() => {
    const documentsRef = collection(db, 'documents');
    const unsubscribe = onSnapshot(documentsRef, async (snapshot) => {
      if (snapshot.empty) {
        const localData = localStorage.getItem('app_documents');
        if (localData) {
          try {
            const parsed = JSON.parse(localData);
            if (Array.isArray(parsed) && parsed.length > 0) {
              console.log('Migrating documents from local storage to Firebase...');
              for (const docItem of parsed) {
                const { id, ...data } = docItem;
                await setDoc(doc(db, 'documents', id), data);
              }
            }
          } catch (e) {
            console.error('Migration failed', e);
          }
        }
      }

      const loadedDocuments = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as DocumentItem[];
      setDocuments(loadedDocuments);
    }, (error) => {
      console.error('Firestore Error: ', error);
    });

    return () => unsubscribe();
  }, []);

  const updateDocument = async (updatedDocument: DocumentItem) => {
    try {
      const { id, ...data } = updatedDocument;
      await setDoc(doc(db, 'documents', id), data);
    } catch (e) {
      console.error("Failed to save to Firestore", e);
      alert("Không thể lưu thay đổi. Vui lòng kiểm tra quyền.");
    }
  };

  const addDocument = async (newDocument: DocumentItem) => {
    try {
      const { id, ...data } = newDocument;
      await setDoc(doc(db, 'documents', id), data);
    } catch (e) {
      console.error("Failed to save to Firestore", e);
      alert("Không thể lưu thay đổi. Vui lòng kiểm tra quyền.");
    }
  };

  const deleteDocument = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'documents', id));
    } catch (e) {
      console.error("Failed to delete from Firestore", e);
      alert("Không thể lưu thay đổi.");
    }
  };

  return { documents, updateDocument, addDocument, deleteDocument };
}
