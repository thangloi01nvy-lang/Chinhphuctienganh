import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLocation } from 'react-router-dom';
import { useTeachers } from '../hooks/useTeachers';
import { useTeacherVideos } from '../hooks/useTeacherVideos';
import { ArrowRight, Verified, PlayCircle, Search, X, Mail, Phone, Facebook } from 'lucide-react';
import { Teacher } from '../types';
import { smartSearch } from '../utils/search';

export default function Teachers() {
  const { teachers } = useTeachers();
  const { videos } = useTeacherVideos();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const location = useLocation();
  
  useEffect(() => {
    if (location.hash) {
      // Small timeout to ensure DOM is ready
      setTimeout(() => {
        const id = location.hash.substring(1);
        
        // If it's a teacher, automatically pop the modal open and scroll to them
        if (id.startsWith('teacher-')) {
          const rawId = id.replace('teacher-', '');
          const teacher = teachers.find(t => t.id === rawId);
          if (teacher) {
            setSelectedTeacher(teacher);
          }
        }

        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 200);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.hash, teachers]);

  const categories = ['Tất cả', 'Giao tiếp', 'TOEIC', 'Thiếu nhi', 'Thương mại'];

  const filteredTeachers = teachers.filter(teacher => {
    const name = teacher.name || '';
    const role = teacher.role || '';
    const tags = teacher.tags || [];
    
    const matchesSearch = smartSearch(name, searchTerm) || 
                          smartSearch(role, searchTerm);
    
    const matchesCategory = selectedCategory === 'Tất cả' || 
                            role.toLowerCase().includes(selectedCategory.toLowerCase()) ||
                            tags.some(tag => tag.toLowerCase().includes(selectedCategory.toLowerCase()));
                            
    return matchesSearch && matchesCategory;
  });

  const featuredVideoText = "thiết kế bài học blended learning giáo viên huỳnh kỳ trình bày thuyết trình chuyên đề đào tạo cách chia tỉ lệ học trực tiếp trực tuyến công cụ quản lý học tập lms canvas google classroom";
  const showFeaturedVideo = searchTerm === '' || smartSearch(featuredVideoText, searchTerm);

  const filteredVideos = videos.filter(video => {
    const title = video.title || '';
    const teacherName = video.teacherName || '';
    const desc = video.description || '';
    const matchesSearch = smartSearch(title, searchTerm) || 
                          smartSearch(teacherName, searchTerm) ||
                          smartSearch(desc, searchTerm);
    return matchesSearch;
  });
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-24 pb-20"
    >
      <section className="max-w-7xl mx-auto px-6 py-12 md:py-20 flex flex-col md:flex-row items-end gap-12">
        <div className="md:w-2/3">
          <span className="text-[10px] font-bold tracking-[0.3em] text-primary uppercase mb-4 block">Học thuật xuất sắc</span>
          <h1 className="font-headline text-5xl md:text-6xl font-extrabold tracking-tighter text-on-surface leading-[1.1] mb-6">
            Gặp gỡ những người kiến tạo sự <span className="text-primary">Lưu loát</span> của bạn.
          </h1>
          <p className="text-on-surface-variant text-lg max-w-xl leading-relaxed font-light">
            Đội ngũ giáo viên của chúng tôi bao gồm những nhà giáo ưu tú cam kết sự chính xác, đổi mới và thành công học thuật cá nhân của bạn.
          </p>
        </div>
        <div className="md:w-1/3 flex justify-end">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-outline/10 w-full max-w-xs">
            <div className="flex items-center gap-3 mb-3 text-primary">
              <Verified className="w-8 h-8" />
              <span className="font-headline font-extrabold text-3xl">
                {teachers.length < 10 ? `0${teachers.length}` : teachers.length}
              </span>
            </div>
            <p className="text-xs font-bold tracking-widest uppercase text-on-surface-variant">Chuyên gia chứng nhận</p>
            <div className="mt-4 h-[2px] w-12 bg-primary"></div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 mb-16">
        <div className="flex flex-col md:flex-row gap-6 border-b border-surface-variant pb-8">
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-outline-variant" />
            <input 
              type="text" 
              placeholder="Tìm kiếm giáo viên..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-outline/10 rounded-xl pl-12 pr-4 py-3.5 text-sm focus:ring-2 focus:ring-primary/20 outline-none shadow-sm"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((filter) => (
              <button 
                key={filter}
                onClick={() => setSelectedCategory(filter)}
                className={`px-6 py-3.5 rounded-xl text-[11px] font-bold tracking-widest uppercase transition-all shadow-sm ${
                  selectedCategory === filter ? 'bg-primary text-white' : 'bg-white border border-outline/10 text-on-surface-variant hover:bg-surface'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredTeachers.length > 0 ? (
            filteredTeachers.map((teacher) => (
              <article id={`teacher-${teacher.id}`} key={teacher.id} className="scholar-card bg-white p-8 group cursor-pointer" onClick={() => setSelectedTeacher(teacher)}>
                <div className="relative overflow-hidden rounded-xl mb-8 aspect-[4/5] bg-surface-variant/30">
                  <img 
                    alt={teacher.name} 
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105" 
                    src={teacher.image}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-black/60 to-transparent">
                    <span className="text-white text-[10px] font-bold tracking-widest uppercase">{teacher.role}</span>
                  </div>
                </div>
                <h3 className="font-headline text-2xl font-bold text-on-surface mb-3">{teacher.name}</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed mb-8 font-light italic line-clamp-3">
                  "{teacher.quote || teacher.bio}"
                </p>
                <div className="flex items-center justify-between pt-6 border-t border-surface-variant">
                  <span className="text-[10px] font-bold tracking-widest text-primary">TIỂU SỬ & LIÊN HỆ</span>
                  <ArrowRight className="w-4 h-4 text-outline group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </article>
            ))
          ) : (
            <div className="col-span-full py-20 text-center border-2 border-dashed border-outline/10 rounded-3xl">
              <Search className="w-12 h-12 text-outline-variant mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-bold text-on-surface-variant mb-2">Không tìm thấy giáo viên</h3>
              <p className="text-sm text-outline-variant">Thử thay đổi từ khóa tìm kiếm hoặc danh mục.</p>
            </div>
          )}
        </div>
      </section>

      {/* Teacher Videos Section */}
      <section id="videos" className="bg-surface-variant/20 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
            <div>
              <span className="text-[10px] font-bold tracking-[0.3em] text-primary uppercase mb-4 block flex items-center gap-2">
                <PlayCircle className="w-4 h-4" /> Video Bài Giảng
              </span>
              <h2 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tighter text-on-surface leading-[1.1]">
                Phong cách <span className="text-primary">giảng bài</span>
              </h2>
            </div>
            <p className="text-on-surface-variant text-sm max-w-md leading-relaxed font-light">
              Trải nghiệm phong cách giảng dạy trực quan và sinh động từ đội ngũ giáo viên của chúng tôi qua các video thực tế.
            </p>
          </div>

          {!showFeaturedVideo && filteredVideos.length === 0 ? (
            <div className="py-20 text-center border-2 border-dashed border-outline/10 rounded-3xl bg-white">
              <Search className="w-12 h-12 text-outline-variant mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-bold text-on-surface-variant mb-2">Không tìm thấy video</h3>
              <p className="text-sm text-outline-variant">Thử thay đổi từ khóa tìm kiếm.</p>
            </div>
          ) : (
            <>
              {showFeaturedVideo && (
                <div id="featured-video" className="bg-white border border-outline/10 rounded-2xl overflow-hidden shadow-sm mb-12">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="p-10 flex flex-col justify-center">
                      <span className="border border-outline/10 text-on-surface-variant w-fit px-3 py-1 text-[9px] font-bold uppercase tracking-widest mb-6 inline-block">Chuyên đề đào tạo</span>
                      <h3 className="font-headline text-3xl font-extrabold mb-4 leading-tight">Thiết kế bài học trong Blended Learning</h3>
                      <p className="text-primary font-bold text-sm mb-6">Trình bày (Thuyết trình): Giáo viên Huỳnh Kỳ</p>
                      <ul className="text-[14px] text-on-surface-variant space-y-3 leading-relaxed border-l border-surface-variant pl-6">
                        <li>Cách chia tỉ lệ học trực tiếp – học trực tuyến.</li>
                        <li>Công cụ quản lý học tập (LMS, Google Classroom, Canvas…).</li>
                        <li>Ví dụ: một buổi học Tiếng Anh 6 có thể tổ chức thế nào.</li>
                      </ul>
                    </div>
                    <div className="aspect-video relative bg-slate-900 h-full min-h-[300px]">
                      <iframe 
                        width="100%" 
                        height="100%" 
                        src="https://www.youtube.com/embed/n5rQ80-e_oM?si=CWxS3iHqwedG-rs4" 
                        title="Thiết kế bài học trong Blended Learning" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        referrerPolicy="strict-origin-when-cross-origin" 
                        allowFullScreen
                        className="absolute inset-0 w-full h-full"
                      ></iframe>
                    </div>
                  </div>
                </div>
              )}

              {filteredVideos.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredVideos.map((video) => (
                    <div id={`video-${video.id}`} key={video.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-outline/10 group">
                      <div className="aspect-video relative bg-slate-100">
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
                      <div className="p-6">
                        <h3 className="font-headline text-xl font-bold text-on-surface mb-1">{video.teacherName}</h3>
                        <p className="text-sm text-on-surface-variant">{video.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Teacher Detail Modal */}
      <AnimatePresence>
        {selectedTeacher && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTeacher(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
            >
              <button 
                onClick={() => setSelectedTeacher(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/10 hover:bg-black/20 text-white md:text-on-surface md:bg-surface-variant md:hover:bg-outline/10 rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="w-full md:w-2/5 h-64 md:h-auto relative bg-surface-variant/30 flex-shrink-0">
                <img 
                  src={selectedTeacher.image} 
                  alt={selectedTeacher.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <span className="text-white/90 text-[10px] font-bold tracking-widest uppercase block mb-1">{selectedTeacher.role}</span>
                  <h2 className="text-white font-headline text-3xl font-bold">{selectedTeacher.name}</h2>
                </div>
              </div>
              
              <div className="w-full md:w-3/5 p-8 md:p-12 overflow-y-auto">
                <div className="mb-8">
                  <h3 className="text-[11px] font-bold tracking-[0.2em] text-primary uppercase mb-4">Tiểu sử</h3>
                  <p className="text-on-surface-variant leading-relaxed whitespace-pre-line">
                    {selectedTeacher.bio}
                  </p>
                </div>
                
                {selectedTeacher.quote && (
                  <div className="mb-8 p-6 bg-surface-variant/30 rounded-2xl border-l-4 border-primary">
                    <p className="text-on-surface font-light italic leading-relaxed">
                      "{selectedTeacher.quote}"
                    </p>
                  </div>
                )}
                
                {(selectedTeacher.email || selectedTeacher.phone || selectedTeacher.facebook) && (
                  <div>
                    <h3 className="text-[11px] font-bold tracking-[0.2em] text-primary uppercase mb-4">Thông tin liên hệ</h3>
                    <div className="space-y-4">
                      {selectedTeacher.email && (
                        <div className="flex items-center gap-4 text-on-surface-variant hover:text-primary transition-colors">
                          <div className="w-10 h-10 rounded-full bg-surface-variant/50 flex items-center justify-center flex-shrink-0">
                            <Mail className="w-4 h-4" />
                          </div>
                          <a href={`mailto:${selectedTeacher.email}`} className="text-sm font-medium">{selectedTeacher.email}</a>
                        </div>
                      )}
                      {selectedTeacher.phone && (
                        <div className="flex items-center gap-4 text-on-surface-variant hover:text-primary transition-colors">
                          <div className="w-10 h-10 rounded-full bg-surface-variant/50 flex items-center justify-center flex-shrink-0">
                            <Phone className="w-4 h-4" />
                          </div>
                          <a href={`tel:${selectedTeacher.phone}`} className="text-sm font-medium">{selectedTeacher.phone}</a>
                        </div>
                      )}
                      {selectedTeacher.facebook && (
                        <div className="flex items-center gap-4 text-on-surface-variant hover:text-primary transition-colors">
                          <div className="w-10 h-10 rounded-full bg-surface-variant/50 flex items-center justify-center flex-shrink-0">
                            <Facebook className="w-4 h-4" />
                          </div>
                          <a href={selectedTeacher.facebook} target="_blank" rel="noopener noreferrer" className="text-sm font-medium break-all">
                            {selectedTeacher.facebook}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                {selectedTeacher.tags && selectedTeacher.tags.length > 0 && (
                  <div className="mt-8 pt-8 border-t border-outline/10">
                    <div className="flex flex-wrap gap-2">
                      {selectedTeacher.tags.map(tag => (
                        <span key={tag} className="px-3 py-1.5 bg-surface-variant/50 text-on-surface-variant text-[10px] font-bold tracking-widest uppercase rounded-lg">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
