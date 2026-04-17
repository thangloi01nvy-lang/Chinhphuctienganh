export interface Teacher {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  tags: string[];
  quote?: string;
  email?: string;
  phone?: string;
  facebook?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface ConsultationRequest {
  id: string;
  name: string;
  phone: string;
  level: string;
  goal: string;
  date: string;
  status: 'pending' | 'processing' | 'completed';
}

export interface Announcement {
  id: string;
  type: string;
  time: string;
  content: string;
}

export interface ScheduleItem {
  id: string;
  day: string;
  date: string;
  title: string;
  time: string;
  location: string;
}

export interface DocumentItem {
  id: string;
  title: string;
  category: string;
  subCategory?: string;
  url: string;
  type: 'pdf' | 'doc' | 'link';
}

export interface TeacherVideo {
  id: string;
  teacherName: string;
  title: string;
  embedUrl: string;
}
