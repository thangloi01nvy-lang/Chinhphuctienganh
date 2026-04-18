import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X, PlayCircle, Book } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTeachers } from '../hooks/useTeachers';
import { useDocuments } from '../hooks/useDocuments';
import { useTeacherVideos } from '../hooks/useTeacherVideos';
import { smartSearch } from '../utils/search';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);

  const { teachers } = useTeachers();
  const { documents } = useDocuments();
  const { videos } = useTeacherVideos();

  const featuredVideoText = "thiết kế bài học blended learning giáo viên huỳnh kỳ trình bày thuyết trình chuyên đề đào tạo cách chia tỉ lệ học trực tiếp trực tuyến công cụ quản lý học tập lms canvas google classroom";
  const searchTerm = searchQuery.toLowerCase().trim();

  // Close search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredTeachers = searchTerm ? teachers.filter(t => 
    smartSearch(t.name, searchTerm) || 
    smartSearch(t.role, searchTerm) || 
    smartSearch(t.bio, searchTerm) ||
    (t.tags && t.tags.some(tag => smartSearch(tag, searchTerm)))
  ) : [];
  
  const filteredDocs = searchTerm ? documents.filter(d => 
    smartSearch(d.title, searchTerm) || 
    smartSearch(d.category, searchTerm) || 
    smartSearch(d.subCategory, searchTerm)
  ) : [];
  
  const filteredVideos = searchTerm ? videos.filter(v => 
    smartSearch(v.title, searchTerm) || 
    smartSearch(v.teacherName, searchTerm)
  ) : [];
  
  const ALL_SUGGESTIONS = [
    'Giao tiếp', 'IELTS', 'TOEIC', 'Thiếu nhi', 'Thương mại', 
    'Ngữ pháp', 'Phát âm', 'Blended Learning', 'Thuyết trình', 
    'Canvas', 'Giáo án', 'Tài liệu', 'Video bài giảng'
  ];

  const suggestedTerms = searchTerm.length > 0 
    ? ALL_SUGGESTIONS.filter(term => smartSearch(term, searchTerm) && term.toLowerCase() !== searchTerm)
    : [];

  const showFeaturedVideo = searchTerm && smartSearch(featuredVideoText, searchTerm);
  const showResults = isSearchFocused && searchTerm.length > 0;
  const hasResults = filteredTeachers.length > 0 || filteredDocs.length > 0 || filteredVideos.length > 0 || showFeaturedVideo || suggestedTerms.length > 0;

  const navLinks = [
    { to: '/', label: 'Trang chủ' },
    { to: '/teachers', label: 'Giáo viên' },
    { to: '/student-hub', label: 'Tài liệu' },
    { to: '/admin', label: 'Quản trị' },
  ];

  const handleResultClick = (to: string, isExternal: boolean = false) => {
    setIsSearchFocused(false);
    setSearchQuery('');
    if (!isExternal) {
      if (typeof to === 'string') navigate(to);
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 glass-header">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <Link to="/" className="text-xl font-bold tracking-tighter text-primary font-headline flex items-center" onClick={() => setIsSearchFocused(false)}>
            Chinh phục tiếng Anh
            <span className="text-[#FF3B30] text-3xl font-serif italic ml-1 -mt-2 drop-shadow-sm">2</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setIsSearchFocused(false)}
                className={({ isActive }) =>
                  `text-sm font-medium tracking-tight transition-colors hover:text-primary ${
                    isActive ? 'text-primary font-bold border-b-2 border-primary pb-1' : 'text-on-surface-variant'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:block relative" ref={searchRef}>
            <div className={`flex items-center bg-surface-variant/50 px-4 py-2 rounded-full border transition-colors ${isSearchFocused ? 'border-primary/50 bg-white' : 'border-outline/10'}`}>
              <Search className="w-4 h-4 text-outline mr-2" />
              <input 
                type="text" 
                placeholder="Tìm kiếm..." 
                value={searchQuery}
                onFocus={() => setIsSearchFocused(true)}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none focus:ring-0 text-sm w-48 placeholder:text-outline-variant outline-none"
              />
              {searchQuery && (
                <button onClick={() => { setSearchQuery(''); searchRef.current?.querySelector('input')?.focus(); }} className="text-outline-variant hover:text-on-surface ml-1">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Desktop Search Results Dropdown */}
            <AnimatePresence>
              {showResults && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-[100%] right-0 mt-3 w-[450px] bg-white rounded-2xl shadow-2xl border border-outline/10 max-h-[70vh] overflow-y-auto z-50 p-3"
                >
                  {!hasResults ? (
                    <div className="py-8 text-center text-outline-variant">
                      <Search className="w-8 h-8 mx-auto mb-2 opacity-20" />
                      <p className="font-medium text-sm text-on-surface-variant">Không tìm thấy nội dung phù hợp</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {suggestedTerms.length > 0 && (
                        <div>
                          <h3 className="text-[9px] font-bold text-outline-variant uppercase tracking-widest px-3 mb-2 border-b border-outline/10 pb-1">Từ khoá gợi ý</h3>
                          <div className="flex flex-wrap gap-2 px-3">
                            {suggestedTerms.map(term => (
                              <button
                                key={`desk-suggest-${term}`}
                                onClick={() => {
                                  setSearchQuery(term);
                                  searchRef.current?.querySelector('input')?.focus();
                                }}
                                className="text-[11px] font-medium bg-surface-variant/30 text-on-surface px-3 py-1.5 rounded-full hover:bg-primary/10 hover:text-primary transition-colors flex items-center gap-1"
                              >
                                <Search className="w-3 h-3" />
                                {term}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {filteredTeachers.length > 0 && (
                        <div>
                          <h3 className="text-[9px] font-bold text-outline-variant uppercase tracking-widest px-3 mb-2 border-b border-outline/10 pb-1">Giáo viên</h3>
                          <div className="space-y-1">
                            {filteredTeachers.map(teacher => (
                              <button
                                key={`desk-teacher-${teacher.id}`} 
                                onClick={() => handleResultClick(`/teachers#teacher-${teacher.id}`)}
                                className="w-full text-left flex items-center gap-3 p-2 rounded-xl hover:bg-surface-variant/30 transition-colors"
                              >
                                <img src={teacher.image} alt={teacher.name} className="w-8 h-8 rounded-full object-cover" referrerPolicy="no-referrer" />
                                <div>
                                  <div className="font-bold text-xs text-on-surface">{teacher.name}</div>
                                  <div className="text-[10px] text-primary">{teacher.role}</div>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {filteredDocs.length > 0 && (
                        <div>
                          <h3 className="text-[9px] font-bold text-outline-variant uppercase tracking-widest px-3 mb-2 border-b border-outline/10 pb-1">Tài liệu</h3>
                          <div className="space-y-1">
                            {filteredDocs.map(doc => (
                              <button
                                key={`desk-doc-${doc.id}`} 
                                onClick={() => {
                                  handleResultClick('', true);
                                  window.open(doc.url, '_blank', 'noopener,noreferrer');
                                }}
                                className="w-full text-left flex items-start gap-3 p-2 rounded-xl hover:bg-surface-variant/30 transition-colors"
                              >
                                <div className="p-1.5 bg-surface-variant/50 rounded-lg text-primary mt-0.5"><Book className="w-4 h-4"/></div>
                                <div>
                                  <div className="font-bold text-xs text-on-surface">{doc.title}</div>
                                  <div className="flex gap-2 mt-1">
                                    <span className="text-[8px] font-bold text-primary uppercase tracking-widest bg-primary/10 px-1.5 py-0.5 rounded-full">{doc.category}</span>
                                  </div>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {(filteredVideos.length > 0 || showFeaturedVideo) && (
                        <div>
                          <h3 className="text-[9px] font-bold text-outline-variant uppercase tracking-widest px-3 mb-2 border-b border-outline/10 pb-1">Video Bài Giảng</h3>
                          <div className="space-y-1">
                            {showFeaturedVideo && (
                              <button
                                onClick={() => handleResultClick('/teachers#featured-video')}
                                className="w-full text-left flex items-start gap-3 p-2 rounded-xl hover:bg-surface-variant/30 transition-colors"
                              >
                                <div className="p-1.5 bg-primary/10 rounded-lg text-primary mt-0.5"><PlayCircle className="w-4 h-4"/></div>
                                <div>
                                  <div className="font-bold text-xs text-on-surface">Thiết kế bài học (Blended Learning)</div>
                                  <div className="text-[10px] text-on-surface-variant mt-0.5">Giáo viên Huỳnh Kỳ</div>
                                </div>
                              </button>
                            )}
                            {filteredVideos.map(video => (
                              <button
                                key={`desk-video-${video.id}`} 
                                onClick={() => handleResultClick(`/teachers#video-${video.id}`)}
                                className="w-full text-left flex items-start gap-3 p-2 rounded-xl hover:bg-surface-variant/30 transition-colors"
                              >
                                <div className="p-1.5 bg-surface-variant/50 rounded-lg text-primary mt-0.5"><PlayCircle className="w-4 h-4"/></div>
                                <div>
                                  <div className="font-bold text-xs text-on-surface">{video.title}</div>
                                  <div className="text-[10px] text-on-surface-variant mt-0.5">{video.teacherName}</div>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <button className="cta-gradient text-white px-6 py-2 rounded-full font-headline text-sm font-bold tracking-tight hover:opacity-90 transition-opacity shadow-sm whitespace-nowrap">
            Đăng ký ngay
          </button>

          <button 
            className="md:hidden p-2 text-on-surface"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu & Search */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 w-full bg-white border-b border-surface-variant px-6 py-6 space-y-4 max-h-[85vh] overflow-y-auto shadow-xl"
          >
            <div className="relative">
              <div className="flex items-center bg-surface-variant/50 px-4 py-3 rounded-xl border border-outline/10 mb-4">
                <Search className="w-5 h-5 text-outline mr-3" />
                <input 
                  type="text" 
                  placeholder="Tìm kiếm mọi thứ..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-none focus:ring-0 text-base w-full placeholder:text-outline-variant outline-none"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="text-outline-variant">
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Mobile Search Results */}
              {searchQuery.trim().length > 0 && (
                <div className="bg-surface/50 rounded-2xl p-4 mb-6 border border-outline/5">
                  {!hasResults ? (
                    <div className="py-4 text-center text-outline-variant">
                      <p className="font-medium text-sm">Không tìm thấy nội dung</p>
                    </div>
                  ) : (
                    <div className="space-y-5">
                      {suggestedTerms.length > 0 && (
                        <div>
                          <h3 className="text-[10px] font-bold text-outline-variant uppercase tracking-widest mb-3 border-b border-outline/10 pb-1">Từ khoá gợi ý</h3>
                          <div className="flex flex-wrap gap-2">
                            {suggestedTerms.map(term => (
                              <button
                                key={`mob-suggest-${term}`}
                                onClick={() => setSearchQuery(term)}
                                className="text-xs font-medium bg-surface-variant/30 text-on-surface px-3 py-1.5 rounded-full hover:bg-primary/10 hover:text-primary transition-colors flex items-center gap-1"
                              >
                                <Search className="w-3.5 h-3.5" />
                                {term}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {filteredTeachers.length > 0 && (
                        <div>
                          <h3 className="text-[10px] font-bold text-outline-variant uppercase tracking-widest mb-2 border-b border-outline/10 pb-1">Giáo viên</h3>
                          <div className="space-y-2">
                            {filteredTeachers.map(teacher => (
                              <button
                                key={`mob-teacher-${teacher.id}`} 
                                onClick={() => { setIsMenuOpen(false); handleResultClick(`/teachers#teacher-${teacher.id}`); }}
                                className="w-full text-left flex items-center gap-3"
                              >
                                <img src={teacher.image} alt={teacher.name} className="w-8 h-8 rounded-full object-cover" referrerPolicy="no-referrer" />
                                <div>
                                  <div className="font-bold text-sm text-on-surface">{teacher.name}</div>
                                  <div className="text-xs text-primary">{teacher.role}</div>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {filteredDocs.length > 0 && (
                        <div>
                          <h3 className="text-[10px] font-bold text-outline-variant uppercase tracking-widest mb-2 border-b border-outline/10 pb-1">Tài liệu</h3>
                          <div className="space-y-2">
                            {filteredDocs.map(doc => (
                              <button
                                key={`mob-doc-${doc.id}`} 
                                onClick={() => { setIsMenuOpen(false); handleResultClick('', true); window.open(doc.url, '_blank', 'noopener,noreferrer'); }}
                                className="w-full text-left flex items-start gap-3"
                              >
                                <div className="text-primary mt-0.5"><Book className="w-4 h-4"/></div>
                                <div>
                                  <div className="font-bold text-sm text-on-surface">{doc.title}</div>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {(filteredVideos.length > 0 || showFeaturedVideo) && (
                        <div>
                          <h3 className="text-[10px] font-bold text-outline-variant uppercase tracking-widest mb-2 border-b border-outline/10 pb-1">Video</h3>
                          <div className="space-y-2">
                            {showFeaturedVideo && (
                              <button
                                onClick={() => { setIsMenuOpen(false); handleResultClick('/teachers#featured-video'); }}
                                className="w-full text-left flex items-start gap-3"
                              >
                                <div className="text-primary mt-0.5"><PlayCircle className="w-4 h-4"/></div>
                                <div>
                                  <div className="font-bold text-sm text-on-surface">Thiết kế bài học (Blended Learning)</div>
                                </div>
                              </button>
                            )}
                            {filteredVideos.map(video => (
                              <button
                                key={`mob-video-${video.id}`} 
                                onClick={() => { setIsMenuOpen(false); handleResultClick(`/teachers#video-${video.id}`); }}
                                className="w-full text-left flex items-start gap-3"
                              >
                                <div className="text-primary mt-0.5"><PlayCircle className="w-4 h-4"/></div>
                                <div>
                                  <div className="font-bold text-sm text-on-surface">{video.title}</div>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {navLinks.map((link) => (
              <NavLink
                key={`mob-nav-${link.to}`}
                to={link.to}
                onClick={() => { setIsMenuOpen(false); setSearchQuery(''); }}
                className={({ isActive }) =>
                  `block text-lg font-medium ${isActive ? 'text-primary font-bold' : 'text-on-surface-variant'}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
