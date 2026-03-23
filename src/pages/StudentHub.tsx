import React from 'react';
import { motion } from 'motion/react';
import { ANNOUNCEMENTS, SCHEDULE } from '../constants';
import { Bell, Calendar, Play, Download, Book, Eye, ArrowRight, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDocuments } from '../hooks/useDocuments';

export default function StudentHub() {
  const { documents } = useDocuments();
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-32 pb-24 max-w-7xl mx-auto px-6"
    >
      <header className="mb-20 border-l-4 border-primary pl-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-3xl">
            <span className="text-[10px] font-bold tracking-[0.3em] text-on-surface-variant uppercase mb-4 block">Trung tâm Thông tin Học viên</span>
            <h1 className="font-headline text-5xl md:text-6xl font-extrabold tracking-tight text-primary leading-[1.1]">
              Nâng tầm hành trình <br/>học tập của bạn.
            </h1>
          </div>
          <p className="text-on-surface-variant max-w-sm text-sm leading-relaxed mb-2 font-medium">
            Kho lưu trữ chọn lọc các tài liệu học thuật, lịch học và bài giảng video được thiết kế cho sự xuất sắc.
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <aside className="lg:col-span-4 space-y-12">
          {/* Announcements */}
          <section className="bg-white p-8 border border-outline/10">
            <div className="flex items-center justify-between mb-8 border-b border-surface-variant pb-4">
              <h2 className="text-[13px] font-extrabold uppercase tracking-[0.2em]">Bảng tin</h2>
              <Bell className="w-5 h-5 text-primary" />
            </div>
            <div className="space-y-8">
              {ANNOUNCEMENTS.map((item) => (
                <div key={item.id} className="group cursor-pointer">
                  <span className="text-[9px] font-bold text-on-surface-variant uppercase tracking-widest block mb-2">
                    {item.type} • {item.time}
                  </span>
                  <p className="text-[15px] font-semibold leading-snug group-hover:text-primary transition-colors">
                    {item.content}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Schedule */}
          <section className="bg-surface-variant/30 p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-[13px] font-extrabold uppercase tracking-[0.2em]">Lịch học tuần này</h2>
              <Calendar className="w-5 h-5 text-on-surface-variant" />
            </div>
            <div className="space-y-6">
              {SCHEDULE.map((item) => (
                <div key={item.id} className="flex items-start gap-4">
                  <div className="w-10 text-center flex-shrink-0">
                    <span className="text-[9px] font-bold uppercase text-outline-variant block">{item.day}</span>
                    <span className="text-lg font-bold">{item.date}</span>
                  </div>
                  <div className="pt-1">
                    <h4 className="text-[14px] font-bold">{item.title}</h4>
                    <p className="text-[12px] text-on-surface-variant mt-1">{item.time} • {item.location}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-10 py-3 text-[10px] font-bold uppercase tracking-widest border border-outline/10 hover:bg-white transition-all">
              Toàn bộ thời khóa biểu
            </button>
          </section>
        </aside>

        <div className="lg:col-span-8 space-y-20">
          {/* Featured Video */}
          <section className="bg-white border border-outline/10 overflow-hidden">
            <div className="aspect-video bg-slate-900 relative">
              <img 
                alt="Thumbnail" 
                className="w-full h-full object-cover grayscale opacity-50" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8uGk-pP9EIHfx-JAViXopPuN_IGTYnGBfyDqqL996psoCtW5_VluxmJV_VtJVUf4mBBLXOmLMnbljxLwF-3m64LCSmoD_A_-0PW4y3diutgk-P3N3LsL2jceL51BuVpZMmlNnEroWeJZ_-dC7EzA6LfJGLD2B0RvZlYx_QHWwMDWT8hNYu17uhAMhan8kwXGJ2Rvpf16Oa-RbPKfGqcVJAHgTEQMn_8O3suM5m09uoQhPXvCYMbK6L9HGg5seJnLbidv8OD1VJtU"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 flex items-center justify-center group cursor-pointer">
                <div className="w-16 h-16 border border-white/50 text-white flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 fill-current" />
                </div>
              </div>
            </div>
            <div className="p-10">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-10">
                <div className="flex-grow max-w-xl">
                  <span className="border border-outline/10 text-on-surface-variant px-3 py-1 text-[9px] font-bold uppercase tracking-widest mb-6 inline-block">Bài giảng nổi bật</span>
                  <h3 className="font-headline text-3xl font-extrabold mb-6 leading-tight">IELTS Speaking: "Nghệ thuật Ngập ngừng" và Sự trôi chảy</h3>
                  <ul className="text-[14px] text-on-surface-variant space-y-3 leading-relaxed border-l border-surface-variant pl-6">
                    <li>Sử dụng các từ nối để lấp đầy khoảng nghỉ một cách tự nhiên.</li>
                    <li>Cách diễn đạt lại các từ vựng phức tạp dưới áp lực phòng thi.</li>
                    <li>Kỹ thuật tự sửa lỗi mà không làm ảnh hưởng đến sự mạch lạc.</li>
                  </ul>
                </div>
                <button className="flex items-center gap-3 bg-primary text-white px-7 py-4 text-[11px] font-bold uppercase tracking-widest hover:bg-primary-dim transition-all">
                  <Download className="w-4 h-4" /> Tài liệu
                </button>
              </div>
            </div>
          </section>

          {/* Resources */}
          <section>
            <div className="flex items-center justify-between mb-12 border-b border-surface-variant pb-6">
              <h2 className="text-2xl font-extrabold uppercase tracking-tight">Kho tài liệu</h2>
              <Link to="/documents" className="text-primary text-[11px] font-bold uppercase tracking-widest flex items-center gap-2 group">
                Toàn bộ <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
              {['Văn bản', 'IELTS', 'TOEIC', 'Ngữ pháp'].map((cat) => {
                const catDocs = documents.filter(d => d.category === cat);
                return (
                  <div key={cat} className="space-y-6">
                    <div className="w-10 h-10 border border-outline/10 flex items-center justify-center">
                      <Book className="w-5 h-5 text-primary" />
                    </div>
                    <h4 className="text-sm font-extrabold uppercase tracking-widest">Tài liệu {cat}</h4>
                    <div className="space-y-4">
                      {catDocs.length > 0 ? catDocs.map(doc => (
                        <a key={doc.id} href={doc.url} className="flex items-center justify-between group py-1 border-b border-transparent hover:border-surface-variant transition-all">
                          <span className="text-[13px] text-on-surface-variant group-hover:text-primary">{doc.title}</span>
                          <Download className="w-3 h-3 text-outline-variant group-hover:text-primary" />
                        </a>
                      )) : (
                        <p className="text-[13px] text-on-surface-variant italic">Chưa có tài liệu</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Spotlight */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-surface-variant/30 p-10 flex items-start gap-10">
              <div className="w-24 h-32 bg-white border border-outline/10 flex flex-col p-4 flex-shrink-0">
                <div className="w-full h-1 bg-primary mb-2" />
                <div className="w-2/3 h-1 bg-surface-variant mb-1" />
                <div className="mt-auto flex justify-center">
                  <Book className="w-8 h-8 text-surface-variant" />
                </div>
              </div>
              <div>
                <span className="text-[9px] font-bold text-outline-variant uppercase tracking-widest">Cẩm nang cao cấp</span>
                <h5 className="text-[16px] font-extrabold mt-2 leading-tight">Sổ tay Thành ngữ tiếng Anh Đầy đủ</h5>
                <button className="mt-6 text-primary text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 group">
                  Tải PDF <Download className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                </button>
              </div>
            </div>
            <div className="bg-surface-variant/30 p-10 flex items-start gap-10">
              <div className="w-24 h-32 bg-white border border-outline/10 flex flex-col p-4 flex-shrink-0">
                <div className="w-full h-1 bg-outline-variant mb-2" />
                <div className="mt-auto flex justify-center">
                  <FileText className="w-8 h-8 text-surface-variant" />
                </div>
              </div>
              <div>
                <span className="text-[9px] font-bold text-outline-variant uppercase tracking-widest">Giáo án Mẫu</span>
                <h5 className="text-[16px] font-extrabold mt-2 leading-tight">Unit 10: ENERGY SOURCES - Tiết: Getting Started</h5>
                <Link to="/lesson-plan" className="mt-6 text-primary text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 group">
                  Xem chi tiết <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  );
}
