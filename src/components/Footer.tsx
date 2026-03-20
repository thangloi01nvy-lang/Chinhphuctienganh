import React from 'react';
import { Link } from 'react-router-dom';
import { Send } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-surface-variant bg-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-4">
          <Link to="/" className="text-lg font-bold text-primary font-headline uppercase tracking-tight">
            Chinh phục tiếng Anh
          </Link>
          <p className="text-on-surface-variant text-sm leading-relaxed font-light">
            Nâng tầm kỹ năng giao tiếp của bạn thông qua sự tập trung, uy tín và sự nghiêm túc trong học thuật.
          </p>
        </div>

        <div>
          <h5 className="text-primary font-bold text-xs tracking-widest uppercase mb-6">Điều hướng</h5>
          <ul className="space-y-4 text-sm text-on-surface-variant font-light">
            <li><Link to="/" className="hover:text-primary transition-colors">Trang chủ</Link></li>
            <li><Link to="/teachers" className="hover:text-primary transition-colors">Giáo viên</Link></li>
            <li><Link to="/student-hub" className="hover:text-primary transition-colors">Tài liệu</Link></li>
            <li><Link to="/admin" className="hover:text-primary transition-colors">Quản trị</Link></li>
          </ul>
        </div>

        <div>
          <h5 className="text-primary font-bold text-xs tracking-widest uppercase mb-6">Tài nguyên</h5>
          <ul className="space-y-4 text-sm text-on-surface-variant font-light">
            <li><Link to="/student-hub" className="hover:text-primary transition-colors">Tài liệu khóa học</Link></li>
            <li><a href="#" className="hover:text-primary transition-colors">Trung tâm trợ giúp</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Quyền riêng tư</a></li>
          </ul>
        </div>

        <div className="space-y-6">
          <h5 className="text-primary font-bold text-xs tracking-widest uppercase mb-6">Bản tin học thuật</h5>
          <p className="text-on-surface-variant text-xs font-light">Gia nhập cùng 10.000+ học viên nhận kiến thức ngôn ngữ hàng tuần.</p>
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="Địa chỉ Email" 
              className="bg-surface-variant/50 border border-outline/10 rounded-lg px-4 py-2 text-sm flex-1 outline-none focus:ring-1 focus:ring-primary"
            />
            <button className="bg-primary text-white p-2.5 rounded-lg hover:bg-primary-dim transition-colors shadow-sm">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 border-t border-surface-variant flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-outline-variant text-[10px] uppercase tracking-widest">
          © 2024 Chinh phục tiếng Anh. Bảo lưu mọi quyền.
        </p>
        <div className="flex gap-6">
          <a href="#" className="text-outline-variant hover:text-primary transition-colors text-[10px] font-bold uppercase tracking-widest">Facebook</a>
          <a href="#" className="text-outline-variant hover:text-primary transition-colors text-[10px] font-bold uppercase tracking-widest">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
