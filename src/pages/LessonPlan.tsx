import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LessonPlan() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="pt-32 pb-24 max-w-5xl mx-auto px-6"
    >
      <Link to="/student-hub" className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors mb-12">
        <ArrowLeft className="w-4 h-4" /> Quay lại Kho tài liệu
      </Link>

      <div style={{ width: '100%', maxWidth: '1000px', margin: '20px auto', padding: '10px', background: '#fff', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
        <h2 style={{ color: '#113250', fontFamily: "'Montserrat', sans-serif", textAlign: 'center', marginBottom: '20px' }}>
          KẾ HOẠCH BÀI DẠY: LESSON 7D – GRAMMAR: HAVE SOMETHING DONE
        </h2>
        <iframe 
          src="https://docs.google.com/document/d/e/2PACX-1vRWQcsAorqhshGr8Ga1axu3UZQCBOfIGyi1cwPOMicz-Bcyauv93LUHb8n17ybKwQ/pub?embedded=true" 
          width="100%" 
          height="800px" 
          style={{ border: 'none', borderRadius: '8px' }}
          title="Lesson Plan"
        />
      </div>

      {/* Download Action */}
      <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
        <a 
          href="https://docs.google.com/document/d/e/2PACX-1vRWQcsAorqhshGr8Ga1axu3UZQCBOfIGyi1cwPOMicz-Bcyauv93LUHb8n17ybKwQ/pub" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-on-surface text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-primary transition-colors shadow-lg w-full sm:w-auto justify-center"
        >
          <BookOpen className="w-5 h-5" /> Tải Giáo án (Word)
        </a>
        <a 
          href="https://docs.google.com/presentation/d/1xhzZa7_K4SFsnaoH6C44u4jNchfqjCqI/edit?usp=sharing&ouid=108860886532372307984&rtpof=true&sd=true" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-primary-dim transition-colors shadow-lg w-full sm:w-auto justify-center"
        >
          <BookOpen className="w-5 h-5" /> Tải Bài giảng (PPT)
        </a>
      </div>

    </motion.div>
  );
}
