import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { CONSULTATIONS, DOCUMENT_CATEGORIES } from '../constants';
import { Users, FileText, TrendingUp, Settings, CheckCircle, Clock, AlertCircle, Edit, Plus, Trash2, Image as ImageIcon } from 'lucide-react';
import { useTeachers } from '../hooks/useTeachers';
import { useDocuments } from '../hooks/useDocuments';
import { useTeacherVideos } from '../hooks/useTeacherVideos';
import { Teacher, DocumentItem, TeacherVideo } from '../types';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'teachers' | 'documents' | 'videos'>('overview');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email === 'admin@example.com') {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const { teachers, addTeacher, updateTeacher, deleteTeacher } = useTeachers();
  const { documents, addDocument, updateDocument, deleteDocument } = useDocuments();
  const { videos, addVideo, updateVideo, deleteVideo } = useTeacherVideos();
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [editingDocument, setEditingDocument] = useState<DocumentItem | null>(null);
  const [isAddingDocument, setIsAddingDocument] = useState(false);
  const [editingVideo, setEditingVideo] = useState<TeacherVideo | null>(null);
  const [isAddingVideo, setIsAddingVideo] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      try {
        await signInWithEmailAndPassword(auth, 'admin@example.com', 'admin123');
        setIsLoggedIn(true);
        setError('');
      } catch (err: any) {
        try {
          await createUserWithEmailAndPassword(auth, 'admin@example.com', 'admin123');
          setIsLoggedIn(true);
          setError('');
        } catch (createErr) {
          console.error(createErr);
          setError('Lỗi kết nối máy chủ xác thực.');
        }
      }
    } else {
      setError('Tài khoản hoặc mật khẩu không đúng');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, setFormState: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 400;
          const MAX_HEIGHT = 400;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
            setFormState((prev: any) => ({ ...prev, image: dataUrl }));
          } else {
            setFormState((prev: any) => ({ ...prev, image: reader.result as string }));
          }
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-10 rounded-3xl shadow-xl border border-outline/10 w-full max-w-md"
        >
          <div className="text-center mb-8">
            <h1 className="font-headline text-3xl font-extrabold text-on-surface mb-2">Đăng nhập Quản trị</h1>
            <p className="text-sm text-on-surface-variant">Vui lòng đăng nhập để tiếp tục</p>
          </div>
          {error && <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm mb-6 text-center font-medium">{error}</div>}
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-outline tracking-wider uppercase ml-1">Tài khoản</label>
              <input 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-surface-variant/30 border border-outline/10 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none" 
                placeholder="Nhập tài khoản..." 
                type="text"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-outline tracking-wider uppercase ml-1">Mật khẩu</label>
              <input 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-surface-variant/30 border border-outline/10 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none" 
                placeholder="Nhập mật khẩu..." 
                type="password"
              />
            </div>
            <button type="submit" className="w-full bg-primary text-white py-3.5 rounded-xl font-bold text-sm hover:bg-primary-dim transition-colors shadow-md">
              Đăng nhập
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  const TeacherForm = ({ teacher, onSave, onCancel }: { teacher: Partial<Teacher>, onSave: (t: Teacher) => void, onCancel: () => void }) => {
    const [formData, setFormData] = useState<Partial<Teacher>>(teacher);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!formData.name || !formData.role || !formData.image) {
        alert('Vui lòng điền đầy đủ thông tin và chọn ảnh!');
        return;
      }
      onSave({
        id: formData.id || Date.now().toString(),
        name: formData.name,
        role: formData.role,
        bio: formData.bio || '',
        image: formData.image,
        tags: formData.tags || [],
        quote: formData.quote || '',
        email: formData.email || '',
        phone: formData.phone || '',
        facebook: formData.facebook || ''
      });
    };

    return (
      <form onSubmit={handleSubmit} className="bg-surface-variant/20 p-6 rounded-2xl border border-outline/10 space-y-4 mb-8">
        <h3 className="font-bold text-lg mb-4">{teacher.id ? 'Chỉnh sửa Giáo viên' : 'Thêm Giáo viên mới'}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-outline tracking-wider uppercase ml-1">Tên giáo viên</label>
            <input value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-white border border-outline/10 rounded-xl px-4 py-2 text-sm outline-none" required />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-outline tracking-wider uppercase ml-1">Vai trò / Chuyên môn</label>
            <input value={formData.role || ''} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full bg-white border border-outline/10 rounded-xl px-4 py-2 text-sm outline-none" required />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-outline tracking-wider uppercase ml-1">Email</label>
            <input type="email" value={formData.email || ''} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-white border border-outline/10 rounded-xl px-4 py-2 text-sm outline-none" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-outline tracking-wider uppercase ml-1">Số điện thoại</label>
            <input value={formData.phone || ''} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-white border border-outline/10 rounded-xl px-4 py-2 text-sm outline-none" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-outline tracking-wider uppercase ml-1">Link Facebook</label>
            <input value={formData.facebook || ''} onChange={e => setFormData({...formData, facebook: e.target.value})} className="w-full bg-white border border-outline/10 rounded-xl px-4 py-2 text-sm outline-none" />
          </div>
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-outline tracking-wider uppercase ml-1">Tiểu sử</label>
          <textarea value={formData.bio || ''} onChange={e => setFormData({...formData, bio: e.target.value})} className="w-full bg-white border border-outline/10 rounded-xl px-4 py-2 text-sm outline-none h-20" required />
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-outline tracking-wider uppercase ml-1">Câu nói yêu thích / Trích dẫn</label>
          <input value={formData.quote || ''} onChange={e => setFormData({...formData, quote: e.target.value})} className="w-full bg-white border border-outline/10 rounded-xl px-4 py-2 text-sm outline-none" />
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-outline tracking-wider uppercase ml-1">Tags (Cách nhau bằng dấu phẩy)</label>
          <input value={formData.tags?.join(', ') || ''} onChange={e => setFormData({...formData, tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean)})} className="w-full bg-white border border-outline/10 rounded-xl px-4 py-2 text-sm outline-none" placeholder="VD: GIAO TIẾP, 10+ NĂM KINH NGHIỆM" />
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-outline tracking-wider uppercase ml-1">Ảnh đại diện</label>
          <div className="flex items-center gap-4">
            {formData.image && <img src={formData.image} alt="Preview" className="w-16 h-16 rounded-xl object-cover border border-outline/10" referrerPolicy="no-referrer" />}
            <label className="cursor-pointer bg-white px-4 py-2 rounded-xl border border-outline/10 text-sm font-medium hover:bg-surface transition-colors flex items-center gap-2">
              <ImageIcon className="w-4 h-4" /> Chọn ảnh
              <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, setFormData)} />
            </label>
          </div>
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <button type="button" onClick={onCancel} className="px-6 py-2 rounded-xl text-sm font-bold bg-white border border-outline/10 hover:bg-surface">Hủy</button>
          <button type="submit" className="px-6 py-2 rounded-xl text-sm font-bold bg-primary text-white hover:bg-primary-dim shadow-sm">Lưu thông tin</button>
        </div>
      </form>
    );
  };

  const DocumentForm = ({ document, onSave, onCancel }: { document: Partial<DocumentItem>, onSave: (d: DocumentItem) => void, onCancel: () => void }) => {
    const [formData, setFormData] = useState<Partial<DocumentItem>>(document);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!formData.title || !formData.category || !formData.url || !formData.type) {
        alert('Vui lòng điền đầy đủ thông tin!');
        return;
      }
      onSave({
        id: formData.id || Date.now().toString(),
        title: formData.title,
        category: formData.category,
        subCategory: formData.subCategory || '',
        url: formData.url,
        type: formData.type as 'pdf' | 'doc' | 'link'
      });
    };

    return (
      <form onSubmit={handleSubmit} className="bg-surface-variant/20 p-6 rounded-2xl border border-outline/10 space-y-4 mb-8">
        <h3 className="font-bold text-lg mb-4">{document.id ? 'Chỉnh sửa Tài liệu' : 'Thêm Tài liệu mới'}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-outline tracking-wider uppercase ml-1">Tên tài liệu</label>
            <input value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-white border border-outline/10 rounded-xl px-4 py-2 text-sm outline-none" required />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-outline tracking-wider uppercase ml-1">Danh mục</label>
            <select value={formData.category || ''} onChange={e => setFormData({...formData, category: e.target.value, subCategory: ''})} className="w-full bg-white border border-outline/10 rounded-xl px-4 py-2 text-sm outline-none" required>
              <option value="">Chọn danh mục...</option>
              {Object.keys(DOCUMENT_CATEGORIES).map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-outline tracking-wider uppercase ml-1">Danh mục con</label>
            <select 
              value={formData.subCategory || ''} 
              onChange={e => setFormData({...formData, subCategory: e.target.value})} 
              className="w-full bg-white border border-outline/10 rounded-xl px-4 py-2 text-sm outline-none"
              disabled={!formData.category}
            >
              <option value="">Chọn danh mục con...</option>
              {formData.category && DOCUMENT_CATEGORIES[formData.category]?.map(sub => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-outline tracking-wider uppercase ml-1">Đường dẫn (URL)</label>
            <input value={formData.url || ''} onChange={e => setFormData({...formData, url: e.target.value})} className="w-full bg-white border border-outline/10 rounded-xl px-4 py-2 text-sm outline-none" required />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-outline tracking-wider uppercase ml-1">Loại tài liệu</label>
            <select value={formData.type || ''} onChange={e => setFormData({...formData, type: e.target.value as any})} className="w-full bg-white border border-outline/10 rounded-xl px-4 py-2 text-sm outline-none" required>
              <option value="">Chọn loại...</option>
              <option value="pdf">PDF</option>
              <option value="doc">DOC/DOCX</option>
              <option value="link">Link Web</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <button type="button" onClick={onCancel} className="px-6 py-2 rounded-xl text-sm font-bold bg-white border border-outline/10 hover:bg-surface">Hủy</button>
          <button type="submit" className="px-6 py-2 rounded-xl text-sm font-bold bg-primary text-white hover:bg-primary-dim shadow-sm">Lưu thông tin</button>
        </div>
      </form>
    );
  };

  const VideoForm = ({ video, onSave, onCancel }: { video: Partial<TeacherVideo>, onSave: (v: TeacherVideo) => void, onCancel: () => void }) => {
    const [formData, setFormData] = useState<Partial<TeacherVideo>>(video);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!formData.teacherName || !formData.title || !formData.embedUrl) {
        alert('Vui lòng điền đầy đủ thông tin!');
        return;
      }
      onSave({
        id: formData.id || Date.now().toString(),
        teacherName: formData.teacherName,
        title: formData.title,
        embedUrl: formData.embedUrl
      });
    };

    return (
      <form onSubmit={handleSubmit} className="bg-surface-variant/20 p-6 rounded-2xl border border-outline/10 space-y-4 mb-8">
        <h3 className="font-bold text-lg mb-4">{video.id ? 'Chỉnh sửa Video' : 'Thêm Video mới'}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-outline tracking-wider uppercase ml-1">Tên giáo viên</label>
            <select value={formData.teacherName || ''} onChange={e => setFormData({...formData, teacherName: e.target.value})} className="w-full bg-white border border-outline/10 rounded-xl px-4 py-2 text-sm outline-none" required>
              <option value="">Chọn giáo viên...</option>
              {teachers.map(t => (
                <option key={t.id} value={t.name}>{t.name}</option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-outline tracking-wider uppercase ml-1">Tiêu đề video</label>
            <input value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-white border border-outline/10 rounded-xl px-4 py-2 text-sm outline-none" required />
          </div>
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-outline tracking-wider uppercase ml-1">Đường dẫn Nhúng (Embed URL)</label>
          <input value={formData.embedUrl || ''} onChange={e => setFormData({...formData, embedUrl: e.target.value})} className="w-full bg-white border border-outline/10 rounded-xl px-4 py-2 text-sm outline-none" required placeholder="VD: https://www.youtube.com/embed/..." />
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <button type="button" onClick={onCancel} className="px-6 py-2 rounded-xl text-sm font-bold bg-white border border-outline/10 hover:bg-surface">Hủy</button>
          <button type="submit" className="px-6 py-2 rounded-xl text-sm font-bold bg-primary text-white hover:bg-primary-dim shadow-sm">Lưu thông tin</button>
        </div>
      </form>
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-32 pb-24 max-w-7xl mx-auto px-6"
    >
      <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="font-headline text-4xl font-extrabold text-on-surface">Bảng Quản trị</h1>
          <p className="text-on-surface-variant font-light mt-1">Chào mừng trở lại, Quản trị viên. Đây là tổng quan hệ thống hôm nay.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={handleLogout} className="px-6 py-2.5 bg-white border border-outline/10 rounded-xl text-sm font-bold hover:bg-surface transition-colors">
            Đăng xuất
          </button>
        </div>
      </header>

      <div className="flex gap-4 border-b border-surface-variant mb-8">
        <button 
          onClick={() => setActiveTab('overview')}
          className={`pb-4 px-2 text-sm font-bold uppercase tracking-widest transition-colors ${activeTab === 'overview' ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
        >
          Tổng quan
        </button>
        <button 
          onClick={() => setActiveTab('teachers')}
          className={`pb-4 px-2 text-sm font-bold uppercase tracking-widest transition-colors ${activeTab === 'teachers' ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
        >
          Quản lý Giáo viên
        </button>
        <button 
          onClick={() => setActiveTab('documents')}
          className={`pb-4 px-2 text-sm font-bold uppercase tracking-widest transition-colors ${activeTab === 'documents' ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
        >
          Quản lý Tài liệu
        </button>
        <button 
          onClick={() => setActiveTab('videos')}
          className={`pb-4 px-2 text-sm font-bold uppercase tracking-widest transition-colors ${activeTab === 'videos' ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
        >
          Quản lý Video
        </button>
      </div>

      {activeTab === 'overview' && (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { label: 'Tổng học viên', value: '1,284', change: '+12%', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
              { label: 'Đăng ký mới', value: '42', change: '+5%', icon: FileText, color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { label: 'Tỷ lệ chuyển đổi', value: '18.5%', change: '+2.4%', icon: TrendingUp, color: 'text-amber-600', bg: 'bg-amber-50' },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl border border-outline/5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <span className="text-emerald-600 text-xs font-bold bg-emerald-50 px-2 py-1 rounded-full">{stat.change}</span>
                </div>
                <h3 className="text-on-surface-variant text-xs font-bold uppercase tracking-widest">{stat.label}</h3>
                <p className="text-3xl font-headline font-extrabold mt-1">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Consultations Table */}
            <div className="lg:col-span-8 bg-white rounded-3xl border border-outline/5 shadow-sm overflow-hidden">
              <div className="p-8 border-b border-surface-variant flex items-center justify-between">
                <h2 className="font-headline text-xl font-bold">Yêu cầu tư vấn mới</h2>
                <button className="text-primary text-xs font-bold uppercase tracking-widest hover:underline">Xem tất cả</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-surface text-[10px] font-bold text-outline uppercase tracking-widest">
                      <th className="px-8 py-4">Học viên</th>
                      <th className="px-8 py-4">Trình độ</th>
                      <th className="px-8 py-4">Ngày đăng ký</th>
                      <th className="px-8 py-4">Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-variant">
                    {CONSULTATIONS.map((req) => (
                      <tr key={req.id} className="hover:bg-surface/50 transition-colors">
                        <td className="px-8 py-5">
                          <div className="font-bold text-sm">{req.name}</div>
                          <div className="text-xs text-on-surface-variant">{req.phone}</div>
                        </td>
                        <td className="px-8 py-5">
                          <span className="text-[10px] font-bold px-2 py-1 bg-surface-variant rounded-full">{req.level}</span>
                        </td>
                        <td className="px-8 py-5 text-xs text-on-surface-variant">{req.date}</td>
                        <td className="px-8 py-5">
                          {req.status === 'completed' && (
                            <span className="flex items-center gap-1 text-emerald-600 text-[10px] font-bold uppercase">
                              <CheckCircle className="w-3 h-3" /> Hoàn thành
                            </span>
                          )}
                          {req.status === 'pending' && (
                            <span className="flex items-center gap-1 text-amber-600 text-[10px] font-bold uppercase">
                              <Clock className="w-3 h-3" /> Chờ xử lý
                            </span>
                          )}
                          {req.status === 'processing' && (
                            <span className="flex items-center gap-1 text-blue-600 text-[10px] font-bold uppercase">
                              <AlertCircle className="w-3 h-3" /> Đang xử lý
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Content Update Form */}
            <div className="lg:col-span-4 space-y-8">
              <div className="bg-white p-8 rounded-3xl border border-outline/5 shadow-sm">
                <h2 className="font-headline text-xl font-bold mb-6">Cập nhật nội dung</h2>
                <form className="space-y-6">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-outline tracking-wider uppercase ml-1">Tiêu đề thông báo</label>
                    <input className="w-full bg-surface-variant/30 border border-outline/10 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none" placeholder="Nhập tiêu đề..." type="text"/>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-outline tracking-wider uppercase ml-1">Nội dung</label>
                    <textarea className="w-full bg-surface-variant/30 border border-outline/10 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none h-32" placeholder="Nhập nội dung thông báo mới..."></textarea>
                  </div>
                  <button className="w-full bg-on-surface text-white py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity">
                    Đăng thông báo
                  </button>
                </form>
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === 'teachers' && (
        <div className="bg-white rounded-3xl border border-outline/5 shadow-sm p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-headline text-2xl font-bold">Danh sách Giáo viên</h2>
            <button 
              onClick={() => { setIsAdding(true); setEditingTeacher(null); }}
              className="px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-primary-dim transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" /> Thêm Giáo viên
            </button>
          </div>

          {isAdding && (
            <TeacherForm 
              teacher={{}} 
              onSave={(t) => { addTeacher(t); setIsAdding(false); }} 
              onCancel={() => setIsAdding(false)} 
            />
          )}

          {editingTeacher && (
            <TeacherForm 
              teacher={editingTeacher} 
              onSave={(t) => { updateTeacher(t); setEditingTeacher(null); }} 
              onCancel={() => setEditingTeacher(null)} 
            />
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teachers.map(teacher => (
              <div key={teacher.id} className="border border-outline/10 rounded-2xl p-6 flex flex-col">
                <div className="flex items-center gap-4 mb-4">
                  <img src={teacher.image} alt={teacher.name} className="w-16 h-16 rounded-xl object-cover bg-surface-variant" referrerPolicy="no-referrer" />
                  <div>
                    <h4 className="font-bold text-lg">{teacher.name}</h4>
                    <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{teacher.role}</span>
                  </div>
                </div>
                <p className="text-sm text-on-surface-variant line-clamp-2 mb-4 flex-grow">{teacher.bio}</p>
                <div className="flex gap-2 mt-auto pt-4 border-t border-surface-variant">
                  <button 
                    onClick={() => { setEditingTeacher(teacher); setIsAdding(false); }}
                    className="flex-1 py-2 bg-surface-variant/50 hover:bg-surface-variant rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors"
                  >
                    <Edit className="w-4 h-4" /> Sửa
                  </button>
                  <button 
                    onClick={() => { if(window.confirm('Bạn có chắc chắn muốn xóa giáo viên này?')) deleteTeacher(teacher.id); }}
                    className="flex-1 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" /> Xóa
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'documents' && (
        <div className="bg-white rounded-3xl border border-outline/5 shadow-sm p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-headline text-2xl font-bold">Danh sách Tài liệu</h2>
            <button 
              onClick={() => { setIsAddingDocument(true); setEditingDocument(null); }}
              className="px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-primary-dim transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" /> Thêm Tài liệu
            </button>
          </div>

          {isAddingDocument && (
            <DocumentForm 
              document={{}} 
              onSave={(d) => { addDocument(d); setIsAddingDocument(false); }} 
              onCancel={() => setIsAddingDocument(false)} 
            />
          )}

          {editingDocument && (
            <DocumentForm 
              document={editingDocument} 
              onSave={(d) => { updateDocument(d); setEditingDocument(null); }} 
              onCancel={() => setEditingDocument(null)} 
            />
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents.map(doc => (
              <div key={doc.id} className="border border-outline/10 rounded-2xl p-6 flex flex-col">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h4 className="font-bold text-lg mb-1">{doc.title}</h4>
                    <div className="flex gap-2">
                      <span className="text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/10 px-2 py-1 rounded-full">{doc.category}</span>
                      {doc.subCategory && (
                        <span className="text-[10px] font-bold text-secondary uppercase tracking-widest bg-secondary/10 px-2 py-1 rounded-full">{doc.subCategory}</span>
                      )}
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-outline-variant uppercase tracking-widest border border-outline/10 px-2 py-1 rounded-md">{doc.type}</span>
                </div>
                <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline line-clamp-1 mb-4 flex-grow">{doc.url}</a>
                <div className="flex gap-2 mt-auto pt-4 border-t border-surface-variant">
                  <button 
                    onClick={() => { setEditingDocument(doc); setIsAddingDocument(false); }}
                    className="flex-1 py-2 bg-surface-variant/50 hover:bg-surface-variant rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors"
                  >
                    <Edit className="w-4 h-4" /> Sửa
                  </button>
                  <button 
                    onClick={() => { if(window.confirm('Bạn có chắc chắn muốn xóa tài liệu này?')) deleteDocument(doc.id); }}
                    className="flex-1 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" /> Xóa
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'videos' && (
        <div className="bg-white rounded-3xl border border-outline/5 shadow-sm p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-headline text-2xl font-bold">Danh sách Video Giáo viên</h2>
            <button 
              onClick={() => { setIsAddingVideo(true); setEditingVideo(null); }}
              className="px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-primary-dim transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" /> Thêm Video
            </button>
          </div>

          {isAddingVideo && (
            <VideoForm 
              video={{}} 
              onSave={(v) => { addVideo(v); setIsAddingVideo(false); }} 
              onCancel={() => setIsAddingVideo(false)} 
            />
          )}

          {editingVideo && (
            <VideoForm 
              video={editingVideo} 
              onSave={(v) => { updateVideo(v); setEditingVideo(null); }} 
              onCancel={() => setEditingVideo(null)} 
            />
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map(video => (
              <div key={video.id} className="border border-outline/10 rounded-2xl p-6 flex flex-col">
                <div className="aspect-video relative bg-slate-100 rounded-xl overflow-hidden mb-4">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src={video.embedUrl} 
                    title={video.title} 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerPolicy="strict-origin-when-cross-origin" 
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  ></iframe>
                </div>
                <h4 className="font-bold text-lg mb-1">{video.teacherName}</h4>
                <p className="text-sm text-on-surface-variant mb-4 flex-grow">{video.title}</p>
                <div className="flex gap-2 mt-auto pt-4 border-t border-surface-variant">
                  <button 
                    onClick={() => { setEditingVideo(video); setIsAddingVideo(false); }}
                    className="flex-1 py-2 bg-surface-variant/50 hover:bg-surface-variant rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors"
                  >
                    <Edit className="w-4 h-4" /> Sửa
                  </button>
                  <button 
                    onClick={() => { if(window.confirm('Bạn có chắc chắn muốn xóa video này?')) deleteVideo(video.id); }}
                    className="flex-1 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" /> Xóa
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
