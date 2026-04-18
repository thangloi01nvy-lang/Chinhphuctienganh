import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ShieldCheck, LayoutTemplate, Sparkles, LayoutDashboard, Search, PlayCircle, Book, User, X } from 'lucide-react';
import { COURSES } from '../constants';
import { useTeachers } from '../hooks/useTeachers';
import { useDocuments } from '../hooks/useDocuments';
import { useTeacherVideos } from '../hooks/useTeacherVideos';

export default function Home() {
  const navigate = useNavigate();
  const { teachers } = useTeachers();
  const { documents } = useDocuments();
  const { videos } = useTeacherVideos();
  
  const [globalSearch, setGlobalSearch] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const featuredVideoText = "thiết kế bài học blended learning giáo viên huỳnh kỳ trình bày thuyết trình chuyên đề đào tạo cách chia tỉ lệ học trực tiếp trực tuyến công cụ quản lý học tập lms canvas google classroom".toLowerCase();
  const searchTerm = globalSearch.toLowerCase().trim();

  const filteredTeachers = searchTerm ? teachers.filter(t => 
    t.name.toLowerCase().includes(searchTerm) || 
    t.role.toLowerCase().includes(searchTerm) || 
    (t.bio && t.bio.toLowerCase().includes(searchTerm)) ||
    (t.tags && t.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
  ) : [];
  
  const filteredDocs = searchTerm ? documents.filter(d => 
    (d.title && d.title.toLowerCase().includes(searchTerm)) || 
    (d.category && d.category.toLowerCase().includes(searchTerm)) || 
    (d.subCategory && d.subCategory.toLowerCase().includes(searchTerm))
  ) : [];
  
  const filteredVideos = searchTerm ? videos.filter(v => 
    (v.title && v.title.toLowerCase().includes(searchTerm)) || 
    (v.teacherName && v.teacherName.toLowerCase().includes(searchTerm))
  ) : [];
  
  const showFeaturedVideo = searchTerm && featuredVideoText.includes(searchTerm);
  const showResults = isSearchFocused && searchTerm.length > 0;
  const hasResults = filteredTeachers.length > 0 || filteredDocs.length > 0 || filteredVideos.length > 0 || showFeaturedVideo;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-20"
    >
      {/* Hero Section */}
      <section className="relative min-h-[800px] flex items-center overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full py-12">
          <div className="lg:col-span-7 space-y-8">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="-mb-6"
              >
                <span className="text-[#FF3B30] text-[10rem] md:text-[12rem] font-serif italic leading-none block -ml-4 drop-shadow-sm">2</span>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-block px-4 py-1.5 bg-primary-container text-on-primary-container rounded-full text-[10px] font-bold tracking-[0.1em] uppercase relative z-10"
              >
                SỰ ƯU TÚ THEO PHONG CÁCH TỐI GIẢN
              </motion.div>
            </div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-on-surface font-headline font-extrabold text-5xl md:text-7xl leading-[1.1] tracking-tight"
            >
              Chinh phục <br/>
              <span className="text-primary">tiếng Anh</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-on-surface-variant text-lg md:text-xl max-w-xl leading-relaxed font-light"
            >
              Làm chủ tiếng Anh với lộ trình đào tạo được thiết kế bài bản. Tìm kiếm ngay thông tin giáo viên, khóa học hoặc bất kì tài liệu nào.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="relative z-50 w-full max-w-2xl mt-4"
            >
              <div className="relative flex items-center">
                <Search className="absolute left-6 w-6 h-6 text-outline-variant" />
                <input 
                  type="text" 
                  value={globalSearch}
                  onChange={(e) => setGlobalSearch(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  className="w-full h-16 bg-surface-variant/20 border-2 border-outline/10 focus:border-primary/50 focus:bg-white rounded-full pl-16 pr-12 text-lg outline-none transition-all shadow-sm focus:shadow-xl"
                  placeholder="Tìm giáo viên, tài liệu, lớp học..."
                />
                {globalSearch && (
                  <button 
                    onClick={() => { setGlobalSearch(''); setIsSearchFocused(false); }}
                    className="absolute right-6 p-1 text-outline-variant hover:text-on-surface rounded-full transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Search Results Dropdown */}
              <AnimatePresence>
                {showResults && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-[100%] left-0 right-0 mt-4 bg-white rounded-3xl shadow-2xl border border-outline/10 max-h-[60vh] overflow-y-auto z-50 p-4"
                  >
                    {!hasResults ? (
                      <div className="py-12 text-center text-outline-variant">
                        <Search className="w-12 h-12 mx-auto mb-3 opacity-20" />
                        <p className="font-medium text-on-surface-variant">Không tìm thấy nội dung phù hợp cho "{globalSearch}"</p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {/* Teachers Results */}
                        {filteredTeachers.length > 0 && (
                          <div>
                            <h3 className="text-[10px] font-bold text-outline-variant uppercase tracking-widest px-4 mb-3 border-b border-outline/10 pb-2">Giáo viên</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {filteredTeachers.map(teacher => (
                                <Link 
                                  key={`teacher-${teacher.id}`} 
                                  to={`/teachers#teacher-${teacher.id}`} 
                                  className="flex items-center gap-4 p-3 rounded-2xl hover:bg-surface-variant/30 transition-colors"
                                >
                                  <img src={teacher.image} alt={teacher.name} className="w-12 h-12 rounded-full object-cover" referrerPolicy="no-referrer" />
                                  <div>
                                    <div className="font-bold text-sm text-on-surface">{teacher.name}</div>
                                    <div className="text-xs text-primary">{teacher.role}</div>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Documents Results */}
                        {filteredDocs.length > 0 && (
                          <div>
                            <h3 className="text-[10px] font-bold text-outline-variant uppercase tracking-widest px-4 mb-3 border-b border-outline/10 pb-2">Tài liệu</h3>
                            <div className="space-y-1">
                              {filteredDocs.map(doc => (
                                <a 
                                  key={`doc-${doc.id}`} 
                                  href={doc.url} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="flex items-start gap-4 p-3 rounded-2xl hover:bg-surface-variant/30 transition-colors"
                                >
                                  <div className="p-2 bg-surface-variant/50 rounded-xl text-primary"><Book className="w-5 h-5"/></div>
                                  <div>
                                    <div className="font-bold text-sm text-on-surface">{doc.title}</div>
                                    <div className="flex gap-2 mt-1">
                                      <span className="text-[9px] font-bold text-primary uppercase tracking-widest bg-primary/10 px-2 py-0.5 rounded-full">{doc.category}</span>
                                      {doc.subCategory && <span className="text-[9px] font-bold text-secondary uppercase tracking-widest bg-secondary/10 px-2 py-0.5 rounded-full">{doc.subCategory}</span>}
                                    </div>
                                  </div>
                                </a>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Videos Results */}
                        {(filteredVideos.length > 0 || showFeaturedVideo) && (
                          <div>
                            <h3 className="text-[10px] font-bold text-outline-variant uppercase tracking-widest px-4 mb-3 border-b border-outline/10 pb-2">Video Bài Giảng</h3>
                            <div className="space-y-1">
                              {showFeaturedVideo && (
                                <Link 
                                  to="/teachers#featured-video" 
                                  className="flex items-start gap-4 p-3 rounded-2xl hover:bg-surface-variant/30 transition-colors"
                                >
                                  <div className="p-2 bg-primary/10 rounded-xl text-primary"><PlayCircle className="w-5 h-5"/></div>
                                  <div>
                                    <div className="font-bold text-sm text-on-surface">Thiết kế bài học trong Blended Learning (Chuyên đề đào tạo)</div>
                                    <div className="text-xs text-on-surface-variant mt-1">Giáo viên Huỳnh Kỳ</div>
                                  </div>
                                </Link>
                              )}
                              {filteredVideos.map(video => (
                                <Link 
                                  key={`video-${video.id}`} 
                                  to={`/teachers#video-${video.id}`} 
                                  className="flex items-start gap-4 p-3 rounded-2xl hover:bg-surface-variant/30 transition-colors"
                                >
                                  <div className="p-2 bg-surface-variant/50 rounded-xl text-primary"><PlayCircle className="w-5 h-5"/></div>
                                  <div>
                                    <div className="font-bold text-sm text-on-surface">{video.title}</div>
                                    <div className="text-xs text-on-surface-variant mt-1">{video.teacherName}</div>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex flex-wrap gap-4 pt-6">
                <Link to="/teachers" className="cta-gradient text-white px-8 py-4 rounded-full font-headline font-bold text-lg flex items-center gap-2 group shadow-lg hover:shadow-primary/20 transition-all">
                  Khám phá khóa học
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <div className="flex items-center gap-4 px-6 py-4 rounded-full bg-surface-variant/30 text-on-surface-variant font-medium border border-outline/10">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                  Được tin tưởng bởi hơn 10.000 học viên
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-5 relative"
            style={{ zIndex: 10 }}
          >
            <div className="aspect-square rounded-full bg-primary-container/30 absolute -top-10 -right-10 blur-3xl"></div>
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border border-white/20">
              <img 
                alt="Nhóm sinh viên" 
                className="w-full h-full object-cover aspect-[4/5]" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9RmK36br4vpiQZktTa4iTsdULaEFqCW6Xt-3S_uH8TY3gr5fSExRns0mlwiYyQnYB6LcAJUQVkoUEIJ8CgfycTGcilIGUuzp3H40-zI9Ro47WOJ8_TPJMGurm_tECpw6vY1e-8lA3tPBXMpsj6xXu8Ece11Jj4fucQh-w5FZyNkgBRHtJEeN4Tuz8FLBQ7pi4wpFMePjXAk8weNU_a-N62QZ06qNInGfreU3hG-Um6ke5ztl_fcoekThisFaH6HdeIXRjQMThEcw"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-6 left-6 right-6 backdrop-blur-md bg-white/60 p-6 rounded-2xl border border-white/30">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-3">
                      {teachers.slice(0, 3).map(teacher => (
                        <div key={teacher.id} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                          <img src={teacher.image} alt={teacher.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                      ))}
                    </div>
                    <div className="text-sm font-semibold text-primary">Đội ngũ giáo viên hàng đầu</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div className="sticky top-32">
              <span className="text-primary font-bold text-xs tracking-[0.2em] uppercase">Người điều phối kỹ thuật số</span>
              <h2 className="font-headline text-4xl font-extrabold text-on-surface mt-4 mb-8 leading-tight">Hơn cả một kho bài giảng thông thường</h2>
              <div className="w-16 h-1 bg-primary rounded-full"></div>
              <p className="mt-8 text-on-surface-variant font-light leading-relaxed max-w-md">
                Khám phá tư duy cấu trúc trong kho tài liệu tuyển chọn của chúng tôi. Được thiết kế dành cho những ai tìm kiếm nhiều hơn là việc học thuộc lòng.
              </p>
            </div>
            <div className="space-y-8">
              {COURSES.map((course) => (
                <div key={course.id} className="p-8 scholar-card group">
                  <div className="w-12 h-12 bg-primary-container rounded-2xl flex items-center justify-center mb-6 text-primary">
                    {course.icon === 'architecture' && <LayoutTemplate className="w-8 h-8" />}
                    {course.icon === 'auto_awesome' && <Sparkles className="w-8 h-8" />}
                    {course.icon === 'dashboard_customize' && <LayoutDashboard className="w-8 h-8" />}
                  </div>
                  <h3 className="font-headline text-xl font-bold mb-2">{course.title}</h3>
                  <p className="text-on-surface-variant font-light">{course.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Registration & Faculty */}
      <section className="py-24 bg-surface-variant/20 border-t border-surface-variant">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Registration Form */}
            <div className="lg:col-span-5 bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-outline/5">
              <h2 className="font-headline text-3xl font-bold text-on-surface mb-2">Tư vấn miễn phí</h2>
              <p className="text-on-surface-variant mb-8 font-light">Bắt đầu hành trình của bạn với lộ trình cá nhân hóa từ các chuyên gia.</p>
              <form className="space-y-6">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-outline tracking-wider uppercase ml-1">Họ và tên</label>
                  <input className="w-full bg-surface-variant/30 border border-outline/10 rounded-xl px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="Nguyễn Văn A" type="text"/>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-outline tracking-wider uppercase ml-1">Số điện thoại</label>
                  <input className="w-full bg-surface-variant/30 border border-outline/10 rounded-xl px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="090 123 4567" type="tel"/>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-outline tracking-wider uppercase ml-1">Trình độ</label>
                    <select className="w-full bg-surface-variant/30 border border-outline/10 rounded-xl px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/20 outline-none">
                      <option>Mới bắt đầu</option>
                      <option>Trung cấp</option>
                      <option>Nâng cao</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-outline tracking-wider uppercase ml-1">Mục tiêu</label>
                    <select className="w-full bg-surface-variant/30 border border-outline/10 rounded-xl px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/20 outline-none">
                      <option>Giao tiếp nâng cao</option>
                      <option>Giao tiếp cơ bản</option>
                      <option>Tiếng Anh công việc</option>
                    </select>
                  </div>
                </div>
                <button className="w-full cta-gradient text-white py-4 rounded-xl font-headline font-bold text-lg mt-4 shadow-lg hover:shadow-primary/20 transition-all">
                  Nhận lộ trình của bạn
                </button>
              </form>
            </div>

            {/* Teacher Sneak Peek */}
            <div className="lg:col-span-7 space-y-8">
              <div className="flex justify-between items-end mb-4">
                <div>
                  <h2 className="font-headline text-3xl font-bold text-on-surface">Gặp gỡ giáo viên</h2>
                  <p className="text-on-surface-variant font-light">Những nhà giáo dục hàng đầu từ khắp nơi trên thế giới.</p>
                </div>
                <Link to="/teachers" className="text-primary font-bold text-sm hover:underline flex items-center gap-1 relative z-10">
                  Xem tất cả <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {teachers.slice(0, 2).map((teacher) => (
                  <div key={teacher.id} className="bg-white p-6 rounded-3xl scholar-card">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-20 h-20 rounded-2xl overflow-hidden bg-surface-variant border border-outline/5">
                        <img alt={teacher.name} className="w-full h-full object-cover" src={teacher.image} referrerPolicy="no-referrer" />
                      </div>
                      <div>
                        <h4 className="font-headline font-bold text-lg text-on-surface">{teacher.name}</h4>
                        <span className="text-[10px] font-bold text-primary tracking-widest uppercase">{teacher.role}</span>
                      </div>
                    </div>
                    <p className="text-sm text-on-surface-variant leading-relaxed mb-6 font-light">{teacher.bio}</p>
                    <div className="flex flex-wrap gap-2">
                      {teacher.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-surface-variant/50 border border-outline/5 rounded-full text-[10px] font-bold uppercase">{tag}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Stats */}
              <div className="bg-white rounded-3xl p-8 border border-outline/5 flex flex-wrap justify-around gap-8 shadow-sm">
                <div className="text-center">
                  <div className="text-3xl font-headline font-extrabold text-primary">98%</div>
                  <div className="text-[10px] font-bold text-on-surface-variant tracking-widest uppercase">TỶ LỆ THÀNH CÔNG</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-headline font-extrabold text-primary">10+</div>
                  <div className="text-[10px] font-bold text-on-surface-variant tracking-widest uppercase">CHUYÊN GIA TẬN TÂM</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-headline font-extrabold text-primary">24/7</div>
                  <div className="text-[10px] font-bold text-on-surface-variant tracking-widest uppercase">HỖ TRỢ HỌC VIÊN</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
