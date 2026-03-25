import { useState, useEffect } from 'react';
import { TeacherVideo } from '../types';
import { db } from '../firebase';
import { collection, onSnapshot, doc, setDoc, deleteDoc } from 'firebase/firestore';

export function useTeacherVideos() {
  const [videos, setVideos] = useState<TeacherVideo[]>([]);

  useEffect(() => {
    const videosRef = collection(db, 'videos');
    const unsubscribe = onSnapshot(videosRef, async (snapshot) => {
      if (snapshot.empty) {
        const localData = localStorage.getItem('app_videos');
        if (localData) {
          try {
            const parsed = JSON.parse(localData);
            if (Array.isArray(parsed) && parsed.length > 0) {
              console.log('Migrating videos from local storage to Firebase...');
              for (const video of parsed) {
                const { id, ...data } = video;
                await setDoc(doc(db, 'videos', id), data);
              }
            }
          } catch (e) {
            console.error('Migration failed', e);
          }
        }
      }

      const loadedVideos = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as TeacherVideo[];
      setVideos(loadedVideos);
    }, (error) => {
      console.error('Firestore Error: ', error);
    });

    return () => unsubscribe();
  }, []);

  const updateVideo = async (updatedVideo: TeacherVideo) => {
    try {
      const { id, ...data } = updatedVideo;
      await setDoc(doc(db, 'videos', id), data);
    } catch (e) {
      console.error("Failed to save to Firestore", e);
      alert("Không thể lưu thay đổi. Vui lòng kiểm tra quyền.");
    }
  };

  const addVideo = async (newVideo: TeacherVideo) => {
    try {
      const { id, ...data } = newVideo;
      await setDoc(doc(db, 'videos', id), data);
    } catch (e) {
      console.error("Failed to save to Firestore", e);
      alert("Không thể lưu thay đổi. Vui lòng kiểm tra quyền.");
    }
  };

  const deleteVideo = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'videos', id));
    } catch (e) {
      console.error("Failed to delete from Firestore", e);
      alert("Không thể lưu thay đổi.");
    }
  };

  return { videos, updateVideo, addVideo, deleteVideo };
}
