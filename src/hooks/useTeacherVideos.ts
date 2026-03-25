import { useState, useEffect } from 'react';
import { TEACHER_VIDEOS as defaultVideos } from '../constants';
import { TeacherVideo } from '../types';

export function useTeacherVideos() {
  const [videos, setVideos] = useState<TeacherVideo[]>([]);

  useEffect(() => {
    const loadVideos = () => {
      const stored = localStorage.getItem('app_videos_v1');
      if (stored) {
        try {
          setVideos(JSON.parse(stored));
        } catch (e) {
          setVideos(defaultVideos);
        }
      } else {
        setVideos(defaultVideos);
        localStorage.setItem('app_videos_v1', JSON.stringify(defaultVideos));
      }
    };

    loadVideos();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'app_videos_v1') {
        loadVideos();
      }
    };

    const handleCustomChange = () => {
      loadVideos();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('app_videos_changed', handleCustomChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('app_videos_changed', handleCustomChange);
    };
  }, []);

  const updateVideo = (updatedVideo: TeacherVideo) => {
    const newVideos = videos.map(v => v.id === updatedVideo.id ? updatedVideo : v);
    setVideos(newVideos);
    try {
      localStorage.setItem('app_videos_v1', JSON.stringify(newVideos));
      window.dispatchEvent(new Event('app_videos_changed'));
    } catch (e) {
      console.error("Failed to save to localStorage", e);
      alert("Không thể lưu thay đổi.");
    }
  };

  const addVideo = (newVideo: TeacherVideo) => {
    const newVideos = [...videos, newVideo];
    setVideos(newVideos);
    try {
      localStorage.setItem('app_videos_v1', JSON.stringify(newVideos));
      window.dispatchEvent(new Event('app_videos_changed'));
    } catch (e) {
      console.error("Failed to save to localStorage", e);
      alert("Không thể lưu thay đổi.");
    }
  };

  const deleteVideo = (id: string) => {
    const newVideos = videos.filter(v => v.id !== id);
    setVideos(newVideos);
    try {
      localStorage.setItem('app_videos_v1', JSON.stringify(newVideos));
      window.dispatchEvent(new Event('app_videos_changed'));
    } catch (e) {
      console.error("Failed to save to localStorage", e);
      alert("Không thể lưu thay đổi.");
    }
  };

  return { videos, updateVideo, addVideo, deleteVideo };
}
