import React from 'react';
import { motion } from 'motion/react';
import { useTeachers } from '../hooks/useTeachers';
import { ArrowRight, Verified } from 'lucide-react';

export default function Teachers() {
  const { teachers } = useTeachers();
  
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
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
        <div className="flex flex-wrap items-center gap-2 border-b border-surface-variant pb-8">
          {['Tất cả', 'Giao tiếp', 'TOEIC', 'Thiếu nhi', 'Thương mại'].map((filter, i) => (
            <button 
              key={filter}
              className={`px-6 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all ${
                i === 0 ? 'bg-primary text-white' : 'hover:bg-primary-container text-on-surface-variant'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {teachers.map((teacher) => (
            <article key={teacher.id} className="scholar-card bg-white p-8 group">
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
              <p className="text-sm text-on-surface-variant leading-relaxed mb-8 font-light italic">
                "{teacher.quote || teacher.bio}"
              </p>
              <div className="flex items-center justify-between pt-6 border-t border-surface-variant">
                <span className="text-[10px] font-bold tracking-widest text-primary">TIỂU SỬ & LIÊN HỆ</span>
                <ArrowRight className="w-4 h-4 text-outline group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
            </article>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
