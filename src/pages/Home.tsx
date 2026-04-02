import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, LayoutTemplate, Sparkles, LayoutDashboard } from 'lucide-react';
import { COURSES } from '../constants';
import { useTeachers } from '../hooks/useTeachers';

export default function Home() {
  const { teachers } = useTeachers();
  
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
              Làm chủ tiếng Anh với lộ trình đào tạo được thiết kế bài bản, hướng tới sự phát triển trí tuệ và thành công chuyên nghiệp. Hãy gia nhập cộng đồng những người học tận tâm.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <button className="cta-gradient text-white px-8 py-4 rounded-full font-headline font-bold text-lg flex items-center gap-2 group shadow-lg hover:shadow-primary/20 transition-all">
                Khám phá khóa học
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <div className="flex items-center gap-4 px-6 py-4 rounded-full bg-surface-variant/30 text-on-surface-variant font-medium border border-outline/10">
                <ShieldCheck className="w-5 h-5 text-primary" />
                Được tin tưởng bởi hơn 10.000 học viên
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-5 relative"
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
