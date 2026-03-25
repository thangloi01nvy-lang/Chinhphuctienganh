import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Quiz() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="pt-32 pb-24 max-w-5xl mx-auto px-6"
    >
      <Link to="/student-hub" className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors mb-12">
        <ArrowLeft className="w-4 h-4" /> Quay lại Góc học viên
      </Link>

      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-outline/10">
        <div style={{ maxWidth: '900px', margin: '0 auto', fontFamily: "'Open Sans', Arial, sans-serif", color: '#333', lineHeight: 1.6 }}>
          
          <div style={{ textAlign: 'center', borderBottom: '2px solid #113250', paddingBottom: '20px', marginBottom: '30px' }}>
            <h1 style={{ color: '#113250', marginBottom: '5px', fontFamily: "'Montserrat', sans-serif", fontSize: '2rem', fontWeight: 'bold' }}>BÀI KIỂM TRA TRẮC NGHIỆM</h1>
            <h2 style={{ color: '#F59E0B', marginTop: 0, fontFamily: "'Montserrat', sans-serif", fontSize: '1.5rem', fontWeight: '600' }}>Unit 5: Vocabulary & Listening</h2>
            <p style={{ fontWeight: 'bold', color: '#555', fontSize: '1.1rem' }}>Lớp: Teen 3 - 3,5</p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', width: '100%', overflow: 'hidden', borderRadius: '8px' }}>
            <iframe 
              src="https://docs.google.com/forms/d/e/1FAIpQLSf-ovkFsCLIbo4pFrQAxJ3vyN1t4n7jjsu5S8XydaTESvZFfQ/viewform?embedded=true" 
              width="100%" 
              height="1500px" 
              frameBorder="0" 
              marginHeight={0} 
              marginWidth={0}
              style={{ border: 'none', maxWidth: '640px' }}
              title="Quiz"
            >
              Đang tải…
            </iframe>
          </div>

        </div>
      </div>
    </motion.div>
  );
}
